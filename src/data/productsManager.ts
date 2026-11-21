import { Product } from '../types';
import { INITIAL_PRODUCTS } from './products';

export const STORAGE_KEY = 'smellgood_produtos';

// Catálogo oficial com as 35 fotos de alta definição enviadas pelo usuário
export const USER_WEBP_IMAGES: string[] = [
  'https://i.postimg.cc/RW6JBLVj/download-(2).webp',
  'https://i.postimg.cc/YvGLHzqy/download-(3).webp',
  'https://i.postimg.cc/zybHrFXd/download-(4).webp',
  'https://i.postimg.cc/0bHKFBxf/download-(5).webp',
  'https://i.postimg.cc/N5P2SzYZ/download-(6).webp',
  'https://i.postimg.cc/WhfqCHj8/download-(7).webp',
  'https://i.postimg.cc/8jnf90Dt/download-(8).webp',
  'https://i.postimg.cc/dLSZpxvn/download-(9).webp',
  'https://i.postimg.cc/0bHKFBxf/download-(10).webp',
  'https://i.postimg.cc/1fYV2jPN/download-(11).webp',
  'https://i.postimg.cc/TpH5F4Gg/download-(12).webp',
  'https://i.postimg.cc/HVP8RhH8/download-(13).webp',
  'https://i.postimg.cc/PPq86jGD/download-(14).webp',
  'https://i.postimg.cc/3dwDLTMv/download-(15).webp',
  'https://i.postimg.cc/YhSmXHcv/download-(16).webp',
  'https://i.postimg.cc/LnsZypdh/download-(17).webp',
  'https://i.postimg.cc/rKpthk6F/download-(18).webp',
  'https://i.postimg.cc/fJb0HN4W/download-(19).webp',
  'https://i.postimg.cc/SJKzZh0y/download-(20).webp',
  'https://i.postimg.cc/ppdn0HNR/download-(21).webp',
  'https://i.postimg.cc/4m3h8gCR/download-(22).webp',
  'https://i.postimg.cc/JtxkchFz/download-(23).webp',
  'https://i.postimg.cc/8s46BCYk/download-(24).webp',
  'https://i.postimg.cc/fkC9jbPT/download-(25).webp',
  'https://i.postimg.cc/F1pLgK6t/download-(26).webp',
  'https://i.postimg.cc/SjdM7KPF/download-(27).webp',
  'https://i.postimg.cc/23GZF5Ks/download-(28).webp',
  'https://i.postimg.cc/8s46BC0q/download-(29).webp',
  'https://i.postimg.cc/w32mcBGW/download-(30).webp',
  'https://i.postimg.cc/9zb7tfn8/download-(31).webp',
  'https://i.postimg.cc/Hjzy4Lh6/download-(32).webp',
  'https://i.postimg.cc/7b92MLWt/download-(33).webp',
];

export const USER_POCKET_IMAGES: string[] = [
  'https://i.postimg.cc/gnBLQTmF/download.png',
  'https://i.postimg.cc/N50rNchx/download-(1).png',
  'https://i.postimg.cc/KRYg92Xk/download-(2).png',
];

// Prepare the standard 48 perfumes with all required fields (REF, Nome, Gênero, Preço 60ml, Preço 15ml, Descrição, Categoria)
export const DEFAULT_48_PRODUCTS: Product[] = INITIAL_PRODUCTS.map((p, idx) => {
  const refCode = p.numberCode || String(idx + 1).padStart(2, '0');
  const gen = p.category === 'feminina' || p.category === 'feminino' ? 'feminino' : 'masculino';
  const occ = p.notes?.occasion?.toLowerCase().includes('dia') ? 'Dia/Trabalho' : 'Noite/Festa';
  const fam = p.notes?.family || (gen === 'masculino' ? 'Amadeirado' : 'Floral');
  const wImg = USER_WEBP_IMAGES[idx % USER_WEBP_IMAGES.length];
  const pImg = USER_POCKET_IMAGES[idx % USER_POCKET_IMAGES.length];

  return {
    id: p.id || `ref-${refCode}`,
    ref: refCode,
    refFormatted: `REF ${refCode} - ${p.name}`,
    numberCode: refCode,
    name: p.name,
    fictionalName: p.fictionalName,
    genericInspiration: p.genericInspiration,
    titleFormatted: p.titleFormatted,
    brandInspiration: p.name,
    category: gen,
    family: fam,
    price: p.price_60ml || 79.9,
    price_60ml: p.price_60ml || 79.9,
    price_15ml: p.price_15ml || 29.9,
    description: p.description ? p.description.replace(/fixação de até 12 horas/gi, 'alta fixação de 6h a 10h*').replace(/alta fixação de 12 horas/gi, 'alta fixação de 6h a 10h*') : `Fragrância artesanal com curadoria editorial. Inspirada em ${p.name}, criada em Sertãozinho/SP com alta fixação de 6h a 10h*.`,
    badge: p.badge || '',
    image: wImg,
    imagem: wImg,
    image_60ml: wImg,
    image_15ml: pImg,
    image15ml: pImg,
    filtro: p.filtro || (fam.toLowerCase().includes('amadeir') ? 'mais_escuro' : (fam.toLowerCase().includes('floral') || fam.toLowerCase().includes('cítric') ? 'rosado' : 'padrao')),
    notes: {
      family: fam,
      occasion: occ,
      intensity: p.notes?.intensity || 'Intenso',
      top: p.notes?.top || '',
      heart: p.notes?.heart || '',
      base: p.notes?.base || '',
    },
  };
});

