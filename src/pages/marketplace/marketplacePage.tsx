import { useMarketplaceController } from "./marketplace.controller";
import { ProductCard } from "./components/productCard";
import { MarketplaceFilter } from "./components/filter/marketplaceFilter";

function MarketplacePage() {
    const {
        products,
        isLoading,
        pagination,
        filters,
        applyFilters
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
                <div className="flex-1">
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
                </div>

            </div>
        </div>
    );
}

export default MarketplacePage;