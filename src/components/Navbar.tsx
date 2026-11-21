import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, MessageCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CrownGold } from './CrownGold';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAiConsultant: () => void;
  whatsappNumber?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenAiConsultant,
  whatsappNumber = '5516990603561',
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cleanNumber = whatsappNumber.replace(/\D/g, '') || '5516990603561';

  const navLinks = [
    { id: 'catalogo', label: 'Mais Vendidos' },
    { id: 'sensacoes', label: 'Sensações' },
    { id: 'masculino', label: 'Masculino' },
    { id: 'feminino', label: 'Feminino' },
    { id: 'pocket15ml', label: 'Pocket 15ml' },
    { id: 'consultor_ia', label: 'Consultor IA', isAi: true },
  ];

  const handleNavClick = (id: string, isAi?: boolean) => {
    if (isAi) {
      onOpenAiConsultant();
      setMobileMenuOpen(false);
      return;
    }
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222222] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Mobile Menu Trigger (Mobile only) */}
          <div className="flex items-center lg:hidden mr-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#B8AF9E] hover:text-[#D4AF37] transition-colors focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left Corner: Brand Logo (SMELL GOOD / THE KING OF SCENTS / ALTA FIXAÇÃO 6H À 10H) */}
          <div
            className="flex items-center gap-3 cursor-pointer group py-2"
            onClick={() => handleNavClick('catalogo')}
          >
            <div className="p-1 rounded-sm border border-[#D4AF37]/35 bg-[#D4AF37]/10 group-hover:border-[#D4AF37] transition-all flex items-center justify-center shrink-0">
              <CrownGold size={30} />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl sm:text-2xl lg:text-[24px] font-bold tracking-[5px] sm:tracking-[7px] text-white uppercase leading-none group-hover:text-[#C5A880] transition-colors">
                SMELL GOOD
              </span>
              <span className="font-serif text-[11px] sm:text-[12px] tracking-[2.5px] uppercase text-[#C5A880] font-semibold mt-1 leading-tight">
                THE KING OF SCENTS
              </span>
              <span className="text-[8px] sm:text-[8.5px] tracking-[1.5px] uppercase text-[#A89F91] font-light mt-0.5 leading-none">
                ALTA FIXAÇÃO 6H À 10H
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              if (link.isAi) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id, true)}
                    className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] font-body text-xs tracking-[2px] uppercase font-semibold transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>{link.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`font-body text-xs tracking-[2px] uppercase font-medium transition-colors relative py-1 cursor-pointer ${
                    isActive ? 'text-[#D4AF37] !font-bold' : 'text-[#B8AF9E] hover:text-[#F5F1EB]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-[#B8AF9E] hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5 cursor-pointer"
              title="Buscar fragrância"
              aria-label="Buscar fragrância"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                'Olá, vim pelo site Smell Good e quero saber mais sobre as REFs'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-[1px] font-semibold text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all rounded-xs"
              title="Fale no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>(16) 99060-3561</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#F5F1EB] hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5 flex items-center cursor-pointer"
              aria-label="Sacola de compras"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#0A0A0A] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#222222] bg-[#0A0A0A] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, link.isAi)}
                className={`text-left text-sm tracking-[2px] uppercase py-2.5 border-b border-white/5 transition-colors flex items-center justify-between ${
                  activeTab === link.id ? 'text-[#D4AF37] font-semibold' : 'text-[#B8AF9E] hover:text-[#F5F1EB]'
                }`}
              >
                <span>{link.label}</span>
                {link.isAi && (
                  <span className="px-2 py-0.5 text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] rounded-full">
                    IA
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                'Olá, vim pelo site Smell Good e quero saber mais sobre as REFs'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs tracking-[2px] uppercase font-semibold rounded-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: (16) 99060-3561</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