export function getStoredProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let changed = false;
        const normalized = parsed.map((p: Product, idx: number) => {
          let updatedP = { ...p };
          if (updatedP.price_60ml === 100 || updatedP.price_60ml === 30 || !updatedP.price_60ml) {
            updatedP.price_60ml = 79.9;
            updatedP.price = 79.9;
            changed = true;
          }
          if (updatedP.price_15ml === 35 || updatedP.price_15ml === 30 || !updatedP.price_15ml) {
            updatedP.price_15ml = 29.9;
            changed = true;
          }
          const wImg = USER_WEBP_IMAGES[idx % USER_WEBP_IMAGES.length];
          const pImg = USER_POCKET_IMAGES[idx % USER_POCKET_IMAGES.length];

          if (!updatedP.imagem || !updatedP.image || updatedP.image.endsWith('.svg') || updatedP.image.includes('Screenshot') || !updatedP.image_60ml || updatedP.image === 'https://i.postimg.cc/0bHKFBxf/download-10.webp') {
            updatedP.image = wImg;
            updatedP.imagem = wImg;
            updatedP.image_60ml = wImg;
            updatedP.image_15ml = pImg;
            updatedP.image15ml = pImg;
            changed = true;
          }
          if (updatedP.description && (updatedP.description.includes('12 horas') || updatedP.description.includes('12h') || updatedP.description.includes('12H'))) {
            updatedP.description = updatedP.description
              .replace(/fixação de até 12 horas/gi, 'alta fixação de 6h a 10h*')
              .replace(/alta fixação de 12 horas/gi, 'alta fixação de 6h a 10h*')
              .replace(/fixação 12h/gi, 'alta fixação (6h a 10h*)')
              .replace(/12 horas/gi, '6h a 10h*');
            changed = true;
          }
          return updatedP;
        });
        if (changed) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
          } catch {
            // quiet
          }
        }
        return normalized;
      }
    }
    // Also check legacy key if exists
    const legacy = localStorage.getItem('smellgood_products');
    if (legacy) {
      const parsedLegacy = JSON.parse(legacy);
      if (Array.isArray(parsedLegacy) && parsedLegacy.length > 0) {
        localStorage.setItem(STORAGE_KEY, legacy);
        return parsedLegacy;
      }
    }
  } catch (err) {
    console.error('Error reading stored products:', err);
  }

  // Fallback to the 48 standard perfumes
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_48_PRODUCTS));
  } catch {
    // quota safe
  }
  return DEFAULT_48_PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    window.dispatchEvent(new Event('smellgood_produtos_updated'));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('Error saving products to localStorage:', err);
  }
}

export function addOrUpdateStoredProduct(product: Product): Product[] {
  const current = getStoredProducts();
  const existingIdx = current.findIndex(
    (p) => p.id === product.id || (product.ref && (p.ref === product.ref || p.numberCode === product.ref))
  );

  let updated: Product[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = { ...current[existingIdx], ...product };
  } else {
    updated = [product, ...current];
  }

  saveStoredProducts(updated);
  return updated;
}

export function removeStoredProduct(id: string): Product[] {
  const current = getStoredProducts();
  const updated = current.filter((p) => p.id !== id);
  saveStoredProducts(updated);
  return updated;
}

export function resetToDefaultProducts(): Product[] {
  saveStoredProducts(DEFAULT_48_PRODUCTS);
  return DEFAULT_48_PRODUCTS;
}
