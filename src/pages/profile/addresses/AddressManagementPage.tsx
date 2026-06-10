import { useAddressManagementController } from './addressManagement.controller';
import { AddNewAddressModal } from '../../order-checkout/Modal/AddNewAddress/AddNewAddressModal';
import { EditAddressModal } from './EditAddressModal';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

const AddressManagementPage = () => {
    const controller = useAddressManagementController();

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-white border border-border-subtle rounded-2xl shadow-sm overflow-hidden">
                {/* Header — giống ProfileInformationCard */}
                <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
                    <h2 className="font-['Lora',serif] text-lg font-bold text-stone-900">
                        Địa chỉ giao hàng
                    </h2>
                    <button
                        onClick={() => controller.setIsAddModalOpen(true)}
                        className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-market-primary text-white text-sm font-semibold hover:brightness-110 transition-all shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Thêm mới
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {controller.loading ? (
                        /* Loading skeleton */
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="animate-pulse p-5 border border-stone-100 rounded-xl">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-stone-100 rounded-full shrink-0" />
                                        <div className="flex-1 space-y-2.5">
                                            <div className="h-4 bg-stone-100 rounded w-1/3" />
                                            <div className="h-3 bg-stone-100 rounded w-2/3" />
                                            <div className="h-3 bg-stone-100 rounded w-1/2" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : controller.addresses.length === 0 ? (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center py-14 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                                <svg className="w-9 h-9 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <p className="text-sm font-semibold text-stone-700 mb-1">Chưa có địa chỉ nào</p>
                            <p className="text-xs text-stone-400 mb-5 max-w-xs">Thêm địa chỉ giao hàng để đặt hàng nhanh hơn và thuận tiện hơn</p>
                            <button
                                onClick={() => controller.setIsAddModalOpen(true)}
                                className="h-10 px-5 bg-market-primary text-white text-sm font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Thêm địa chỉ đầu tiên
                            </button>
                        </div>
                    ) : (
                        /* Address list */
                        <div className="space-y-3">
                            {controller.addresses.map((addr) => (
                                <div
                                    key={addr.id}
                                    className={`group p-4 sm:p-5 rounded-xl border transition-all ${
                                        addr.isDefault
                                            ? 'border-market-primary/30 bg-market-primary/[0.02] ring-1 ring-market-primary/10'
                                            : 'border-stone-150 hover:border-stone-250 hover:shadow-sm bg-white'
                                    }`}
                                >
                                    <div className="flex gap-3.5 sm:gap-4">
                                        {/* Icon avatar */}
                                        <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${
                                            addr.isDefault
                                                ? 'bg-market-primary/10 text-market-primary'
                                                : 'bg-stone-100 text-stone-400 group-hover:bg-stone-150 group-hover:text-stone-500'
                                        } transition-colors`}>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            {/* Name row */}
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <span className="text-sm font-bold text-stone-900">{addr.fullName}</span>
                                                <span className="w-px h-3.5 bg-stone-200" />
                                                <span className="text-xs text-stone-500 font-medium">{addr.phoneNumber}</span>
                                                {addr.isDefault && (
                                                    <span className="inline-flex items-center gap-0.5 bg-market-primary/10 text-market-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Mặc định
                                                    </span>
                                                )}
                                            </div>

                                            {/* Address */}
                                            <p className="text-sm text-stone-700 leading-relaxed">{addr.street}</p>
                                            <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{addr.fullAddress}</p>

                                            {/* Actions — nằm dưới address info */}
                                            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-stone-100">
                                                <button
                                                    onClick={() => controller.setEditingAddress(addr)}
                                                    className="h-7 px-2.5 text-xs font-medium text-stone-500 hover:text-market-primary hover:bg-market-primary/5 rounded-md transition-colors flex items-center gap-1"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                    Chỉnh sửa
                                                </button>
                                                {!addr.isDefault && (
                                                    <>
                                                        <span className="w-px h-3.5 bg-stone-150" />
                                                        <button
                                                            onClick={() => controller.handleSetDefault(addr.id)}
                                                            className="h-7 px-2.5 text-xs font-medium text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors flex items-center gap-1"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            Đặt mặc định
                                                        </button>
                                                        <span className="w-px h-3.5 bg-stone-150" />
                                                        <button
                                                            onClick={() => controller.confirmDelete(addr.id)}
                                                            className="h-7 px-2.5 text-xs font-medium text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Xóa
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Address Modal — reuse from checkout */}
            <AddNewAddressModal
                isOpen={controller.isAddModalOpen}
                onClose={() => controller.setIsAddModalOpen(false)}
                onBack={() => controller.setIsAddModalOpen(false)}
                onSuccess={controller.handleAddSuccess}
            />

            {/* Edit Address Modal */}
            {controller.editingAddress && (
                <EditAddressModal
                    isOpen={!!controller.editingAddress}
                    onClose={() => controller.setEditingAddress(null)}
                    address={controller.editingAddress}
                    onSuccess={controller.handleUpdateSuccess}
                />
            )}

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                isOpen={!!controller.deletingAddress}
                onClose={controller.cancelDelete}
                onConfirm={controller.executeDelete}
                addressName={controller.deletingAddress?.fullName ?? ''}
                isDeleting={controller.isDeleting}
            />
        </div>
    );
};

export default AddressManagementPage;
