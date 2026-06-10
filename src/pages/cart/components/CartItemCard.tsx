import React from 'react';
import type { CartItem } from '../../../features/cart/models/cart-item.model';
import { QuantitySelector } from './QuantitySelector';

interface Props {
  item: CartItem;
  isSelected: boolean;
  onToggleSelect: () => void;
  isLoading: boolean;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  formatMoney: (val: number) => string;
}

export const CartItemCard: React.FC<Props> = ({ 
  item, 
  isSelected, 
  onToggleSelect, 
  isLoading, 
  onUpdateQuantity, 
  onRemove, 
  formatMoney 
}) => {
  const { product, quantity } = item;
  
  const makerName = product.seller?.name || "Artisan Maker";
  const avatarUrl = product.seller?.avatarUrl || "https://i.pravatar.cc/150";
  const storyText = product.description || "Crafted with care.";
  
  return (
    <div className="flex flex-col sm:flex-row gap-6 group">
      
      {/* Item Checkbox */}
      <div className="flex items-center pt-2 sm:pt-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-5 h-5 text-market-primary border-[#D6D3D1] rounded focus:ring-market-primary cursor-pointer"
        />
      </div>

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
                <img src={avatarUrl} alt={makerName} className="w-5 h-5 rounded-full object-cover border border-[#E7E5E4]" />
                <span className="text-sm text-gray-800 font-medium">{makerName}</span>
              </div>

              <p className="text-sm text-gray-500 italic font-serif mt-2">"{storyText}"</p>
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