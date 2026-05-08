import type { ProductItem } from "../../../features/products/models/product.model";

interface ProductCardProps {
    product: ProductItem;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="group bg-white border border-[#E7E5E4] rounded-[8px] overflow-hidden transition-all duration-200 hover:border-[#D6D3D1] flex flex-col h-full">
            <div className="aspect-square w-full overflow-hidden bg-[#F5F5F4] relative">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.discountPercentage && (
                    <div className="absolute top-3 left-3 bg-market-primary text-white text-[11px] font-bold px-2 py-1 rounded-[4px] uppercase tracking-wider">
                        -{product.discountPercentage}%
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-['Lora',serif] text-[16px] font-semibold text-[#1C1917] mb-2 line-clamp-2 leading-snug group-hover:text-market-primary transition-colors">
                    {product.name}
                </h3>

                <div className="mt-auto flex items-baseline gap-2">
                    <span className="text-[16px] font-bold text-[#1C1917]">
                        {product.price.toLocaleString('vi-VN')}đ
                    </span>
                    {product.originalPrice && (
                        <span className="text-[13px] text-[#A8A29E] line-through font-normal">
                            {product.originalPrice.toLocaleString('vi-VN')}đ
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};