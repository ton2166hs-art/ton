/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { INITIAL_PRODUCTS, DEFAULT_SITE_SETTINGS } from './data/products';
import { getStoredProducts, addOrUpdateStoredProduct } from './data/productsManager';
import { Product, SiteSettings, Order, PerfumeSize } from './types';
import { Navbar } from './components/Navbar';
import { Marquee } from './components/Marquee';
import { KingHeroSlider } from './components/KingHeroSlider';
import { SensationsCategories } from './components/SensationsCategories';
import { KingBestSellersGrid } from './components/KingBestSellersGrid';
import { BestSellerCombos } from './components/BestSellerCombos';
import { IdentityFullBanner } from './components/IdentityFullBanner';
import { AboutSection } from './components/AboutSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SearchModal } from './components/SearchModal';
import { AdminModal } from './components/AdminModal';
import { AiConsultantModal } from './components/AiConsultantModal';
import { NotificationToast } from './components/NotificationToast';
import { KingFooter } from './components/KingFooter';
import { PrivacyAndReturnsModal } from './components/PrivacyAndReturnsModal';
import { MessageCircle } from 'lucide-react';

function SmellGoodShop() {
  const { buyNow, clearCart, showNotification } = useCart();
  const [activeTab, setActiveTab] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiConsultantOpen, setIsAiConsultantOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [activeSensation, setActiveSensation] = useState<string | null>(null);

  const handleBuyNow = (product: Product, size: PerfumeSize = '60ml') => {
    buyNow(product, size, 1);
  };

  // Settings with localStorage persistence
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('smellgood_site_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.adminWhatsapp === '5516992559399' ||
          parsed.adminWhatsapp === '5516988683561' ||
          !parsed.adminWhatsapp
        ) {
          parsed.adminWhatsapp = '5516990603561';
        }
        if (parsed.freeShippingThreshold === 300 || !parsed.freeShippingThreshold) {
          parsed.freeShippingThreshold = 120;
        }
        parsed.price60ml = 79.9;
        parsed.price15ml = 29.9;
        if (!parsed.bannerText || parsed.bannerText.includes('PARFUMS') || parsed.bannerText.includes('Parfums')) {
          parsed.bannerText = DEFAULT_SITE_SETTINGS.bannerText;
        }
        return { ...DEFAULT_SITE_SETTINGS, ...parsed };
      }
      return DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  // Products with localStorage persistence & instant sync with /admin.html
  const [products, setProducts] = useState<Product[]>(() => {
    return getStoredProducts();
  });

  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
      window.location.href = '/admin.html';
    }
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('pagamento');
    const orderRef = params.get('pedido');
    if (paymentStatus === 'aprovado') {
      clearCart();
      showNotification(`Pagamento aprovado via Mercado Pago${orderRef ? ` (${orderRef})` : ''}!`);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (paymentStatus === 'pendente') {
      showNotification(`Pagamento em processamento no Mercado Pago${orderRef ? ` (${orderRef})` : ''}.`);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (paymentStatus === 'falhou') {
      showNotification('Pagamento não concluído. Você pode tentar novamente pela sacola.');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [clearCart, showNotification]);

  useEffect(() => {
    const handleSync = () => {
      setProducts(getStoredProducts());
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('smellgood_produtos_updated', handleSync);
    window.addEventListener('smellgood_products_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('smellgood_produtos_updated', handleSync);
      window.removeEventListener('smellgood_products_updated', handleSync);
    };
  }, []);

  const handleSaveSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('smellgood_site_settings', JSON.stringify(newSettings));
    } catch {
      // quiet
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    const updated = addOrUpdateStoredProduct(newProduct);
    setProducts(updated);
  };

  const handleSelectTab = (tab: string) => {
    if (tab === 'consultor_ia') {
      setIsAiConsultantOpen(true);
      return;
    }
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'combos') {
      const el = document.getElementById('combos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tab === 'sensacoes') {
      const el = document.getElementById('sensacoes');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tab === 'catalogo' || tab === 'masculino' || tab === 'feminino' || tab === 'pocket15ml') {
      const el = document.getElementById('mais-vendidos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (tab === 'sobre') {
      const el = document.getElementById('sobre');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectSensation = (sensationKey: string) => {
    setActiveSensation((prev) => (prev === sensationKey ? null : sensationKey));
    const el = document.getElementById('mais-vendidos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F1EB] selection:bg-[#D4AF37]/30 selection:text-[#F5F1EB] flex flex-col justify-between">
      <div>
        {/* Top Marquee */}
        <Marquee text={settings.bannerText} />

        {/* Sticky Luxury Navbar com Logo Real da Coroa */}
        <Navbar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAiConsultant={() => setIsAiConsultantOpen(true)}
          whatsappNumber={settings.adminWhatsapp}
        />

        <main>
          {/* 1. BANNERS FULL-WIDTH CINEMATOGRÁFICOS (100vw, h-[500px], Le Beau style, Amazônica, Pocket 15ml) */}
          <KingHeroSlider
            onExplore={() => handleSelectTab('catalogo')}
            onPocket={() => handleSelectTab('pocket15ml')}
          />

          {/* 2. CATEGORIAS EM FOTO ("Explore por sensações" com 4 quadrados deslizáveis no mobile) */}
          <div id="sensacoes">
            <SensationsCategories
              onSelectSensation={handleSelectSensation}
              activeSensation={activeSensation}
            />
          </div>

          {/* 3. VITRINE "OS MAIS VENDIDOS DO MÊS" COM FUNDO BRANCO #FFFFFF IGUAL KING */}
          <div id="mais-vendidos">
            <KingBestSellersGrid
              products={products}
              onOpenDetail={(p) => setSelectedProduct(p)}
              onBuyNow={handleBuyNow}
              activeSensation={activeSensation}
              onClearSensation={() => setActiveSensation(null)}
            />
          </div>

          {/* Combos Mais Vendidos (Leve Mais, Pague Menos) */}
          <BestSellerCombos
            products={products}
            whatsappNumber={settings.adminWhatsapp}
            onOpenDetail={(p) => setSelectedProduct(p)}
          />

          {/* Banner Full-Width: Mais que Perfume, Uma Identidade */}
          <IdentityFullBanner onExplore={() => handleSelectTab('catalogo')} />

          {/* Brand Philosophy / Story Section */}
          <AboutSection />
        </main>
      </div>

      {/* 5. RODAPÉ DE SEGURANÇA IGUAL KING COM GOOGLE SAFE BROWSING, BANDEIRAS, WHATSAPP (16) 99060-3561 */}
      <KingFooter
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectTab={handleSelectTab}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        whatsappNumber={settings.adminWhatsapp}
      />

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/5516990603561?text=${encodeURIComponent(
          'Olá, vim pelo site Smell Good e gostaria de informações sobre os perfumes.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all hover:scale-110 flex items-center justify-center cursor-pointer"
        title="Atendimento via WhatsApp (16) 99060-3561"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* AI Sommelier Consultant Modal */}
      <AiConsultantModal
        isOpen={isAiConsultantOpen}
        onClose={() => setIsAiConsultantOpen(false)}
        products={products}
        onBuyNow={handleBuyNow}
        onOpenProductDetail={(p) => setSelectedProduct(p)}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuyNow={handleBuyNow}
        whatsappNumber={settings.adminWhatsapp}
      />

      {/* Carrinho Lateral com Mercado Pago e WhatsApp */}
      <CartDrawer whatsappNumber={settings.adminWhatsapp} settings={settings} />

      <CheckoutModal
        whatsappNumber={settings.adminWhatsapp}
        onOrderSuccess={(order) => setLastOrder(order)}
      />

      <OrderSuccessModal
        order={lastOrder}
        onClose={() => setLastOrder(null)}
        whatsappNumber={settings.adminWhatsapp}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        products={products}
        onAddProduct={handleAddProduct}
      />

      <PrivacyAndReturnsModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        whatsappNumber={settings.adminWhatsapp}
      />

      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <SmellGoodShop />
    </CartProvider>
  );
}
