import { useOrderController } from './order.controller';
import { OrderSearchBar } from './components/OrderSearchBar';
import { OrderFilterTabs } from './components/OrderFilterTabs';
import { OrderList } from './components/OrderList';

export const OrderPage = () => {
    const controller = useOrderController();

    return (
        <div className="w-full max-w-7xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    <h1 className="font-headline text-[36px] font-semibold text-text-ink tracking-tight">
                        Quản lý đơn hàng
                    </h1>
                    <p className="font-body text-[16px] text-[#57534E] mt-2">
                        Hiển thị {controller.filteredOrders.length} đơn hàng trong hệ thống.
                    </p>
                </div>
                <OrderSearchBar value={controller.searchQuery} onChange={controller.setSearchQuery} />
            </div>

            <OrderFilterTabs activeTab={controller.activeTab} onTabChange={controller.handleTabChange} />

            <OrderList
                orders={controller.filteredOrders}
                loading={controller.loading}
                error={controller.error}
            />

            {!controller.loading && controller.filteredOrders.length > 0 && (
                <div className="mt-8 flex justify-center">
                    <button className="bg-transparent border-[1.5px] border-border-medium text-[#57534E] font-body text-[14px] h-10.5 px-6 rounded-sm hover:bg-[#FDF6EC] transition-colors">
                        Tải thêm đơn hàng
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderPage;