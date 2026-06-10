import React from 'react';

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled?: boolean;
}

export const QuantitySelector: React.FC<Props> = ({ quantity, onIncrease, onDecrease, disabled }) => {
  return (
    <div className="flex items-center border border-[#D6D3D1] rounded-[4px] bg-white">
      <button 
        disabled={disabled}
        onClick={onDecrease}
        className="px-3 py-1.5 text-gray-600 hover:bg-[#FFFBF5] hover:text-[#C2410C] disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 rounded-l-[4px] transition-colors"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="px-4 py-1.5 text-sm font-medium text-gray-900 min-w-[40px] text-center border-x border-[#D6D3D1]">
        {quantity}
      </span>
      <button 
        disabled={disabled}
        onClick={onIncrease}
        className="px-3 py-1.5 text-gray-600 hover:bg-[#FFFBF5] hover:text-[#C2410C] disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 rounded-r-[4px] transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};
