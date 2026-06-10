import { useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import type { HeaderOptions } from '../../layout/AdminLayout';
import { useVoucherController } from './voucher.controller';
import { VoucherType } from '../../features/voucher/models/voucher.model';

const VOUCHER_TYPE_LABEL: Record<string, string> = {
    [VoucherType.PERCENT]: 'Giảm %',
    [VoucherType.CASH]: 'Giảm tiền',
    [VoucherType.FREESHIP_CASH]: 'Freeship (tiền)',
    [VoucherType.FREESHIP_PERCENT]: 'Freeship (%)',
};

const formatCurrency = (val: number): string =>
    val.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export const VoucherStatsPage = () => {
    const { setHeaderOptions } = useOutletContext<{ setHeaderOptions: (options: HeaderOptions) => void }>();
    const navigate = useNavigate();
    const { stats, statsLoading, fetchStats } = useVoucherController();

    useEffect(() => {
        setHeaderOptions({
            links: [
                { label: 'Tất cả voucher', href: '/admin/vouchers' },
                { label: 'Thống kê', href: '/admin/vouchers/stats', active: true },
            ],
            showSearch: false,
        });
    }, [setHeaderOptions]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (statsLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
                <span className="material-symbols-outlined text-4xl text-text-muted animate-spin">progress_activity</span>
                <p className="font-body text-sm text-text-muted">Đang tải thống kê...</p>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-8 w-full pb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-headline text-4xl font-semibold text-text-ink">Thống kê Voucher</h2>
                    <p className="font-body text-lg text-text-muted mt-2">Tổng quan hiệu quả sử dụng các chương trình khuyến mãi.</p>
                </div>
                <button
                    id="btn-back-to-vouchers"
                    onClick={() => navigate('/admin/vouchers')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border-subtle font-body text-sm font-semibold text-text-muted hover:bg-surface-container hover:text-text-ink transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Quay lại danh sách
                </button>
            </div>

            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 space-y-1">
                    <p className="font-body text-xs text-text-muted uppercase tracking-wider font-semibold">Tổng voucher</p>
                    <p className="font-headline text-3xl font-bold text-text-ink">{stats.total_vouchers}</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 space-y-1">
                    <p className="font-body text-xs text-text-muted uppercase tracking-wider font-semibold">Đang hoạt động</p>
                    <p className="font-headline text-3xl font-bold text-emerald-600">{stats.active_vouchers_count}</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 space-y-1">
                    <p className="font-body text-xs text-text-muted uppercase tracking-wider font-semibold">Lượt sử dụng</p>
                    <p className="font-headline text-3xl font-bold text-text-ink">{stats.total_used_count.toLocaleString('vi-VN')}</p>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-5 space-y-1">
                    <p className="font-body text-xs text-text-muted uppercase tracking-wider font-semibold">Tổng đã giảm</p>
                    <p className="font-headline text-2xl font-bold text-text-ink">{formatCurrency(stats.total_discount_given)}</p>
                </div>
            </div>

            <div className="bg-surface-card border border-border-subtle rounded-xl shadow-sm">
                <div className="px-6 py-4 border-b border-border-subtle flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container text-xl">workspace_premium</span>
                    <h3 className="font-headline text-lg font-semibold text-text-ink">Top voucher hiệu quả nhất</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                        <thead>
                            <tr className="border-b border-border-subtle bg-surface-container">
                                <th className="text-left px-6 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">#</th>
                                <th className="text-left px-6 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Mã / Tên</th>
                                <th className="text-left px-6 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Loại</th>
                                <th className="text-left px-6 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Lượt đã dùng</th>
                                <th className="text-left px-6 py-3 text-text-muted font-semibold text-xs uppercase tracking-wider">Tổng đã giảm</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-subtle">
                            {stats.top_vouchers.map((item, index) => (
                                <tr key={item.id} className="hover:bg-surface-container/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className={`font-headline font-bold text-lg ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-700' : 'text-text-muted'}`}>
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-mono font-bold text-primary-container text-xs bg-surface-container px-2 py-0.5 rounded">
                                            {item.code}
                                        </span>
                                        <p className="text-text-ink font-semibold mt-1">{item.title}</p>
                                    </td>
                                    <td className="px-6 py-4 text-text-muted font-semibold text-xs">
                                        {VOUCHER_TYPE_LABEL[item.voucher_type]}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-text-ink">{item.used_count.toLocaleString('vi-VN')}</span>
                                        <span className="text-text-muted text-xs ml-1">lượt</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-emerald-600">{formatCurrency(item.total_discount_given)}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div className="bg-surface-card border border-border-subtle rounded-xl p-6">
                    <h3 className="font-headline text-base font-semibold text-text-ink mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary-container text-xl">pie_chart</span>
                        Phân bổ theo loại voucher
                    </h3>
                    <div className="space-y-3">
                        {stats.top_vouchers.map((item) => {
                            const pct = Math.round((item.used_count / stats.total_used_count) * 100);
                            return (
                                <div key={item.id}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-body text-sm font-semibold text-text-ink">{item.code}</span>
                                        <span className="font-body text-xs text-text-muted">{pct}%</span>
                                    </div>
                                    <div className="h-2 bg-border-subtle rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary-container rounded-full transition-all duration-500"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-surface-card border border-border-subtle rounded-xl p-6">
                    <h3 className="font-headline text-base font-semibold text-text-ink mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary-container text-xl">insights</span>
                        Tóm tắt nhanh
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center border-b border-border-subtle pb-3">
                            <span className="font-body text-sm text-text-muted">Tổng voucher đang hoạt động</span>
                            <span className="font-body text-sm font-semibold text-emerald-600">
                                {stats.active_vouchers_count}
                            </span>
                        </li>
                        <li className="flex justify-between items-center border-b border-border-subtle pb-3">
                            <span className="font-body text-sm text-text-muted">Loại phổ biến nhất</span>
                            <span className="font-body text-sm font-semibold text-text-ink">
                                {stats.most_popular_type ? VOUCHER_TYPE_LABEL[stats.most_popular_type] : '—'}
                            </span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="font-body text-sm text-text-muted">TB giảm / lượt</span>
                            <span className="font-body text-sm font-semibold text-emerald-600">
                                {stats.total_used_count > 0
                                    ? formatCurrency(Math.round(stats.total_discount_given / stats.total_used_count))
                                    : '—'}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
