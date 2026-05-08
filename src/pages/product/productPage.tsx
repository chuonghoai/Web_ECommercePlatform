import { useRef, useState } from "react";
import { useProductController } from "./product.controller";

function ProductPage() {
    const { product, isLoading, isAddingToCart, handleAddToCart } = useProductController();
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const thumbnailContainerRef = useRef<HTMLDivElement>(null);

    const scrollThumbnails = (direction: 'left' | 'right') => {
        if (thumbnailContainerRef.current) {
            const scrollAmount = 200;
            thumbnailContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="animate-pulse max-w-[1440px] mx-auto px-4 md:px-8 py-12">
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-6 aspect-square bg-[#F5F5F4] rounded-[16px]"></div>
                    <div className="lg:col-span-5 lg:col-start-8 space-y-8 mt-8">
                        <div className="h-6 bg-[#F5F5F4] rounded w-1/4"></div>
                        <div className="h-16 bg-[#F5F5F4] rounded w-full"></div>
                        <div className="h-8 bg-[#F5F5F4] rounded w-1/3"></div>
                        <div className="h-32 bg-[#F5F5F4] rounded w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return null;

    const allImages = [product.imageUrl, ...(product.images || [])];
    const isSale = product.originalPrice !== undefined && product.originalPrice > product.price;
    const displayStockStatus = (product.stock >= 20 ? `Còn ` : 'Chỉ còn ') + `${product.stock} sản phẩm`;

    return (
        <div className="pb-32 font-['Open_Sans',sans-serif] text-[#1C1917] selection:bg-[#FDF6EC] selection:text-[#9A3412]">

            {/* Main product */}
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-[1440px] mx-auto px-4 md:px-8 mt-8">

                {/* Images product */}
                <div className="lg:col-span-6 w-full flex flex-col gap-5">
                    {/* main image */}
                    <div className="relative w-full aspect-square lg:max-h-[640px] bg-[#FAFAF9] rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#F5F5F4] group flex items-center justify-center">
                        <img
                            src={allImages[activeImgIndex]}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            alt={product.name}
                        />
                        {isSale && product.discountPercentage && (
                            <div className="absolute top-6 left-6 bg-market-primary/90 backdrop-blur-sm text-white text-[12px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                                -{product.discountPercentage}%
                            </div>
                        )}
                    </div>

                    {/* list images thumbnail */}
                    {allImages.length > 1 && (
                        <div className="relative group/slider">

                            <button
                                onClick={() => scrollThumbnails('left')}
                                className="absolute left-1 top-[36px] -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/95 backdrop-blur border border-[#E7E5E4] shadow-sm rounded-full text-[#78716C] hover:text-[#1C1917] hover:border-[#D6D3D1] opacity-0 group-hover/slider:opacity-100 transition-all duration-200"
                                aria-label="Previous image"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            <div
                                ref={thumbnailContainerRef}
                                className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-0.5 scroll-smooth"
                            >
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImgIndex(idx)}
                                        className={`relative w-[72px] h-[72px] shrink-0 rounded-[8px] bg-[#FAFAF9] transition-all duration-300 ease-out flex items-center justify-center p-[2px] ${activeImgIndex === idx
                                            ? 'border-2 border-market-primary opacity-100'
                                            : 'border-2 border-transparent opacity-50 hover:opacity-100 cursor-pointer'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            className="w-full h-full object-cover rounded-[4px]"
                                            alt={`thumbnail ${idx}`}
                                        />
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => scrollThumbnails('right')}
                                className="absolute right-1 top-[36px] -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/95 backdrop-blur border border-[#E7E5E4] shadow-sm rounded-full text-[#78716C] hover:text-[#1C1917] hover:border-[#D6D3D1] opacity-0 group-hover/slider:opacity-100 transition-all duration-200"
                                aria-label="Next image"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>

                        </div>
                    )}
                </div>

                {/* Product info */}
                <div className="lg:col-span-5 lg:col-start-8 w-full flex flex-col pt-4 lg:pt-0 lg:sticky lg:top-24">

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-[13px] text-[#78716C] uppercase tracking-widest font-semibold">
                        <span className="text-market-primary">{product.categoryName}</span>
                        <span className="w-1 h-1 rounded-full bg-[#D6D3D1]"></span>
                        <span>{product.soldCount || 125} người đã sưu tầm</span>
                    </div>

                    <h1 className="font-['Lora',serif] text-[36px] md:text-[40px] font-medium leading-[1.2] text-[#1C1917] tracking-tight mb-5">
                        {product.name}
                    </h1>

                    <div className="flex items-baseline gap-4 mb-8">
                        <span className="text-[32px] font-medium text-[#1C1917] tracking-tight">
                            {product.price.toLocaleString('vi-VN')} ₫
                        </span>
                        {isSale && (
                            <span className="text-[18px] text-[#A8A29E] line-through font-light decoration-1">
                                {product.originalPrice!.toLocaleString('vi-VN')} ₫
                            </span>
                        )}
                    </div>

                    <hr className="border-[#E7E5E4] mb-8" />

                    <div className="flex flex-col gap-4 mb-10 text-[15px] leading-relaxed">
                        {(product.materials || product.dimensions) && (
                            <div className="mt-2 flex flex-col gap-2 text-[#78716C]">
                                {product.materials && (
                                    <p><span className="font-semibold text-[#1C1917]">Chất liệu:</span> {product.materials.join(', ')}</p>
                                )}
                                {product.dimensions && (
                                    <p><span className="font-semibold text-[#1C1917]">Kích thước:</span> {product.dimensions}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-[16px] p-5 mb-10 flex items-center justify-between group hover:border-[#D6D3D1] transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <img src={product.sellerInfo.avatarUrl} className="w-14 h-14 rounded-full object-cover shadow-sm" alt="seller" />
                            <div>
                                <p className="text-[12px] text-[#78716C] uppercase tracking-widest font-semibold mb-1">Nghệ nhân</p>
                                <p className="font-['Lora',serif] text-[18px] font-medium text-[#1C1917] group-hover:text-market-primary transition-colors">{product.sellerInfo.name}</p>
                                <div className="flex items-center gap-2 mt-1 text-[13px] text-[#57534E]">
                                    <span className="flex items-center text-[#D97706] font-semibold"><span className="text-[14px] mr-1">★</span> {product.sellerInfo.averageRating || '5.0'}</span>
                                    <span className="text-[#D6D3D1]">|</span>
                                    <span>{product.sellerInfo.totalProducts || '124'} tác phẩm</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-[#E7E5E4] flex items-center justify-center bg-white group-hover:bg-[#FDF6EC] transition-colors">
                            <svg className="w-4 h-4 text-[#78716C] group-hover:text-market-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between text-[14px] font-medium">
                            <span className="text-[#D97706] bg-[#FEF3C7] px-3 py-1 rounded-full flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
                                {displayStockStatus}
                            </span>
                        </div>

                        <div className="flex gap-4 items-center h-[52px]">
                            <div className="flex items-center border border-[#D6D3D1] rounded-[8px] h-full bg-white w-[120px] shrink-0 overflow-hidden">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full text-[#78716C] hover:bg-[#FAFAF9] hover:text-[#1C1917] transition-colors">-</button>
                                <input type="number" readOnly value={quantity} className="w-10 text-center bg-transparent font-medium text-[#1C1917] outline-none" />
                                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="flex-1 h-full text-[#78716C] hover:bg-[#FAFAF9] hover:text-[#1C1917] transition-colors">+</button>
                            </div>

                            <button
                                onClick={() => handleAddToCart(quantity)}
                                disabled={isAddingToCart}
                                className="flex-1 bg-[#1C1917] text-white h-full rounded-[8px] font-medium text-[15px] flex items-center justify-center gap-2 shadow-sm hover:bg-market-primary hover:shadow-md hover:-translate-y-px transition-all duration-200 active:translate-y-0 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:shadow-sm"
                            >
                                {isAddingToCart ? (
                                    <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                )}

                                {isAddingToCart ? "Đang chuẩn bị..." : "Thêm vào bộ sưu tập"}
                            </button>

                            <button className={`w-[52px] h-full shrink-0 rounded-[8px] border flex items-center justify-center transition-all duration-200 ${product.isFavorite ? 'bg-[#FEF2F2] border-[#FCA5A5] text-[#EF4444]' : 'bg-white border-[#D6D3D1] text-[#A8A29E] hover:border-[#1C1917] hover:text-[#1C1917]'}`}>
                                <svg className={`w-5 h-5 ${product.isFavorite ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Product details */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 mt-24 border-t border-[#E7E5E4] pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Product description */}
                    <div className="lg:col-span-8">
                        <h2 className="font-['Lora',serif] text-[32px] font-medium mb-10 text-[#1C1917]">
                            Câu chuyện tác phẩm
                        </h2>
                        <div className="prose prose-stone max-w-none text-[18px] leading-[1.8] text-[#57534E]">
                            <p className="whitespace-pre-line">
                                {product.description}
                            </p>
                            <blockquote className="border-l-2 border-market-primary pl-6 my-12 italic font-['Lora',serif] text-[22px] text-[#1C1917] leading-relaxed bg-linear-to-r from-[#FAFAF9] to-transparent py-4">
                                "Mỗi vết lõm trên bề mặt gốm không phải là sự sai lệch, mà là dấu ấn độc bản của đôi bàn tay người thợ."
                            </blockquote>
                        </div>
                    </div>

                    {/* Product specifications */}
                    <div className="lg:col-span-4">
                        <h3 className="font-['Lora',serif] text-[24px] font-medium text-[#1C1917] mb-8">
                            Đặc tả kỹ thuật
                        </h3>
                        <div className="bg-[#FAFAF9] border border-[#E7E5E4] rounded-[12px] p-6">
                            <ul className="space-y-4 text-[14px] m-0 list-none pl-0">
                                <li className="flex flex-col gap-1 pb-4 border-b border-[#E7E5E4]">
                                    <span className="text-[#78716C] font-medium uppercase tracking-wider text-[11px]">Trọng lượng</span>
                                    <span className="text-[#1C1917]">{product.weight || 'Đang cập nhật'}</span>
                                </li>
                                <li className="flex flex-col gap-1 pt-2">
                                    <span className="text-[#78716C] font-medium uppercase tracking-wider text-[11px]">Bảo quản</span>
                                    <span className="text-[#1C1917] leading-relaxed">{product.careInstructions || 'Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ProductPage;