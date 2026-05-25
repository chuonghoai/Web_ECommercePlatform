import React from 'react';

interface VoucherModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedVoucher: string;
    onSelectVoucher: (code: string) => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
    isOpen,
    onClose,
    selectedVoucher,
    onSelectVoucher
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-text-ink/50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-surface-card w-[90%] max-w-md rounded-lg shadow-xl card-border flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-subtle">
                    <h3 className="font-subhead text-lg text-text-ink">Áp dụng Voucher</h3>
                    <button className="text-text-muted hover:text-text-ink transition-colors" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto">
                    <div className="flex gap-2">
                        <input className="input-field w-full px-3 py-2 font-body-sm placeholder:text-text-muted" placeholder="Nhập mã voucher" type="text" />
                        <button className="btn-primary px-4 py-2 font-body-sm whitespace-nowrap">Áp dụng</button>
                    </div>
                    <div className="space-y-3">
                        <label className="block cursor-pointer">
                            <div className={`p-3 border-2 rounded-lg bg-surface-container-low flex justify-between items-start gap-4 relative overflow-hidden ${selectedVoucher === 'NEST200' ? 'border-primary-container' : 'border-border-medium'}`}>
                                <div className="absolute left-0 top-0 bottom-0 w-1 border-r border-dashed border-primary/30 flex flex-col justify-between py-1 px-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-background-page -ml-1"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-background-page -ml-1"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-background-page -ml-1"></div>
                                </div>
                                <div className="pl-4 grow">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-body font-bold text-primary-container">NEST200</span>
                                        {selectedVoucher === 'NEST200' && <span className="bg-tertiary-container text-on-tertiary-container font-caption text-[10px] px-1 py-0.5 rounded">Đã chọn</span>}
                                    </div>
                                    <p className="font-body-sm text-text-ink">Giảm 200K cho đơn từ 2M</p>
                                    <p className="font-caption text-text-muted mt-1">HSD: 30/12/2024</p>
                                </div>
                                <div className="shrink-0 pt-1">
                                    <input type="radio" name="voucher" checked={selectedVoucher === 'NEST200'} onChange={() => onSelectVoucher('NEST200')} className="w-4 h-4 text-primary-container" />
                                </div>
                            </div>
                        </label>
                        <label className="block cursor-pointer">
                            <div className={`p-3 border rounded-lg hover:border-primary-container/50 transition-colors flex justify-between items-start gap-4 relative overflow-hidden bg-surface ${selectedVoucher === 'FREESHIP' ? 'border-2 border-primary-container' : 'border-border-medium'}`}>
                                <div className="absolute left-0 top-0 bottom-0 w-1 border-r border-dashed border-border-medium flex flex-col justify-between py-1 px-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-background-page -ml-1"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-background-page -ml-1"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-background-page -ml-1"></div>
                                </div>
                                <div className="pl-4 grow">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-body font-bold text-text-ink">FREESHIP</span>
                                        {selectedVoucher === 'FREESHIP' && <span className="bg-tertiary-container text-on-tertiary-container font-caption text-[10px] px-1 py-0.5 rounded">Đã chọn</span>}
                                    </div>
                                    <p className="font-body-sm text-text-ink">Miễn phí vận chuyển tối đa 30K</p>
                                    <p className="font-caption text-text-muted mt-1">HSD: 31/12/2024</p>
                                </div>
                                <div className="shrink-0 pt-1">
                                    <input type="radio" name="voucher" checked={selectedVoucher === 'FREESHIP'} onChange={() => onSelectVoucher('FREESHIP')} className="w-4 h-4 text-primary-container" />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="p-4 border-t border-subtle bg-surface-container">
                    <button className="w-full btn-secondary py-2 font-body" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};