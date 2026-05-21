import React from 'react';
import type { CartItem } from '../../../features/cart/models/cart-item.model';
import { QuantitySelector } from './QuantitySelector';

interface Props {
  item: CartItem;

  isLoading: boolean;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  formatMoney: (val: number) => string;
}

export const CartItemCard: React.FC<Props> = ({ item, isLoading, onUpdateQuantity, onRemove, formatMoney }) => {
  const { product, quantity } = item;
  
  const info = { maker: "Artisan Maker", avatar: "https://i.pravatar.cc/150", location: "Local Studio", tags: ["Handmade"], story: "Crafted with care." };

  return (
    <div className="flex flex-col sm:flex-row gap-6 group">
      {/* Product Image */}
      <div className="sm:w-[160px] shrink-0">
        <div className="aspect-[4/5] bg-[#E7E5E4] rounded-lg overflow-hidden border border-[#E7E5E4]">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Info & Actions */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-xl font-serif text-gray-900 mb-1 leading-tight">{product.name}</h3>
              
              {/* Maker Identity */}
              <div className="flex items-center gap-2 mt-3 mb-4">
                <img src={info.avatar} alt={info.maker} className="w-5 h-5 rounded-full object-cover border border-[#E7E5E4]" />
                <span className="text-sm text-gray-800 font-medium">{info.maker}</span>
                <span className="text-[#D6D3D1]">•</span>
                <span className="text-sm text-gray-500">{info.location}</span>
              </div>

              {/* Material Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {info.tags.map((tag: string) => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-medium text-[#365314] bg-[#F7FEE7] border border-[#365314]/20 rounded-[4px]">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500 italic font-serif mt-2">"{info.story}"</p>
            </div>

            <div className="text-right">
              <p className="text-lg font-medium text-gray-900">{formatMoney(product.price)}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 sm:mt-auto pt-4 flex items-center justify-between border-t border-[#D6D3D1] border-dashed sm:border-none sm:pt-0">
          <QuantitySelector 
            quantity={quantity}
            disabled={isLoading}
            onDecrease={() => onUpdateQuantity(product.id, quantity - 1)}
            onIncrease={() => onUpdateQuantity(product.id, quantity + 1)}
          />

          <button 
            disabled={isLoading}
            onClick={() => onRemove(product.id)}
            className="text-sm text-gray-500 hover:text-[#C2410C] underline decoration-transparent hover:decoration-[#C2410C] underline-offset-4 disabled:opacity-40 transition-all focus:outline-none"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
