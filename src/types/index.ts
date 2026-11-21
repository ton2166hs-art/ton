export type FragranceCategory = 'masculina' | 'feminina' | 'masculino' | 'feminino' | 'unissex';

export type PerfumeSize = '60ml' | '15ml';

export interface FragranceNotes {
  top?: string;
  heart?: string;
  base?: string;
  family?: string;
  occasion?: string;
  intensity?: string;
}

export interface Product {
  id: string;
  ref?: string;
  refFormatted?: string;
  numberCode?: string; // e.g. "02", "12", "38" from PDF catalogue
  name: string;
  fictionalName?: string;
  genericInspiration?: string;
  titleFormatted?: string;
  brandInspiration?: string;
  category: FragranceCategory;
  family?: string; // Doce, Fresco, Amadeirado, Cítrico, etc.
  price?: number;
  price_60ml: number;
  price_15ml: number;
  badge?: string;
  description: string;
  notes?: FragranceNotes;
  image?: string;
  imagem?: string;
  image_60ml?: string;
  image_15ml?: string;
  filtro?: string;
  image15ml?: string;
  foto_local?: string;
  [key: string]: any;
}

export interface CartItem {
  product: Product;
  size: PerfumeSize;
  quantity: number;
  unitPrice: number;
}

export interface ShippingOption {
  type: 'pickup' | 'correios_pac' | 'correios_sedex';
  name: string;
  price: number;
  estimatedDays: number;
  description: string;
}

export interface CustomerData {
  name: string;
  phone: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  date: string;
  customer: CustomerData;
  items: CartItem[];
  shipping: ShippingOption;
  paymentMethod: 'mercadopago' | 'pix' | 'credit_card' | 'whatsapp';
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'confirmed';
}

export interface SiteSettings {
  siteName: string;
  adminWhatsapp: string;
  adminEmail: string;
  instagram: string;
  freeShippingThreshold: number;
  price60ml: number;
  price15ml: number;
  bannerText: string;
  mercadoPagoLink?: string;
  pixKey?: string;
  pixReceiverName?: string;
  pixCity?: string;
}

export const getSensualPerfumeTag = (product: {
  name?: string;
  ref?: string;
  family?: string;
  notes?: { family?: string };
}): string => {
  const fam = (product.family || product.notes?.family || '').toLowerCase();
  const name = (product.name || '').toLowerCase();

  if (fam.includes('doce') || fam.includes('gourmand') || fam.includes('baunilha')) {
    return 'Doce na Medida Certa';
  }
  if (fam.includes('fresc') || fam.includes('aquát') || fam.includes('marinho') || fam.includes('cítric')) {
    return 'Fresco e Sofisticado';
  }
  if (fam.includes('amadeir') || fam.includes('couro') || fam.includes('vetiver')) {
    return 'Presença Marcante';
  }
  if (fam.includes('oriental') || name.includes('black') || name.includes('noite')) {
    return 'Para Noites Inesquecíveis';
  }
  if (fam.includes('floral') || fam.includes('chipre') || name.includes('scandal') || name.includes('good girl')) {
    return 'Sensual e Envolvente';
  }
  return 'Elegância Atemporal';
};
