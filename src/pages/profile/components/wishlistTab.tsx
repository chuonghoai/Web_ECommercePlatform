import { Link } from "react-router-dom";
import type { WishlistItem } from "../../../features/user/models/wishlist.model";

interface WishlistTabProps {
    items: WishlistItem[];
    isLoading: boolean;
    pagination: { page: number; pageSize: number; totalItems: number; totalPages: number } | undefined;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const WishlistSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-[#E7E5E4] rounded-[8px] overflow-hidden animate-pulse">
                <div className="h-[180px] bg-[#F5F5F4]" />
                <div className="p-4 space-y-2">
                    <div className="h-4 bg-[#F5F5F4] rounded w-3/4" />
                    <div className="h-4 bg-[#F5F5F4] rounded w-1/2" />
                </div>
            </div>
        ))}
    </div>
);

export const WishlistTab = ({
    items,
    isLoading,
    pagination,
    currentPage,
    onPageChange,
}: WishlistTabProps) => {
    if (isLoading) return <WishlistSkeleton />;

    if (!isLoading && items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <svg className="w-16 h-16 text-[#D6D3D1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-[16px] font-semibold text-[#1C1917]">Chưa có sản phẩm yêu thích</p>
                <p className="text-[14px] text-[#A8A29E] text-center max-w-[300px]">
                    Khám phá marketplace và thêm những sản phẩm bạn thích vào đây.
                </p>
                <Link
                    to="/"
                    className="mt-2 h-[42px] px-6 bg-market-primary text-white text-[14px] font-semibold rounded-[4px] hover:opacity-90 transition-opacity flex items-center"
                >
                    Khám phá ngay
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {pagination && (
                <p className="text-[14px] text-[#57534E]">
                    <span className="font-semibold text-[#1C1917]">{pagination.totalItems}</span> sản phẩm yêu thích
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item) => {
                    const discount = Math.round(((item.price - item.discountPrice) / item.price) * 100);
                    return (
                        <Link
                            key={item.id}
                            to={`/product/${item.id}`}
                            className="group bg-white border border-[#E7E5E4] rounded-[8px] overflow-hidden hover:border-market-primary hover:shadow-[0_4px_16px_rgba(28,25,23,0.08)] transition-all"
                        >
                            <div className="relative h-[180px] overflow-hidden bg-[#F5F5F4]">
                                <img
                                    src={item.thumbnail}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {discount > 0 && (
                                    <span className="absolute top-2 left-2 bg-market-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-[2px]">
                                        -{discount}%
                                    </span>
                                )}
                                <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-market-primary" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                            </div>

                            <div className="p-4">
                                <p className="text-[14px] font-semibold text-[#1C1917] line-clamp-2 leading-snug mb-2">
                                    {item.name}
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-[15px] font-bold text-market-primary">
                                        {formatPrice(item.discountPrice)}
                                    </span>
                                    {item.discountPrice < item.price && (
                                        <span className="text-[12px] text-[#A8A29E] line-through">
                                            {formatPrice(item.price)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#E7E5E4]">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="h-[38px] px-4 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[13px] font-semibold text-[#57534E] hover:bg-market-background hover:text-market-primary hover:border-market-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#57534E] disabled:hover:border-[#D6D3D1]"
                    >
                        Trước
                    </button>

                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            className={`w-[38px] h-[38px] rounded-[4px] text-[13px] font-semibold transition-colors ${
                                p === currentPage
                                    ? "bg-market-primary text-white border-[1.5px] border-market-primary"
                                    : "bg-white border-[1.5px] border-[#D6D3D1] text-[#57534E] hover:bg-market-background hover:text-market-primary hover:border-market-primary"
                            }`}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === pagination.totalPages}
                        className="h-[38px] px-4 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[13px] font-semibold text-[#57534E] hover:bg-market-background hover:text-market-primary hover:border-market-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#57534E] disabled:hover:border-[#D6D3D1]"
                    >
                        Sau
                    </button>
                </div>
            )}
        </div>
    );
};
