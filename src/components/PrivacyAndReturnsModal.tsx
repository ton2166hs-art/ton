import React from 'react';
import { X, ShieldCheck, RefreshCw, Truck, Lock, MessageCircle } from 'lucide-react';
import { LotusLogo } from './LotusLogo';

interface PrivacyAndReturnsModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
}

export const PrivacyAndReturnsModal: React.FC<PrivacyAndReturnsModalProps> = ({
  isOpen,
  onClose,
  whatsappNumber = '5516990603561',
}) => {
  if (!isOpen) return null;

  const cleanNumber = whatsappNumber.replace(/\D/g, '') || '5516990603561';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-[#121212] border border-[#D4AF37]/40 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#D4AF37]/25 flex items-center justify-between bg-[#141414]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 className="font-display text-xl sm:text-2xl text-[#F5F1EB] font-normal tracking-wide">
                Política de Privacidade &amp; Trocas
              </h2>
              <span className="text-[10px] tracking-[2px] uppercase text-[#D4AF37] block font-light">
                SMELL GOOD PERFUMARIA · SERTÃOZINHO/SP
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#B8AF9E] hover:text-[#F5F1EB] rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-xs sm:text-sm text-[#B8AF9E] font-light leading-relaxed">
          {/* Seção 1: Trocas e Devoluções */}
          <div className="p-4 bg-[#181818] border border-[#D4AF37]/20 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-[#F5F1EB] font-medium text-sm">
              <RefreshCw className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="font-display text-base tracking-wide text-[#F5F1EB]">
                1. Política de Trocas e Devoluções
              </h3>
            </div>
            <p>
              Em conformidade com o <strong>Artigo 49 do Código de Defesa do Consumidor (CDC)</strong>, você tem até <strong>7 (sete) dias corridos</strong> após o recebimento da encomenda para solicitar a devolução ou troca do produto em caso de arrependimento.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#DDD]">
              <li><strong>Condição do Frasco:</strong> O perfume deve estar em sua embalagem original, lacrado, sem sinais de uso excessivo e acompanhado de todos os acessórios originais.</li>
              <li><strong>Defeito de Válvula / Vazamento no Transporte:</strong> Caso o frasco chegue danificado ou com vazamento decorrente do transporte, envie uma foto/vídeo imediatamente ao nosso WhatsApp em até 48 horas após a entrega para envio imediato de um novo exemplar sem custo adicional.</li>
              <li><strong>Custos de Frete de Devolução:</strong> Em caso de defeito constatado ou erro no envio, todos os custos de frete são de total responsabilidade da Smell Good Perfumaria.</li>
            </ul>
          </div>

          {/* Seção 2: Privacidade e Segurança dos Dados */}
          <div className="p-4 bg-[#181818] border border-[#D4AF37]/20 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-[#F5F1EB] font-medium text-sm">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="font-display text-base tracking-wide text-[#F5F1EB]">
                2. Política de Privacidade &amp; Proteção de Dados
              </h3>
            </div>
            <p>
              A Smell Good Perfumaria preza pelo absoluto sigilo das suas informações pessoais:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#DDD]">
              <li><strong>Uso dos Dados:</strong> Seus dados de Nome, WhatsApp e Endereço são coletados unicamente para a entrega do pedido e emissão do comprovante de envio via Correios.</li>
              <li><strong>Segurança nos Pagamentos:</strong> Transações com Cartão de Crédito e PIX são processadas diretamente no ambiente seguro e criptografado do <strong>Mercado Pago</strong> e das instituições financeiras integradas. Não armazenamos senhas ou números de cartões em nossos servidores.</li>
              <li><strong>Não Compartilhamento:</strong> Seus dados jamais serão vendidos, alugados ou compartilhados com empresas de publicidade de terceiros.</li>
            </ul>
          </div>

          {/* Seção 3: Informações de Envio e Atendimento */}
          <div className="p-4 bg-[#181818] border border-[#D4AF37]/20 rounded-xs space-y-3">
            <div className="flex items-center gap-2 text-[#F5F1EB] font-medium text-sm">
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="font-display text-base tracking-wide text-[#F5F1EB]">
                3. Envios para Todo o Brasil &amp; Retirada Local
              </h3>
            </div>
            <p>
              • <strong>Envios Nacionais:</strong> Realizados via Correios (modalidades PAC e SEDEX). Após a postagem, o código de rastreamento é enviado diretamente no seu WhatsApp para acompanhamento em tempo real.<br />
              • <strong>Retirada em Sertãozinho/SP:</strong> Clientes de Sertãozinho e região têm a opção de retirada local gratuita ou entrega expressa combinada com dia e horário agendados.<br />
              • <strong>Natureza da Operação:</strong> Venda artesanal como Pessoa Física (Sertãozinho - SP, Brasil).
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#D4AF37]/25 bg-[#141414] flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent('Olá! Tenho uma dúvida sobre a Política de Trocas e Envios da Smell Good.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com o Atendimento via WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#D4AF37] hover:bg-[#E5C464] text-[#0A0A0A] text-xs font-bold uppercase tracking-[2px] rounded-xs cursor-pointer transition-all"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
