import type { UpdateProfileRequest } from "../../../features/user/dto/updateProfile.type";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: UpdateProfileRequest;
    isSaving: boolean;
    onFieldChange: (field: keyof UpdateProfileRequest, value: string) => void;
    onSave: () => void;
}

export const EditProfileModal = ({
    isOpen,
    onClose,
    formData,
    isSaving,
    onFieldChange,
    onSave,
}: EditProfileModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-stone-900">Chỉnh sửa thông tin cá nhân</h3>
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="text-stone-400 hover:text-stone-600 transition-colors disabled:opacity-50 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-4 overflow-y-auto">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="modal-fullname" className="text-sm font-medium text-stone-700">Họ và tên</label>
                        <input
                            id="modal-fullname"
                            name="fullName"
                            type="text"
                            value={formData.fullName ?? ""}
                            onChange={(e) => onFieldChange("fullName", e.target.value)}
                            placeholder="Nhập họ và tên"
                            disabled={isSaving}
                            className="h-11 px-4 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 outline-none focus-visible:ring-2 focus-visible:ring-market-primary/20 focus-visible:border-market-primary transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] disabled:bg-stone-50 disabled:text-stone-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="modal-phone" className="text-sm font-medium text-stone-700">Số điện thoại</label>
                        <input
                            id="modal-phone"
                            name="phone"
                            type="tel"
                            value={formData.phone ?? ""}
                            onChange={(e) => onFieldChange("phone", e.target.value)}
                            placeholder="Nhập số điện thoại"
                            disabled={isSaving}
                            className="h-11 px-4 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 outline-none focus-visible:ring-2 focus-visible:ring-market-primary/20 focus-visible:border-market-primary transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] disabled:bg-stone-50 disabled:text-stone-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="modal-gender" className="text-sm font-medium text-stone-700">Giới tính</label>
                        <div className="relative">
                            <select
                                id="modal-gender"
                                name="gender"
                                value={formData.gender ?? ""}
                                onChange={(e) => onFieldChange("gender", e.target.value)}
                                disabled={isSaving}
                                className="w-full h-11 px-4 pr-10 border border-stone-200 rounded-xl text-sm text-stone-900 outline-none focus-visible:ring-2 focus-visible:ring-market-primary/20 focus-visible:border-market-primary transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-white appearance-none cursor-pointer disabled:bg-stone-50 disabled:text-stone-400"
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="modal-dob" className="text-sm font-medium text-stone-700">Ngày sinh</label>
                        <input
                            id="modal-dob"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth ?? ""}
                            onChange={(e) => onFieldChange("dateOfBirth", e.target.value)}
                            disabled={isSaving}
                            className="h-11 px-4 border border-stone-200 rounded-xl text-sm text-stone-900 outline-none focus-visible:ring-2 focus-visible:ring-market-primary/20 focus-visible:border-market-primary transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] disabled:bg-stone-50 disabled:text-stone-400"
                        />
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-stone-100 flex justify-end gap-3 bg-stone-50/60">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="h-10 px-5 text-sm font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-xl transition-colors disabled:opacity-50"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={onSave}
                        disabled={isSaving}
                        className="h-10 px-6 bg-market-primary text-white text-sm font-semibold rounded-xl hover:brightness-110 transition-all flex items-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isSaving && (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        {isSaving ? "Đang lưu…" : "Lưu thay đổi"}
                    </button>
                </div>
            </div>
        </div>
    );
};
