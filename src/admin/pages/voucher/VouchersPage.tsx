import { useEffect, useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import type { HeaderOptions } from '../../layout/AdminLayout';
import { useVoucherController } from './voucher.controller';
import { VoucherTable } from './components/VoucherTable';
import { VoucherCreateModal } from './components/VoucherCreateModal';
import { VoucherEditModal } from './components/VoucherEditModal';
import type { GetVouchersQuery } from '../../features/voucher/models/voucher.model';
import { VoucherStatus, DistributionType } from '../../features/voucher/models/voucher.model';

export const VouchersPage = () => {
    const { setHeaderOptions } = useOutletContext<{ setHeaderOptions: (options: HeaderOptions) => void }>();
    const navigate = useNavigate();
    const ctrl = useVoucherController();

    useEffect(() => {
        setHeaderOptions({
            links: [
                { label: 'Tất cả voucher', href: '/admin/vouchers', active: true },
            ],
            showSearch: false,
        });
    }, [setHeaderOptions]);

    useEffect(() => {
        ctrl.fetchVouchers();
    }, [ctrl.fetchVouchers]);

    const handleConfirmDelete = async (id: number) => {
        if (!window.confirm('Bạn có chắc muốn xoá vĩnh viễn voucher này? Thao tác này không thể hoàn tác!')) return;
        const ok = await ctrl.handleDeleteVoucher(id);
        if (!ok) alert('Không thể xoá voucher. Vui lòng thử lại!');
    };

    const filterOptions = useMemo<{
        statusOptions: { label: string; value: string }[];
        distributionOptions: { label: string; value: string }[];
    }>(() => ({
        statusOptions: [
            { label: 'Tất cả trạng thái', value: '' },
            { label: 'Đang hoạt động', value: VoucherStatus.ACTIVE },
            { label: 'Vô hiệu hóa', value: VoucherStatus.DISABLED },
            { label: 'Đã hết hạn', value: VoucherStatus.EXPIRED },
        ],
        distributionOptions: [
            { label: 'Tất cả hình thức', value: '' },
            { label: 'Công khai', value: DistributionType.PUBLIC },
            { label: 'Giới hạn', value: DistributionType.LIMITED },
        ],
    }), []);

    const handleStatusFilter = (value: string) => {
        ctrl.handleFilterChange({
            ...ctrl.filters,
            status: (value as VoucherStatus) || undefined,
        } as Omit<GetVouchersQuery, 'page' | 'pageSize'>);
    };

    const handleDistributionFilter = (value: string) => {
        ctrl.handleFilterChange({
            ...ctrl.filters,
            distribution_type: (value as DistributionType) || undefined,
        } as Omit<GetVouchersQuery, 'page' | 'pageSize'>);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 w-full pb-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="font-headline text-4xl font-semibold text-text-ink">Quản lý Voucher</h2>
                    <p className="font-body text-lg text-text-muted mt-2">Quản lý toàn bộ voucher khuyến mãi trên hệ thống.</p>
                </div>
            </div>

            {ctrl.error && (
                <div className="bg-[#fee2e2] text-error rounded-xl px-6 py-4 font-body text-sm">{ctrl.error}</div>
            )}

            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                    <select
                        id="filter-voucher-status"
                        value={ctrl.filters.status || ''}
                        onChange={(e) => handleStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-border-subtle rounded-lg font-body text-sm text-text-ink bg-background-page focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all"
                    >
                        {filterOptions.statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    <select
                        id="filter-distribution-type"
                        value={ctrl.filters.distribution_type || ''}
                        onChange={(e) => handleDistributionFilter(e.target.value)}
                        className="px-3 py-2 border border-border-subtle rounded-lg font-body text-sm text-text-ink bg-background-page focus:outline-none focus:ring-2 focus:ring-primary-container/40 transition-all"
                    >
                        {filterOptions.distributionOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    {ctrl.totalItems > 0 && (
                        <span className="text-text-muted font-body text-sm">
                            {ctrl.totalItems} voucher
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        id="btn-goto-voucher-stats"
                        onClick={() => navigate('/admin/vouchers/stats')}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border-subtle font-body text-sm font-semibold text-text-muted hover:bg-surface-container hover:text-text-ink transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                        Thống kê voucher
                    </button>
                    <button
                        id="btn-open-create-voucher"
                        onClick={ctrl.handleOpenCreateModal}
                        className="btn-primary font-body text-sm font-semibold px-4 py-2 hover:-translate-y-[2px] flex items-center gap-1.5 transition-transform"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Thêm voucher
                    </button>
                </div>
            </div>

            <div className="bg-surface-card border border-border-subtle rounded-xl shadow-sm">
                <VoucherTable
                    vouchers={ctrl.vouchers}
                    loading={ctrl.loading}
                    onEdit={ctrl.handleOpenEditModal}
                    onDelete={(v) => handleConfirmDelete(v.id)}
                />

                {ctrl.totalPages > 1 && (
                    <div className="p-4 border-t border-border-subtle flex justify-between items-center">
                        <button
                            id="btn-voucher-prev-page"
                            disabled={ctrl.page <= 1}
                            onClick={() => ctrl.handlePageChange(ctrl.page - 1)}
                            className="px-3 py-1 bg-surface-container rounded-md disabled:opacity-50 text-sm font-semibold transition-opacity"
                        >
                            Trang trước
                        </button>
                        <span className="text-sm font-semibold text-text-muted">
                            Trang {ctrl.page} / {ctrl.totalPages}
                        </span>
                        <button
                            id="btn-voucher-next-page"
                            disabled={ctrl.page >= ctrl.totalPages}
                            onClick={() => ctrl.handlePageChange(ctrl.page + 1)}
                            className="px-3 py-1 bg-surface-container rounded-md disabled:opacity-50 text-sm font-semibold transition-opacity"
                        >
                            Trang sau
                        </button>
                    </div>
                )}
            </div>

            <VoucherCreateModal
                isOpen={ctrl.isCreateModalOpen}
                saving={ctrl.saving}
                onClose={ctrl.handleCloseCreateModal}
                onSubmit={ctrl.handleCreateVoucher}
            />

            <VoucherEditModal
                isOpen={ctrl.isEditModalOpen}
                saving={ctrl.saving}
                voucher={ctrl.selectedVoucherForEdit}
                onClose={ctrl.handleCloseEditModal}
                onSubmit={ctrl.handleEditVoucher}
            />
        </div>
    );
};
