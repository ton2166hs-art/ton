import 'dotenv/config';
import express, { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CatalogProduct {
  id: string;
  name?: string;
  titleFormatted?: string;
  price_60ml?: number;
  price_15ml?: number;
}

interface IncomingCartItem {
  id: string;
  size: '60ml' | '15ml';
  quantity: number;
}

interface ValidatedOrderItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: 'BRL';
}

function loadCatalogMap(): Map<string, CatalogProduct> {
  const map = new Map<string, CatalogProduct>();
  try {
    const jsonPath = path.resolve(__dirname, 'public', 'produtos.json');
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    const parsed = JSON.parse(raw) as CatalogProduct[];
    if (Array.isArray(parsed)) {
      for (const item of parsed) {
        if (item && typeof item.id === 'string') {
          map.set(item.id, item);
        }
      }
    }
  } catch (err) {
    console.error('Erro ao carregar catalogo produtos.json:', err);
  }
  return map;
}

function resolveSafeOrigin(req: Request): string {
  const envUrl = process.env.APP_URL?.trim();
  if (envUrl && envUrl !== 'MY_APP_URL') {
    try {
      const parsed = new URL(envUrl);
      if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
        return parsed.origin;
      }
    } catch {
      // fall through
    }
  }
  const host = req.get('host');
  const proto = req.get('x-forwarded-proto') === 'https' ? 'https' : req.protocol || 'http';
  if (host && /^[a-zA-Z0-9.:-]+$/.test(host)) {
    return `${proto}://${host}`;
  }
  return 'http://localhost:3000';
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const catalogMap = loadCatalogMap();

  app.use(express.json({ limit: '64kb' }));

  app.get('/api/mercadopago/status', (_req: Request, res: Response) => {
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN?.trim() || '';
    const isConfigured = token.length > 10 && !token.includes('SEU_ACCESS_TOKEN');
    res.json({ configured: isConfigured });
  });

  app.post('/api/mercadopago/create-preference', async (req: Request, res: Response) => {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN?.trim() || '';
    if (!accessToken || accessToken.includes('SEU_ACCESS_TOKEN')) {
      res.status(503).json({
        configured: false,
        error: 'Mercado Pago API não configurada no servidor.',
      });
      return;
    }

    const body = req.body as {
      items?: IncomingCartItem[];
      shippingType?: string;
      customer?: { name?: string; phone?: string; email?: string };
      externalReference?: string;
    };

    if (!body || !Array.isArray(body.items) || body.items.length === 0 || body.items.length > 30) {
      res.status(400).json({ error: 'Lista de itens inválida.' });
      return;
    }

    const mpItems: ValidatedOrderItem[] = [];
    let subtotal = 0;
    let hasComboFreeShipping = false;

    for (const rawItem of body.items) {
      if (
        !rawItem ||
        typeof rawItem.id !== 'string' ||
        rawItem.id.length === 0 ||
        rawItem.id.length > 64 ||
        (rawItem.size !== '60ml' && rawItem.size !== '15ml') ||
        !Number.isInteger(rawItem.quantity) ||
        rawItem.quantity < 1 ||
        rawItem.quantity > 50
      ) {
        res.status(400).json({ error: 'Item do carrinho inválido.' });
        return;
      }

      let unitPrice = 0;
      let title = '';

      if (rawItem.id.startsWith('combo-15ml-')) {
        unitPrice = 69.9;
        title = 'SMELL GOOD - Combo 3x 15ml Pocket';
      } else if (rawItem.id.startsWith('combo-60ml-')) {
        unitPrice = 139.9;
        title = 'SMELL GOOD - Combo 2x 60ml Oficial';
        hasComboFreeShipping = true;
      } else {
        const catalogProduct = catalogMap.get(rawItem.id);
        if (!catalogProduct) {
          res.status(400).json({ error: 'Produto não encontrado no catálogo oficial.' });
          return;
        }
        unitPrice =
          rawItem.size === '15ml'
            ? Number(catalogProduct.price_15ml) || 29.9
            : Number(catalogProduct.price_60ml) || 79.9;
        const baseTitle = catalogProduct.titleFormatted || catalogProduct.name || 'Perfume Smell Good';
        title = `${baseTitle} (${rawItem.size})`;
      }

      const roundedPrice = Math.round(unitPrice * 100) / 100;
      subtotal += roundedPrice * rawItem.quantity;

      mpItems.push({
        id: rawItem.id,
        title: title.slice(0, 120),
        quantity: rawItem.quantity,
        unit_price: roundedPrice,
        currency_id: 'BRL',
      });
    }

    const isFreeShipping = subtotal >= 120 || hasComboFreeShipping;
    const shippingType = body.shippingType === 'correios_pac' ? 'correios_pac' : 'pickup';
    const shippingCost = shippingType === 'correios_pac' && !isFreeShipping ? 19.9 : 0;

    if (shippingCost > 0) {
      mpItems.push({
        id: 'frete-correios-pac',
        title: 'Frete Correios PAC',
        quantity: 1,
        unit_price: shippingCost,
        currency_id: 'BRL',
      });
    }

    const origin = resolveSafeOrigin(req);
    const safeRef =
      typeof body.externalReference === 'string' && /^[a-zA-Z0-9_-]{3,40}$/.test(body.externalReference)
        ? body.externalReference
        : `SG-${Date.now()}`;

    const payerName =
      typeof body.customer?.name === 'string' ? body.customer.name.trim().slice(0, 80) : undefined;
    const payerEmail =
      typeof body.customer?.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.customer.email.trim())
        ? body.customer.email.trim()
        : undefined;

    try {
      const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: mpItems,
          payer: {
            ...(payerName ? { name: payerName } : {}),
            ...(payerEmail ? { email: payerEmail } : {}),
          },
          external_reference: safeRef,
          statement_descriptor: 'SMELL GOOD',
          back_urls: {
            success: `${origin}/?pagamento=aprovado&pedido=${encodeURIComponent(safeRef)}`,
            pending: `${origin}/?pagamento=pendente&pedido=${encodeURIComponent(safeRef)}`,
            failure: `${origin}/?pagamento=falhou&pedido=${encodeURIComponent(safeRef)}`,
          },
          auto_return: origin.startsWith('https://') ? 'approved' : undefined,
        }),
      });

      if (!mpResponse.ok) {
        const errText = await mpResponse.text();
        console.error('Erro Mercado Pago API:', mpResponse.status, errText);
        res.status(502).json({ error: 'Não foi possível criar a sessão de pagamento no Mercado Pago.' });
        return;
      }

      const data = (await mpResponse.json()) as {
        id?: string;
        init_point?: string;
      };

      if (!data.init_point) {
        res.status(502).json({ error: 'Resposta inválida do Mercado Pago.' });
        return;
      }

      const parsedInit = new URL(data.init_point);
      if (parsedInit.protocol !== 'https:') {
        res.status(502).json({ error: 'URL de pagamento inválida.' });
        return;
      }

      res.json({
        configured: true,
        preference_id: data.id,
        init_point: parsedInit.toString(),
        total: Math.round((subtotal + shippingCost) * 100) / 100,
      });
    } catch (err) {
      console.error('Erro ao conectar com Mercado Pago:', err);
      res.status(500).json({ error: 'Erro interno ao processar checkout Mercado Pago.' });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'mpa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`SMELL GOOD server running on http://0.0.0.0:${port}`);
  });
}

startServer();
