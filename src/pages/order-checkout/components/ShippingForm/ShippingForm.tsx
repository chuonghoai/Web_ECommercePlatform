import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DefaultIcon, type ShippingFormProps } from './shippingForm.type';
import { LocationSelector, useShippingController } from './shippingForm.controller';

L.Marker.prototype.options.icon = DefaultIcon;

export const ShippingForm: React.FC<ShippingFormProps> = ({ address, onOpenAddressModal, onOpenAddNewAddressModal }) => {
    const fallbackLat = 10.8231;
    const fallbackLng = 106.6297;
    const { position } = useShippingController(address?.latitude ?? fallbackLat, address?.longitude ?? fallbackLng);

    const disabledInputClass = "input-field w-full px-3 py-2 text-text-muted border-dashed border-border-medium cursor-not-allowed";

    if (!address) {
        return (
            <section className="w-full">
                <div className="flex justify-between items-center border-b border-subtle pb-2 mb-4">
                    <h2 className="font-headline text-2xl text-text-ink">Thông tin giao hàng</h2>
                </div>
                <div className="bg-surface-card card-border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-2">
                        <span className="material-symbols-outlined text-4xl text-text-muted">location_off</span>
                    </div>
                    <div>
                        <p className="font-body text-text-ink font-semibold text-lg">Bạn chưa có địa chỉ giao hàng</p>
                        <p className="font-caption text-text-muted mt-1">Vui lòng thêm địa chỉ để tiếp tục thanh toán đơn hàng</p>
                    </div>
                    <button
                        type="button"
                        onClick={onOpenAddNewAddressModal}
                        className="btn-primary px-6 py-2.5 mt-2 rounded-lg font-body font-semibold flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_location</span>
                        Thêm mới địa chỉ
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full">
            <div className="flex justify-between items-center border-b border-subtle pb-2 mb-4">
                <h2 className="font-headline text-2xl text-text-ink">Thông tin giao hàng</h2>

                <button
                    type="button"
                    onClick={onOpenAddressModal}
                    className="px-3 py-1.5 border border-border-medium rounded-lg font-body-sm text-primary hover:bg-surface-container-low transition-colors flex items-center gap-1"
                >
                    <span className="material-symbols-outlined text-sm" style={{ fontSize: '18px' }}>edit</span>
                    Chỉnh sửa
                </button>
            </div>

            <div className="bg-surface-card card-border rounded-lg p-6">
                <div className="flex flex-col lg:flex-row gap-6">

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-body-sm text-text-muted mb-1">Họ và tên</label>
                            <input type="text" className={disabledInputClass} readOnly disabled value={address.fullName} />
                        </div>
                        <div>
                            <label className="block font-body-sm text-text-muted mb-1">Số điện thoại</label>
                            <input type="text" className={disabledInputClass} readOnly disabled value={address.phoneNumber} />
                        </div>

                        <div>
                            <label className="block font-body-sm text-text-muted mb-1">Tỉnh/Thành phố</label>
                            <input type="text" className={disabledInputClass} readOnly disabled value={address.provinceName} />
                        </div>
                        <div>
                            <label className="block font-body-sm text-text-muted mb-1">Quận/Huyện</label>
                            <input type="text" className={disabledInputClass} readOnly disabled value={address.districtName} />
                        </div>
                        <div>
                            <label className="block font-body-sm text-text-muted mb-1">Phường/Xã</label>
                            <input type="text" className={disabledInputClass} readOnly disabled value={address.wardName} />
                        </div>
                        <div>
                            <label className="block font-body-sm text-text-muted mb-1">Số nhà, tên đường</label>
                            <input type="text" className={disabledInputClass} readOnly disabled value={address.street} />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block font-body-sm text-text-muted mb-1">Địa chỉ đầy đủ</label>
                            <input type="text" className={disabledInputClass} readOnly disabled value={address.fullAddress} />
                        </div>
                    </div>

                    <div className="w-full lg:w-[320px] xl:w-95 shrink-0 flex flex-col gap-2">
                        <div className="h-70 lg:h-full min-h-70 rounded-lg border border-border-medium overflow-hidden z-0">
                            <MapContainer
                                center={position}
                                zoom={15}
                                scrollWheelZoom={true}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationSelector position={position} />
                            </MapContainer>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};