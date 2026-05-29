import { EOrderStatus } from '../../../../features/order/enums/orderStatus.enum';
import type { TabValue } from '../order.controller';

export const OrderFilterTabs = ({
    activeTab,
    onTabChange,
}: {
    activeTab: TabValue;
    onTabChange: (tab: TabValue) => void;
}) => {
    const TABS = [
        { label: 'Tất cả', value: 'ALL' },
        { label: 'Chờ xác nhận', value: EOrderStatus.PENDING },
        { label: 'Đang chuẩn bị', value: EOrderStatus.PREPARING },
        { label: 'Đang giao', value: EOrderStatus.SHIPPING },
        { label: 'Đã hoàn thành', value: EOrderStatus.SUCCESS },
        { label: 'Bị hủy', value: EOrderStatus.CANCELLED },
    ];

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {TABS.map((tab) => {
                const isActive = activeTab === tab.value;
                return (
                    <button
                        key={tab.value}
                        onClick={() => onTabChange(tab.value as TabValue)}
                        className={`h-8 px-3.5 rounded-sm font-body text-[14px] transition-colors ${
                            isActive
                                ? 'bg-market-primary text-[#FFFFFF] border border-market-primary'
                                : 'bg-transparent text-[#57534E] border border-border-medium hover:bg-[#FDF6EC]'
                        }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};
