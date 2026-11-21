import React from 'react';
import { CheckCircle2, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  whatsappNumber?: string;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  whatsappNumber = '5516990603561',
}) => {
  if (!order) return null;

  const cleanTargetNumber = whatsappNumber.replace(/\D/g, '') || '5516990603561';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-[#141414] border border-[#c9a84c]/40 rounded-sm p-6 sm:p-8 text-center space-y-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c] text-[#c9a84c] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(201,168,76,0.3)]">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] tracking-[3px] uppercase text-[#c9a84c] font-bold">
            Pedido Confirmado
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#f4efe6] font-light">
            Pedido #{order.id}
          </h2>
          <p className="text-xs text-[#9e8f85] font-light leading-relaxed max-w-sm mx-auto">
            Obrigado pela preferência, <strong className="text-[#f4efe6]">{order.customer.name}</strong>! Seu pedido foi registrado com sucesso.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#0e0e0e] border border-white/10 rounded-xs p-4 text-left text-xs space-y-2.5">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-[#9e8f85]">Entrega:</span>
            <span className="text-[#f4efe6] font-medium">{order.shipping.name}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-[#9e8f85]">Forma de Pagamento:</span>
            <span className="text-[#c9a84c] font-medium uppercase">
              {order.paymentMethod === 'mercadopago'
                ? 'Mercado Pago (PIX / Cartão)'
                : order.paymentMethod === 'pix'
                ? 'PIX (5% OFF)'
                : order.paymentMethod === 'credit_card'
                ? 'Cartão de Crédito'
                : 'WhatsApp'}
            </span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-[#9e8f85]">Total:</span>
            <span className="font-display text-xl text-[#c9a84c] font-semibold">
              R$ {order.total.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <div className="pt-1">
            <span className="text-[10px] tracking-[1.5px] uppercase text-[#9e8f85] block mb-1">
              Itens ({order.items.length}):
            </span>
            <ul className="space-y-1 text-[11px] text-[#f4efe6]">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    {item.quantity}x {item.product.name} ({item.size})
                  </span>
                  <span className="text-[#9e8f85]">
                    R$ {(item.unitPrice * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-[#c9a84c] font-light leading-relaxed">
          Em breve entraremos em contato pelo WhatsApp <strong className="font-semibold">(16) 99060-3561</strong>. 🌟
        </p>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <a
            href={`https://wa.me/${cleanTargetNumber}?text=${encodeURIComponent(
              `Olá, vim pelo site Smell Good e quero saber mais sobre as REFs (Pedido #${order.id})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs tracking-[2px] uppercase font-bold rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp Sobre o Pedido</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-3 bg-transparent hover:bg-white/5 text-[#f4efe6] border border-[#c9a84c]/30 text-xs tracking-[2px] uppercase font-medium rounded-xs transition-colors cursor-pointer"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
};
