import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NotificationToast: React.FC = () => {
  const { notification, setIsCartOpen } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up flex items-center gap-3 bg-[#161616] border border-[#c9a84c] text-[#f4efe6] px-4 py-3 rounded-xs shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-xs">
      <div className="w-6 h-6 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] flex items-center justify-center shrink-0">
        <ShoppingBag className="w-3.5 h-3.5" />
      </div>

      <span className="font-medium">{notification}</span>

      <button
        onClick={() => setIsCartOpen(true)}
        className="ml-2 text-[#c9a84c] hover:underline font-bold flex items-center gap-1 uppercase tracking-wider text-[10px]"
      >
        <span>Ver Sacola</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};
