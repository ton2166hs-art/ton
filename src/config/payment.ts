// ============================================================================
// 💳 CONFIGURAÇÃO MERCADO PAGO & PIX — SMELL GOOD PERFUMARIA
//
// Como configurar para receber na Hostinger (hospedagem estática):
// 1. No app ou site do Mercado Pago, crie um Link de Pagamento / Catálogo e
//    cole abaixo em `checkoutLink` (ex: "https://mpago.la/2vX9abc" ou
//    "https://link.mercadopago.com.br/smellgood"), OU configure direto pelo
//    Painel Admin do site (botão "Admin" no rodapé).
// 2. Em `pixKey`, coloque sua Chave PIX cadastrada no Mercado Pago
//    (E-mail, CPF sem pontos, Chave Aleatória ou Telefone com +55).
//
// Se hospedar com backend Node.js, configure também a variável de ambiente
// `MERCADO_PAGO_ACCESS_TOKEN` no servidor (nunca no código do navegador).
// ============================================================================

import { SiteSettings } from '../types';

export interface MercadoPagoPublicConfig {
  checkoutLink: string;
  pixKey: string;
  pixReceiverName: string;
  pixCity: string;
}

export const DEFAULT_MERCADO_PAGO_CONFIG: MercadoPagoPublicConfig = {
  checkoutLink: '',
  pixKey: '+5516990603561',
  pixReceiverName: 'SMELL GOOD PERFUMARIA',
  pixCity: 'SERTAOZINHO',
};

// Mantido para compatibilidade caso você prefira editar só esta constante:
export const LINK_MERCADO_PAGO = DEFAULT_MERCADO_PAGO_CONFIG.checkoutLink;

export function sanitizeHttpsUrl(rawUrl?: string | null): string {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed === 'COLE_SEU_LINK_AQUI') return '';
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return '';
    return parsed.toString();
  } catch {
    return '';
  }
}

export function isMercadoPagoUrlValid(rawUrl?: string | null): boolean {
  return sanitizeHttpsUrl(rawUrl).length > 0;
}

export function getEffectivePaymentConfig(settings?: Partial<SiteSettings> | null): MercadoPagoPublicConfig {
  const fromSettingsLink = sanitizeHttpsUrl(settings?.mercadoPagoLink);
  const fromStaticLink = sanitizeHttpsUrl(DEFAULT_MERCADO_PAGO_CONFIG.checkoutLink);

  const settingsPix = settings?.pixKey?.trim();
  const settingsReceiver = settings?.pixReceiverName?.trim();
  const settingsCity = settings?.pixCity?.trim();

  return {
    checkoutLink: fromSettingsLink || fromStaticLink,
    pixKey: settingsPix || DEFAULT_MERCADO_PAGO_CONFIG.pixKey,
    pixReceiverName: settingsReceiver || DEFAULT_MERCADO_PAGO_CONFIG.pixReceiverName,
    pixCity: settingsCity || DEFAULT_MERCADO_PAGO_CONFIG.pixCity,
  };
}
