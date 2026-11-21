import React from 'react';
import { CrownGold } from './CrownGold';
import { ShieldCheck, Lock, MessageCircle, Settings, RefreshCw } from 'lucide-react';

interface KingFooterProps {
  onOpenPrivacy?: () => void;
  onOpenAdmin?: () => void;
  onSelectTab?: (tab: string) => void;
  whatsappNumber?: string;
}

export const KingFooter: React.FC<KingFooterProps> = ({
  onOpenPrivacy,
  onOpenAdmin,
  onSelectTab,
  whatsappNumber = '5516990603561',
}) => {
  const cleanNumber = whatsappNumber.replace(/\D/g, '') || '5516990603561';

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222222] text-[#B8AF9E] pt-14 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 1. FRASE ÍCONE DO KING EM DESTAQUE DOURADO */}
        <div className="text-center space-y-3 py-6 border-b border-[#222222]">
          <div className="flex justify-center">
            <CrownGold size={32} />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F9E29D] via-[#D4AF37] to-[#C59B27] tracking-[4px] sm:tracking-[6px] uppercase font-light">
            MAIS QUE PERFUMES, UMA IDENTIDADE
          </h3>
          <p className="text-xs sm:text-sm text-[#C5A880] tracking-widest uppercase font-medium">
            SMELL GOOD · THE KING OF SCENTS · SERTÃOZINHO / BRASIL
          </p>
        </div>

        {/* 2. SELOS DE SEGURANÇA (LOJA SEGURA GOOGLE SAFE BROWSING IGUAL AO VÍDEO) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-[#222222]">
          
          {/* Selo 1: Google Safe Browsing */}
          <div className="p-4 bg-[#121212] border border-[#2A2A2A] rounded-xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>LOJA SEGURA</span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 px-1.5 py-0.2 rounded-xs">
                  PROTEGIDO
                </span>
              </div>
              <div className="text-[11px] text-[#A0A0A0] mt-0.5">
                Google Safe Browsing &amp; Norton Secured
              </div>
            </div>
          </div>

          {/* Selo 2: Criptografia SSL 256-bit */}
          <div className="p-4 bg-[#121212] border border-[#2A2A2A] rounded-xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
              <Lock className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                CRIPTOGRAFIA SSL 256-BIT
              </div>
              <div className="text-[11px] text-[#A0A0A0] mt-0.5">
                Seus dados e pagamentos 100% blindados
              </div>
            </div>
          </div>

          {/* Selo 3: Satisfação Garantida & Envios Correios */}
          <div className="p-4 bg-[#121212] border border-[#2A2A2A] rounded-xs flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-blue-950/40 border border-blue-500/40 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                GARANTIA DE 7 DIAS (CDC)
              </div>
              <div className="text-[11px] text-[#A0A0A0] mt-0.5">
                Envio com rastreamento diário via Correios
              </div>
            </div>
          </div>
        </div>

        {/* 3. BANDEIRAS DE CARTÃO E FORMAS DE PAGAMENTO */}
        <div className="text-center space-y-3 py-4 border-b border-[#222222]">
          <span className="text-[11px] tracking-[2px] uppercase text-[#888888] block font-medium">
            FORMAS DE PAGAMENTO ACEITAS NO CHECKOUT MERCADO PAGO E WHATSAPP
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {/* PIX */}
            <div className="px-3 py-1.5 bg-[#141414] border border-[#333333] rounded-xs flex items-center gap-1.5 text-xs text-white font-bold">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>PIX Instantâneo</span>
            </div>

            {/* Mercado Pago */}
            <div className="px-3 py-1.5 bg-[#141414] border border-[#333333] rounded-xs flex items-center gap-1.5 text-xs text-[#009EE3] font-bold">
              <span>Mercado Pago</span>
            </div>

            {/* Visa */}
            <div className="px-3 py-1.5 bg-[#141414] border border-[#333333] rounded-xs text-xs text-white font-semibold">
              Visa
            </div>

            {/* Mastercard */}
            <div className="px-3 py-1.5 bg-[#141414] border border-[#333333] rounded-xs text-xs text-white font-semibold">
              Mastercard
            </div>

            {/* Elo */}
            <div className="px-3 py-1.5 bg-[#141414] border border-[#333333] rounded-xs text-xs text-white font-semibold">
              Elo
            </div>

            {/* Hipercard */}
            <div className="px-3 py-1.5 bg-[#141414] border border-[#333333] rounded-xs text-xs text-white font-semibold">
              Hipercard
            </div>
          </div>
        </div>

        {/* 4. CANAIS DE ATENDIMENTO E SUPORTE: WHATSAPP (16) 99060-3561 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          
          {/* Coluna 1: Atendimento WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[2px] uppercase text-white font-semibold flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Atendimento Oficial</span>
            </h4>
            <p className="text-[#A0A0A0] leading-relaxed">
              Tire dúvidas sobre notas, combinações e pedidos direto com nosso time:
            </p>
            <a
              href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent('Olá, vim pelo site SMELL GOOD e gostaria de informações.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-950/40 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 font-semibold rounded-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>(16) 99060-3561</span>
            </a>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[2px] uppercase text-white font-semibold">
              Navegação
            </h4>
            <ul className="space-y-2 text-[#A0A0A0]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('catalogo')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Mais Vendidos do Mês
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('pocket15ml')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Linha Pocket 15ml (R$ 29,90)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab && onSelectTab('combos')}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  Combos Promocionais
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Políticas e Segurança */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[2px] uppercase text-white font-semibold">
              Transparência
            </h4>
            <ul className="space-y-2 text-[#A0A0A0]">
              {onOpenPrivacy && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="hover:text-[#D4AF37] text-[#D4AF37] transition-colors cursor-pointer font-medium text-left"
                  >
                    Política de Privacidade e Trocas &rarr;
                  </button>
                </li>
              )}
              <li>
                <span>Direito de Arrependimento de 7 dias (CDC)</span>
              </li>
              <li>
                <span>Envio rastreado via Correios Brasil</span>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Origem e Produção */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[2px] uppercase text-white font-semibold">
              Origem Artesanal
            </h4>
            <p className="text-[#A0A0A0] leading-relaxed">
              Produzido com rigor e paixão em <strong className="text-white">Sertãozinho - SP, Brasil</strong>. Entregas locais expressas e frete para todo o país.
            </p>
          </div>
        </div>

        {/* 5. TEXTO EXIGIDO PELO USUÁRIO (RODAPÉ SEM CNPJ - VENDA COMO PESSOA FÍSICA) */}
        <div className="p-4 bg-[#111111] border border-[#2B2B2B] rounded-xs text-center space-y-2">
          <p className="text-xs sm:text-sm text-[#F0EBE1] font-light tracking-wide leading-relaxed">
            Smell Good Perfumaria - Sertãozinho/SP | CPF: Venda como Pessoa Física | Atendimento: (16) 99060-3561 | Envios para todo Brasil via Correios
          </p>
        </div>

        {/* 6. CRÉDITOS FINAIS */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#777777]">
          <p>© {new Date().getFullYear()} SMELL GOOD — THE KING OF SCENTS. Todos os direitos reservados. *Fixação varia conforme tipo de pele.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#888888]">Sertãozinho · São Paulo · Brasil</span>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-[#777777] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1 cursor-pointer"
                title="Configurações da Loja e Mercado Pago"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
