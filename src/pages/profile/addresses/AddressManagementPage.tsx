import { useAddressManagementController } from './addressManagement.controller';
import { AddNewAddressModal } from '../../order-checkout/Modal/AddNewAddress/AddNewAddressModal';
import { EditAddressModal } from './EditAddressModal';

const AddressManagementPage = () => {
    const controller = useAddressManagementController();

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-white border border-border-subtle rounded-2xl p-6 shadow-sm">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
                    <h2 className="font-['Lora',serif] text-lg font-bold text-stone-900">
                        Địa chỉ giao hàng
                    </h2>
                    <button
                        onClick={() => controller.setIsAddModalOpen(true)}
                        className="px-4 py-2 bg-market-primary text-white rounded-lg font-medium text-sm hover:bg-market-primary/90 transition-colors flex items-center gap-1.5"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_location</span>
                        Thêm địa chỉ mới
                    </button>
                </div>

                {/* Content */}
                {controller.loading ? (
                    <div className="flex justify-center items-center py-16">
                        <span className="font-body text-text-muted animate-pulse">Đang tải danh sách địa chỉ...</span>
                    </div>
                ) : controller.addresses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-stone-400">location_off</span>
                        </div>
                        <div>
                            <p className="font-medium text-stone-700">Bạn chưa có địa chỉ nào</p>
                            <p className="text-sm text-stone-400 mt-1">Thêm địa chỉ giao hàng để đặt hàng nhanh hơn</p>
                        </div>
                        <button
                            onClick={() => controller.setIsAddModalOpen(true)}
                            className="px-5 py-2.5 bg-market-primary text-white rounded-lg font-medium text-sm hover:bg-market-primary/90 transition-all hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_location</span>
                            Thêm địa chỉ mới
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {controller.addresses.map((addr) => (
                            <div
                                key={addr.id}
                                className={`relative p-5 border-2 rounded-xl transition-all ${
                                    addr.isDefault
                                        ? 'border-market-primary/40 bg-market-primary/[0.03] shadow-sm'
                                        : 'border-stone-200 hover:border-stone-300 bg-white'
                                }`}
                            >
                                {/* Default badge */}
                                {addr.isDefault && (
                                    <span className="absolute top-3 right-3 bg-market-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                        Mặc định
                                    </span>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Info */}
                                    <div className="flex-1 space-y-2 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-stone-900">{addr.fullName}</span>
                                            <span className="text-stone-300">|</span>
                                            <span className="text-sm text-stone-500">{addr.phoneNumber}</span>
                                        </div>
                                        <p className="text-sm text-stone-700">{addr.street}</p>
                                        <p className="text-xs text-stone-400 leading-relaxed">{addr.fullAddress}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                                        <button
                                            onClick={() => controller.setEditingAddress(addr)}
                                            className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-market-primary border border-stone-200 hover:border-market-primary/40 rounded-lg transition-colors flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>edit</span>
                                            Sửa
                                        </button>
                                        {!addr.isDefault && (
                                            <>
                                                <button
                                                    onClick={() => controller.handleSetDefault(addr.id)}
                                                    className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-emerald-600 border border-stone-200 hover:border-emerald-300 rounded-lg transition-colors flex items-center gap-1"
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check_circle</span>
                                                    Đặt mặc định
                                                </button>
                                                <button
                                                    onClick={() => controller.handleDelete(addr.id)}
                                                    className="px-3 py-1.5 text-xs font-medium text-stone-400 hover:text-red-500 border border-stone-200 hover:border-red-300 rounded-lg transition-colors flex items-center gap-1"
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>delete</span>
                                                    Xóa
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
        </div>
    );
};

export default AddressManagementPage;
