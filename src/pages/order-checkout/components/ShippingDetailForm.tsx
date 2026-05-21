import React from 'react';
import type { PrepareCheckoutModel } from '../../../features/order/checkout/models/checkout.model';

interface ShippingDetailFormProps {
    address: PrepareCheckoutModel['address'];
}

export const ShippingDetailForm: React.FC<ShippingDetailFormProps> = ({ address }) => {
    return (
        <section className="w-full">
            <h2 className="font-headline text-2xl text-text-ink border-b border-subtle pb-2 mb-4">Thông tin giao hàng</h2>
            <div className="bg-surface-card card-border rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-body-sm text-text-ink mb-1">Họ và tên</label>
                        <input type="text" className="input-field w-full px-3 py-2" defaultValue={address.fullName} />
                    </div>
                    <div>
                        <label className="block font-body-sm text-text-ink mb-1">Số điện thoại</label>
                        <input type="text" className="input-field w-full px-3 py-2" defaultValue={address.phoneNumber} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block font-body-sm text-text-ink mb-1">Địa chỉ chi tiết</label>
                        <input type="text" className="input-field w-full px-3 py-2" defaultValue={address.street} />
                    </div>
                    <div>
                        <label className="block font-body-sm text-text-ink mb-1">Phường/Xã</label>
                        <input type="text" className="input-field w-full px-3 py-2" defaultValue={address.wardName} />
                    </div>
                    <div>
                        <label className="block font-body-sm text-text-ink mb-1">Quận/Huyện</label>
                        <input type="text" className="input-field w-full px-3 py-2" defaultValue={address.districtName} />
                    </div>
                    <div>
                        <label className="block font-body-sm text-text-ink mb-1">Tỉnh/Thành phố</label>
                        <input type="text" className="input-field w-full px-3 py-2" defaultValue={address.provinceName} />
                    </div>
                    <div>
                        <label className="block font-body-sm text-text-ink mb-1">Địa chỉ đầy đủ</label>
                        <input type="text" className="input-field w-full px-3 py-2 bg-surface-container-low" disabled defaultValue={address.fullAddress} />
                    </div>
                </div>
            </div>
        </section>
    );
};