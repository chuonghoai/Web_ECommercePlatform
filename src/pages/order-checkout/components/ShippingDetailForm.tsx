import React from 'react';
import type { PrepareCheckoutModel } from '../../../features/order/checkout/models/checkout.model';

interface ShippingDetailFormProps {
    address: PrepareCheckoutModel['address'];
}

export const ShippingDetailForm: React.FC<ShippingDetailFormProps> = ({ address }) => {
    return (
        <section className="w-full">
            <div className="flex justify-between items-center border-b border-subtle pb-2 mb-4">
                <h2 className="font-headline text-2xl text-text-ink">Thông tin giao hàng</h2>

                {/* Modify address button */}
                {/* TODO: open modal modify address */}
                <button
                    type="button"
                    className="px-3 py-1.5 border border-border-medium rounded-lg font-body-sm text-primary hover:bg-surface-container-low transition-colors flex items-center gap-1"
                >
                    <span className="material-symbols-outlined text-sm" style={{ fontSize: '18px' }}>edit</span>
                    Chỉnh sửa
                </button>
            </div>

            <div className="bg-surface-card card-border rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-body-sm text-text-muted mb-1">Họ và tên</label>
                        <input type="text" className="input-field w-full px-3 py-2 bg-surface-container-low text-text-ink cursor-not-allowed" readOnly disabled value={address.fullName} />
                    </div>
                    <div>
                        <label className="block font-body-sm text-text-muted mb-1">Số điện thoại</label>
                        <input type="text" className="input-field w-full px-3 py-2 bg-surface-container-low text-text-ink cursor-not-allowed" readOnly disabled value={address.phoneNumber} />
                    </div>

                    <div>
                        <label className="block font-body-sm text-text-muted mb-1">Tỉnh/Thành phố</label>
                        <input type="text" className="input-field w-full px-3 py-2 bg-surface-container-low text-text-ink cursor-not-allowed" readOnly disabled value={address.provinceName} />
                    </div>
                    <div>
                        <label className="block font-body-sm text-text-muted mb-1">Quận/Huyện</label>
                        <input type="text" className="input-field w-full px-3 py-2 bg-surface-container-low text-text-ink cursor-not-allowed" readOnly disabled value={address.districtName} />
                    </div>
                    <div>
                        <label className="block font-body-sm text-text-muted mb-1">Phường/Xã</label>
                        <input type="text" className="input-field w-full px-3 py-2 bg-surface-container-low text-text-ink cursor-not-allowed" readOnly disabled value={address.wardName} />
                    </div>
                    <div>
                        <label className="block font-body-sm text-text-muted mb-1">Số nhà, tên đường</label>
                        <input type="text" className="input-field w-full px-3 py-2 bg-surface-container-low text-text-ink cursor-not-allowed" readOnly disabled value={address.street} />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-body-sm text-text-muted mb-1">Địa chỉ đầy đủ</label>
                        <input type="text" className="input-field w-full px-3 py-2 bg-surface-container-low text-text-muted border-dashed cursor-not-allowed" disabled value={address.fullAddress} />
                    </div>
                </div>
            </div>
        </section>
    );
};