import React from 'react';
import { MessageCircle, Instagram, MapPin, Settings } from 'lucide-react';
import { LotusLogo } from './LotusLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  onSelectTab: (tab: string) => void;
  onOpenAiConsultant?: () => void;
  onOpenPrivacy?: () => void;
  whatsappNumber?: string;
  instagramUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onSelectTab,
  onOpenAiConsultant,
  onOpenPrivacy,
  whatsappNumber = '5516990603561',
  instagramUrl = 'https://instagram.com/smellgood.br',
}) => {
  const cleanNumber = whatsappNumber.replace(/\D/g, '') || '5516990603561';
  return (
    <footer className="bg-[#070707] border-t border-[#D4AF37]/25 text-[#B8AF9E] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D4AF37]/15">
          {/* Brand Info with Lotus Logo */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('catalogo')}>
              <div className="p-1 rounded-sm border border-[#D4AF37]/35 bg-[#D4AF37]/5">
                <LotusLogo className="w-8 h-8" />
              </div>
              <div>
                <span className="font-display text-xl sm:text-2xl tracking-[8px] text-[#F5F1EB] uppercase block font-normal">
                  SMELL GOOD
                </span>
                <span className="font-body text-[8px] tracking-[3px] uppercase text-[#D4AF37] font-light block mt-1">
                  Perfumaria Artesanal com Curadoria Editorial
                </span>
              </div>
            </div>
            <p className="font-body text-xs text-[#B8AF9E] font-light leading-relaxed max-w-sm">
              &ldquo;A elegância é a única beleza que nunca desaparece.&rdquo; Fragrâncias artesanais inspiradas nas maiores grifes internacionais com alta fixação de 6h a 10h*.
            </p>
            <p className="text-[10px] text-[#D4AF37]/90 italic tracking-wide">
              *varia conforme pele
            </p>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-medium">
              <MapPin className="w-4 h-4 shrink-0 text-[#D4AF37]" />
              <span>Sertãozinho · Brasil</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[10px] tracking-[2.5px] uppercase text-[#F5F1EB] font-semibold">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('catalogo')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Coleção Completa (46 Inspirações)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('combos')}
                  className="hover:text-[#D4AF37] text-[#D4AF37] transition-colors cursor-pointer font-medium"
                >
                  Combos Mais Vendidos (Leve +, Pague -)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('masculino')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Perfumes Masculinos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('feminino')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Perfumes Femininos
                </button>
              </li>
              {onOpenAiConsultant && (
                <li>
                  <button
                    onClick={onOpenAiConsultant}
                    className="hover:text-[#D4AF37] text-[#D4AF37] transition-colors cursor-pointer font-medium"
                  >
                    Consultor Olfativo IA
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onSelectTab('pocket15ml')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Linha Pocket 15ml (R$ 29,90)
                </button>
              </li>
              {onOpenPrivacy && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="hover:text-[#D4AF37] text-[#D4AF37] transition-colors cursor-pointer font-medium text-left"
                  >
                    Política de Privacidade e Trocas
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Socials & WhatsApp: Sertãozinho Brasil, Instagram, WhatsApp */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[10px] tracking-[2.5px] uppercase text-[#F5F1EB] font-semibold">
              Atendimento &amp; Contato
            </h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(
                  'Olá, vim pelo site Smell Good e quero saber mais sobre as REFs'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 bg-[#121212] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#F5F1EB] hover:text-[#D4AF37] transition-colors rounded-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: (16) 99060-3561</span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3 py-2 bg-[#121212] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#F5F1EB] hover:text-[#D4AF37] transition-colors rounded-xs"
              >
                <Instagram className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Instagram: @smellgood.br</span>
              </a>
            </div>

            <div className="pt-1 text-[11px] text-[#B8AF9E] font-light">
              Produzido em <strong className="text-[#F5F1EB]">Sertãozinho - Brasil</strong>. Entregas locais expressas e envios para todo o Brasil.
            </div>
          </div>
        </div>

        {/* Declaração Legal Solicitada (Sem CNPJ - Pessoa Física) */}
        <div className="my-8 p-4 bg-[#0e0e0e] border border-[#D4AF37]/30 rounded-xs text-center shadow-lg">
          <p className="text-xs sm:text-sm text-[#F5F1EB] font-light tracking-wide leading-relaxed">
            Smell Good Perfumaria - Sertãozinho/SP | CPF: Venda como Pessoa Física | Atendimento: (16) 99060-3561 | Envios para todo Brasil via Correios
          </p>
          {onOpenPrivacy && (
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-[11px] text-[#D4AF37] hover:underline mt-2 inline-block font-medium cursor-pointer"
            >
              Consultar Política de Privacidade e Trocas &rarr;
            </button>
          )}
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#888]">
          <p>© {new Date().getFullYear()} SMELL GOOD Perfumes Artesanais — Sertãozinho - Brasil. Todos os direitos reservados. <span className="text-[#D4AF37] italic ml-1">*varia conforme pele</span></p>
          <div className="flex items-center gap-3">
            <a
              href="/admin.html"
              className="text-[#888] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 border border-[#D4AF37]/35 hover:border-[#D4AF37] px-2.5 py-1 rounded-xs"
              title="Acessar /admin.html"
            >
              <Settings className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-[1px]">Painel Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
