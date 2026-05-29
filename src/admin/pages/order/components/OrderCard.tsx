import { MapPin, Phone, Calendar, Package, ChevronRight } from 'lucide-react';
import type { OrderItem } from '../../../features/order/model/orderItem.model';
import { STATUS_CONFIG } from '../types/statusConfig';
import { PAYMENT_CONFIG } from '../types/paymentConfig';
import { PAYMENT_METHOD_LABEL } from '../types/paymentMethodLabel';
import { formatCurrency, formatDate } from '../utils/formatters';

export const OrderCard = ({ order }: { order: OrderItem }) => (
    <div className="cursor-pointer bg-[#FFFFFF] border border-border-subtle rounded-lg p-5 hover:border-border-medium transition-colors flex flex-col md:flex-row gap-6">
        <div className="w-24 h-24 shrink-0 rounded-sm border border-border-subtle overflow-hidden bg-[#FFFBF5]">
            <img src={order.firstProductImageUrl} alt="Sản phẩm" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[14px] text-text-ink font-semibold">{order.id}</span>
                    <span
                        className={`px-2.5 py-0.5 rounded-sm font-body text-[11px] font-bold uppercase tracking-wider ${STATUS_CONFIG[order.orderStatus].color}`}
                    >
                        {STATUS_CONFIG[order.orderStatus].label}
                    </span>
                </div>
                <h3 className="font-headline text-[20px] font-semibold text-text-ink leading-tight mb-3">
                    {order.buyerName}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                    <div className="flex items-center gap-2 text-[#57534E]">
                        <Phone size={14} className="shrink-0" />
                        <span className="font-body text-[14px]">{order.buyerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#57534E]">
                        <MapPin size={14} className="shrink-0" />
                        <span className="font-body text-[14px] truncate" title={order.buyerAddress}>
                            {order.buyerAddress}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#57534E]">
                        <Package size={14} className="shrink-0" />
                        <span className="font-body text-[14px]">{order.totalProductQuantity} sản phẩm</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#57534E]">
                        <Calendar size={14} className="shrink-0" />
                        <span className="font-body text-[14px]">{formatDate(order.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="md:w-55 shrink-0 flex flex-col items-start md:items-end justify-between border-t md:border-t-0 md:border-l border-border-subtle pt-4 md:pt-0 md:pl-6">
            <div className="flex flex-col items-start md:items-end gap-1 mb-4 md:mb-0 w-full">
                <span className="font-body text-[12px] text-[#A8A29E] uppercase tracking-wider font-semibold">
                    Tổng tiền
                </span>
                <span className="font-headline text-[24px] font-bold text-market-primary">
                    {formatCurrency(order.totalAmount)}
                </span>
                <span
                    className={`mt-1 px-2.5 py-0.5 rounded-sm font-body text-[11px] font-bold uppercase tracking-wider ${PAYMENT_CONFIG[order.paymentStaus].color}`}
                >
                    {PAYMENT_CONFIG[order.paymentStaus].label}
                </span>
                <span className="font-body text-[12px] text-[#57534E] mt-1 text-left md:text-right">
                    {PAYMENT_METHOD_LABEL[order.paymentMethod]}
                </span>
            </div>
            <button className="cursor-pointer w-full md:w-auto flex items-center justify-center gap-1 bg-transparent border-[1.5px] border-market-primary text-market-primary font-body text-[14px] font-semibold h-10.5 px-6 rounded-sm hover:bg-[#FDF6EC] transition-colors">
                Chi tiết <ChevronRight size={16} />
            </button>
        </div>
    </div>
);