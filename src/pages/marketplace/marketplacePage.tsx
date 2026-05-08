import { useMarketplaceController } from "./marketplace.controller";
import { ProductCard } from "./components/productCard";
import { MarketplaceFilter } from "./components/filter/marketplaceFilter";

function MarketplacePage() {
    const {
        products,
        isLoading,
        pagination,
        filters,
        applyFilters,
        handlePageChange,
        currentPage,
    } = useMarketplaceController();

    return (
        <div className="pb-12">
            {/* Header section */}
            <div className="mb-8">
                <h1 className="font-['Lora',serif] text-[36px] font-semibold text-[#1C1917] mb-2 leading-tight">
                    Khám phá Marketplace
                </h1>
                <p className="text-[#57534E] text-[15px] max-w-[600px]">
                    Nơi tập hợp những tác phẩm thủ công tinh xảo nhất từ cộng đồng nghệ nhân của chúng tôi.
                </p>
            </div>

            {/* Layout */}
            <div className="flex flex-col md:flex-row gap-8">

                {/* Filter sidebar */}
                <aside className="w-full md:w-[280px] shrink-0">
                    <MarketplaceFilter
                        initialFilters={filters}
                        onApply={applyFilters}
                    />
                </aside>

                {/* Grid products */}
                <div className="flex-1 flex flex-col min-h-full">
                    {!isLoading && pagination && (
                        <div className="mb-6 flex justify-between items-center text-[14px] text-[#57534E]">
                            <p>
                                <span className="font-semibold text-[#1C1917]">{pagination.totalItems}</span> tác phẩm
                            </p>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {[...Array(10)].map((_, index) => (
                                <div key={index} className="bg-white border border-[#E7E5E4] rounded-[8px] h-[360px] animate-pulse">
                                    <div className="bg-[#F5F5F4] h-[240px]"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-[#F5F5F4] rounded w-3/4"></div>
                                        <div className="h-4 bg-[#F5F5F4] rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                            {products.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    )}

                    {!isLoading && pagination && pagination.totalPages > 1 && (
                        <div className="mt-12 pt-8 border-t border-[#E7E5E4] flex flex-wrap items-center justify-center gap-2">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={pagination.page === 1}
                                className="h-[42px] px-4 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[14px] font-semibold text-[#57534E] hover:bg-[#FDF6EC] hover:text-market-primary hover:border-market-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#57534E] disabled:hover:border-[#D6D3D1]"
                            >
                                Đầu
                            </button>

                            <button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 1}
                                className="h-[42px] px-4 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[14px] font-semibold text-[#57534E] hover:bg-[#FDF6EC] hover:text-market-primary hover:border-market-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#57534E] disabled:hover:border-[#D6D3D1]"
                            >
                                Trước
                            </button>

                            {generatePagination(currentPage, pagination.totalPages).map((item, index) => {
                                if (item === '...') {
                                    return (
                                        <span key={`ellipsis-${index}`} className="w-[42px] h-[42px] flex items-center justify-center text-[14px] font-semibold text-[#A8A29E]">
                                            ...
                                        </span>
                                    );
                                }

                                const pageNumber = item as number;
                                const isActive = pageNumber === currentPage;
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`w-[42px] h-[42px] rounded-[4px] text-[14px] font-semibold transition-colors flex items-center justify-center ${isActive
                                            ? 'bg-market-primary text-white border-[1.5px] border-market-primary'
                                            : 'bg-white border-[1.5px] border-[#D6D3D1] text-[#57534E] hover:bg-[#FDF6EC] hover:text-market-primary hover:border-market-primary'
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page === pagination.totalPages}
                                className="h-[42px] px-4 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[14px] font-semibold text-[#57534E] hover:bg-[#FDF6EC] hover:text-market-primary hover:border-market-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#57534E] disabled:hover:border-[#D6D3D1]"
                            >
                                Sau
                            </button>

                            <button
                                onClick={() => handlePageChange(pagination.totalPages)}
                                disabled={pagination.page === pagination.totalPages}
                                className="h-[42px] px-4 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[14px] font-semibold text-[#57534E] hover:bg-[#FDF6EC] hover:text-market-primary hover:border-market-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#57534E] disabled:hover:border-[#D6D3D1]"
                            >
                                Cuối
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}


const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
        return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
export default MarketplacePage;