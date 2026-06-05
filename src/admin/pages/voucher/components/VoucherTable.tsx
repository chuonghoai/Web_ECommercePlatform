import type { Voucher } from '../../../features/voucher/models/voucher.model';
import { VoucherType, DistributionType } from '../../../features/voucher/models/voucher.model';
import { VoucherStatusBadge } from './VoucherStatusBadge';

interface VoucherTableProps {
    vouchers: Voucher[];
    loading: boolean;
    onEdit: (voucher: Voucher) => void;
    onDelete: (voucher: Voucher) => void;
}

const VOUCHER_TYPE_LABEL: Record<string, string> = {
    [VoucherType.PERCENT]: 'Giảm %',
    [VoucherType.CASH]: 'Giảm tiền',
    [VoucherType.FREESHIP]: 'Freeship',
};

const DISTRIBUTION_LABEL: Record<string, string> = {
    [DistributionType.PUBLIC]: 'Công khai',
    [DistributionType.LIMITED]: 'Giới hạn',
    [DistributionType.UNLIMITED]: 'Không giới hạn',
};

const DISTRIBUTION_BADGE: Record<string, string> = {
    [DistributionType.PUBLIC]: 'bg-blue-50 text-blue-600 border border-blue-200',
    [DistributionType.LIMITED]: 'bg-orange-50 text-orange-600 border border-orange-200',
    [DistributionType.UNLIMITED]: 'bg-purple-50 text-purple-600 border border-purple-200',
};

const formatDiscount = (voucher: Voucher): string => {
    if (voucher.voucher_type === VoucherType.FREESHIP) return 'Miễn phí vận chuyển';
    if (voucher.voucher_type === VoucherType.PERCENT) return `Giảm ${voucher.discount_value}%`;
    return `Giảm ${voucher.discount_value.toLocaleString('vi-VN')}đ`;
};

const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const VoucherTable = ({ vouchers, loading, onEdit, onDelete }: VoucherTableProps) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <span className="material-symbols-outlined text-4xl text-text-muted animate-spin">progress_activity</span>
                <p className="font-body text-sm text-text-muted">Đang tải danh sách voucher...</p>
            </div>
        );
    }

    if (vouchers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <span className="material-symbols-outlined text-5xl text-text-muted">confirmation_number</span>
                <p className="font-body text-sm text-text-muted">Chưa có voucher nào.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
                <thead>
                    <tr className="border-b border-border-subtle bg-surface-container">
                        <th className="text-left px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Mã / Tên</th>
                        <th className="text-left px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Loại</th>
                        <th className="text-left px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Phát hành</th>
                        <th className="text-left px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Ưu đãi</th>
                        <th className="text-left px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Đã dùng</th>
                        <th className="text-left px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Hạn dùng</th>
                        <th className="text-left px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Trạng thái</th>
                        <th className="text-left px-4 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                    {vouchers.map((voucher) => (
                        <tr key={voucher.id} className="hover:bg-surface-container/50 transition-colors">
                            <td className="px-4 py-3">
                                <div>
                                    <span className="font-mono font-bold text-primary-container text-xs bg-surface-container px-2 py-0.5 rounded">
                                        {voucher.code}
                                    </span>
                                    <p className="text-text-ink font-semibold mt-1 text-sm">{voucher.title}</p>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <span className="text-text-ink font-semibold text-xs">
                                    {VOUCHER_TYPE_LABEL[voucher.voucher_type]}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${DISTRIBUTION_BADGE[voucher.distribution_type]}`}>
                                    {DISTRIBUTION_LABEL[voucher.distribution_type]}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span className="text-text-ink font-semibold text-sm">{formatDiscount(voucher)}</span>
                                {voucher.min_order_value > 0 && (
                                    <p className="text-text-muted text-xs mt-0.5">
                                        Đơn từ {voucher.min_order_value.toLocaleString('vi-VN')}đ
                                    </p>
                                )}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-text-ink">{voucher.used_count}</span>
                                    <span className="text-text-muted text-xs">/ {voucher.total_limit}</span>
                                </div>
                                <div className="w-24 h-1.5 bg-border-subtle rounded-full mt-1.5 overflow-hidden">
                                    <div
                                        className="h-full bg-primary-container rounded-full transition-all"
                                        style={{ width: `${Math.min((voucher.used_count / voucher.total_limit) * 100, 100)}%` }}
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <span className="text-text-muted text-xs">{formatDate(voucher.start_date)}</span>
                                <p className="text-text-muted text-xs">→ {formatDate(voucher.end_date)}</p>
                            </td>
                            <td className="px-4 py-3">
                                <VoucherStatusBadge status={voucher.status} />
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center gap-1">
                                    <button
                                        id={`btn-edit-voucher-${voucher.id}`}
                                        onClick={() => onEdit(voucher)}
                                        title="Sửa / Khoá / Mở"
                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                    <button
                                        id={`btn-delete-voucher-${voucher.id}`}
                                        onClick={() => onDelete(voucher)}
                                        title="Xoá"
                                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
