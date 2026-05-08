import { useState } from "react";
import { useProductController } from "./product.controller";

function ProductPage() {
    const { product, isLoading } = useProductController();

    // State quản lý ảnh đang hiển thị và số lượng đặt hàng
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // 1. Giao diện Loading Skeleton
    if (isLoading) {
        return (
            <div className="animate-pulse space-y-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="w-full lg:w-1/2 aspect-square bg-[#F5F5F4] rounded-[8px]"></div>
                    <div className="flex-1 space-y-6">
                        <div className="h-10 bg-[#F5F5F4] rounded w-3/4"></div>
                        <div className="h-6 bg-[#F5F5F4] rounded w-1/4"></div>
                        <div className="h-24 bg-[#F5F5F4] rounded w-full"></div>
                        <div className="h-12 bg-[#F5F5F4] rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return null;

    // Chuẩn bị danh sách ảnh (Ảnh chính + Ảnh phụ)
    const allImages = [product.imageUrl, ...product.images];

    // Logic tính toán giá sale (Giống ProductCard)
    const isSale = product.originalPrice !== undefined && product.originalPrice > product.price;
    let discountBadge = null;
    if (isSale) {
        discountBadge = product.discountPercentage && product.discountPercentage > 0
            ? `-${product.discountPercentage}%`
            : `-${(product.originalPrice! - product.price).toLocaleString('vi-VN')}đ`;
    }

    return (
        <div className="pb-24 font-['Open_Sans',sans-serif] text-[#1C1917]">
            {/* PHẦN TRÊN: ẢNH VÀ MUA HÀNG */}
            <div className="flex flex-col lg:flex-row gap-12 items-start">

                {/* 1. Gallery Ảnh (Bên trái) */}
                <div className="w-full lg:w-[500px] xl:w-[600px] shrink-0">
                    <div className="aspect-square w-full bg-[#F5F5F4] rounded-[8px] overflow-hidden border border-[#E7E5E4] mb-4">
                        <img
                            src={allImages[activeImgIndex]}
                            className="w-full h-full object-cover transition-all duration-300"
                            alt={product.name}
                        />
                    </div>

                    {/* Danh sách ảnh nhỏ (Thumbnails) */}
                    <div className="relative group">
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 scroll-smooth">
                            {allImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImgIndex(idx)}
                                    className={`w-20 h-20 shrink-0 rounded-[4px] overflow-hidden border-2 transition-all ${activeImgIndex === idx ? 'border-market-primary' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Thông tin chính (Bên phải) */}
                <div className="flex-1 w-full">
                    {/* Category & Date */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-market-background text-market-tertiary text-[12px] font-bold px-2 py-1 rounded-[4px] uppercase tracking-wider border border-[#E7E5E4]">
                            {product.categoryName}
                        </span>
                        <span className="text-[#A8A29E] text-[13px]">
                            • Đăng bán ngày {new Date(product.createdAt!).toLocaleDateString('vi-VN')}
                        </span>
                    </div>

                    <h1 className="font-['Lora',serif] text-[32px] md:text-[42px] font-semibold leading-tight mb-6">
                        {product.name}
                    </h1>

                    {/* Giá tiền */}
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-[28px] font-bold text-market-primary">
                            {product.price.toLocaleString('vi-VN')}đ
                        </span>
                        {isSale && (
                            <>
                                <span className="text-[18px] text-[#A8A29E] line-through">
                                    {product.originalPrice!.toLocaleString('vi-VN')}đ
                                </span>
                                <span className="bg-market-primary text-white text-[13px] font-bold px-2 py-1 rounded-[4px]">
                                    {discountBadge}
                                </span>
                            </>
                        )}
                    </div>

                    {/* Stats: Đã bán, Tồn kho, Đánh giá */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#E7E5E4] mb-8 text-center">
                        <div>
                            <p className="text-[13px] text-[#A8A29E] uppercase font-bold mb-1">Đã bán</p>
                            <p className="font-semibold">{product.soldCount || 0}</p>
                        </div>
                        <div className="border-x border-[#E7E5E4]">
                            <p className="text-[13px] text-[#A8A29E] uppercase font-bold mb-1">Kho</p>
                            <p className="font-semibold">{product.stock}</p>
                        </div>
                        <div>
                            <p className="text-[13px] text-[#A8A29E] uppercase font-bold mb-1">Đánh giá</p>
                            <div className="flex items-center justify-center gap-1">
                                <span className="font-semibold">{product.rating}</span>
                                <svg className="w-4 h-4 text-market-warning fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Mua hàng & Nghệ nhân */}
                    <div className="bg-white border border-[#D6D3D1] rounded-[12px] p-6">
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E7E5E4]">
                            <div className="flex items-center gap-3">
                                <img src={product.sellerInfo.avatarUrl} className="w-12 h-12 rounded-full object-cover" alt="seller" />
                                <div>
                                    <p className="text-[13px] text-[#A8A29E] font-bold uppercase">Nghệ nhân</p>
                                    <p className="font-semibold text-market-primary">{product.sellerInfo.name}</p>
                                </div>
                            </div>
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center border ${product.isFavorite ? 'bg-market-error/10 border-market-error text-market-error' : 'border-[#D6D3D1] text-[#A8A29E]'} transition-colors`}>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 2 7.5 2c1.74 0 3.41.81 4.5 2.09C13.09 2.81 14.76 2 16.5 2 19.58 2 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            </button>
                        </div>

                        {/* Chọn số lượng */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center border border-[#D6D3D1] rounded-[4px] h-[48px]">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full hover:bg-market-background transition-colors">-</button>
                                <input type="number" readOnly value={quantity} className="w-12 text-center bg-transparent font-semibold outline-none" />
                                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 h-full hover:bg-market-background transition-colors">+</button>
                            </div>
                            <button className="flex-1 bg-market-primary text-white font-semibold rounded-[4px] h-[48px] hover:bg-[#9A3412] transition-colors">
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* PHẦN DƯỚI: MÔ TẢ VÀ ĐẶC TẢ */}
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2">
                    <h2 className="font-['Lora',serif] text-[26px] font-semibold mb-6 pb-2 border-b-2 border-market-secondary inline-block">
                        Câu chuyện tác phẩm
                    </h2>
                    <p className="text-[16px] text-[#57534E] leading-relaxed whitespace-pre-line">
                        {product.description}
                    </p>
                </div>

                {/* Chi tiết kỹ thuật */}
                <div className="bg-market-background rounded-[8px] p-8 border border-[#E7E5E4]">
                    <h3 className="font-bold text-[13px] uppercase tracking-widest mb-6">Thông số chi tiết</h3>
                    <ul className="space-y-4 text-[14px]">
                        <li className="flex justify-between border-b border-[#E7E5E4] pb-2">
                            <span className="text-[#A8A29E]">Chất liệu</span>
                            <span className="font-medium text-right">{product.materials?.join(', ')}</span>
                        </li>
                        <li className="flex justify-between border-b border-[#E7E5E4] pb-2">
                            <span className="text-[#A8A29E]">Kích thước</span>
                            <span className="font-medium">{product.dimensions}</span>
                        </li>
                        <li className="flex justify-between border-b border-[#E7E5E4] pb-2">
                            <span className="text-[#A8A29E]">Trọng lượng</span>
                            <span className="font-medium">{product.weight}</span>
                        </li>
                        <li>
                            <span className="text-[#A8A29E] block mb-2 font-bold uppercase text-[11px]">Hướng dẫn bảo quản</span>
                            <span className="italic text-[#57534E] leading-snug block">{product.careInstructions}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* DANH SÁCH REVIEW (Placeholder) */}
            <div className="mt-24 pt-16 border-t border-[#E7E5E4]">
                <h2 className="font-['Lora',serif] text-[26px] font-semibold mb-8">
                    Đánh giá từ cộng đồng
                </h2>
                <div className="bg-[#F5F5F4] rounded-[8px] p-12 text-center">
                    <p className="text-[#A8A29E] italic">Tính năng đánh giá đang được hoàn thiện...</p>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;