import type { UpdateProfileRequest } from "../../../features/user/dto/updateProfile.type";
import type { User } from "../../../features/user/models/user.model";

interface PersonalInfoTabProps {
    user: User | null;
    formData: UpdateProfileRequest;
    isSaving: boolean;
    isEditingMode: boolean;
    onFieldChange: (field: keyof UpdateProfileRequest, value: string) => void;
    onSave: () => void;
    onEditClick: () => void;
}

export const PersonalInfoTab = ({
    user,
    formData,
    isSaving,
    isEditingMode,
    onFieldChange,
    onSave,
    onEditClick,
}: PersonalInfoTabProps) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar section */}
            <div className="flex flex-col items-center gap-4 lg:w-56 shrink-0">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-stone-200 transition-colors shadow-sm">
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-market-secondary flex items-center justify-center text-white font-bold text-4xl">
                                {user?.fullName?.charAt(0)?.toUpperCase() ?? "U"}
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center mt-2">
                    <p className="text-sm font-semibold text-stone-900">{user?.fullName}</p>
                    <p className="text-sm text-stone-500 mt-0.5">{user?.email}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-stone-200" />

            {/* Form section */}
            <div className="flex-1 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full name */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="profile-fullname" className="text-sm font-medium text-stone-700">Họ và tên</label>
                        <input
                            id="profile-fullname"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            value={formData.fullName ?? ""}
                            onChange={(e) => onFieldChange("fullName", e.target.value)}
                            placeholder="Nhập họ và tên"
                            disabled={!isEditingMode}
                            className="h-11 px-4 border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 outline-none focus-visible:ring-2 focus-visible:ring-market-primary/20 focus-visible:border-market-primary transition-all shadow-sm disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed disabled:border-stone-200"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="profile-phone" className="text-sm font-medium text-stone-700">Số điện thoại</label>
                        <input
                            id="profile-phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={formData.phone ?? ""}
                            onChange={(e) => onFieldChange("phone", e.target.value)}
                            placeholder="Nhập số điện thoại"
                            disabled={!isEditingMode}
                            className="h-11 px-4 border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 outline-none focus-visible:ring-2 focus-visible:ring-market-primary/20 focus-visible:border-market-primary transition-all shadow-sm disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed disabled:border-stone-200"
                        />
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="profile-gender" className="text-sm font-medium text-stone-700">Giới tính</label>
                        <div className="relative">
                            <select
                                id="profile-gender"
                                name="gender"
                                autoComplete="sex"
                                value={formData.gender ?? ""}
                                onChange={(e) => onFieldChange("gender", e.target.value)}
                                disabled={!isEditingMode}
                                className="w-full h-11 px-4 pr-10 border border-stone-300 rounded-lg text-sm text-stone-900 outline-none focus-visible:ring-2 focus-visible:ring-market-primary/20 focus-visible:border-market-primary transition-all shadow-sm bg-white appearance-none cursor-pointer disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed disabled:border-stone-200"
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500" aria-hidden="true">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Date of birth */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="profile-dob" className="text-sm font-medium text-stone-700">Ngày sinh</label>
                        <input
                            id="profile-dob"
                            name="dateOfBirth"
                            type="date"
                            autoComplete="bday"
                            value={formData.dateOfBirth ?? ""}
                            onChange={(e) => onFieldChange("dateOfBirth", e.target.value)}
                            disabled={!isEditingMode}
                            className="h-11 px-4 border border-stone-300 rounded-lg text-sm text-stone-900 outline-none focus-visible:ring-2 focus-visible:ring-market-primary/20 focus-visible:border-market-primary transition-all shadow-sm disabled:bg-stone-50 disabled:text-stone-400 disabled:cursor-not-allowed disabled:border-stone-200"
                        />
                    </div>
                </div>

                {/* Email (read-only) */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="profile-email-readonly" className="text-sm font-medium text-stone-700">Email</label>
                    <div id="profile-email-readonly" className="h-11 px-4 border border-stone-200 rounded-lg text-sm text-stone-500 bg-stone-50 flex items-center select-none shadow-sm">
                        {user?.email}
                    </div>
                    <p className="text-xs text-stone-500">Email không thể thay đổi</p>
                </div>

                {/* Save button */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onEditClick}
                        disabled={isEditingMode}
                        className="h-11 px-6 border-2 border-market-primary text-market-primary text-sm font-semibold rounded-lg hover:bg-market-primary/5 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:active:scale-100 disabled:hover:bg-transparent"
                    >
                        Cập nhật thông tin
                    </button>
                    <button
                        id="profile-save-btn"
                        type="button"
                        onClick={onSave}
                        disabled={!isEditingMode || isSaving}
                        className="h-11 px-8 bg-market-primary text-white text-sm font-semibold rounded-lg hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center gap-2 shadow-sm shadow-market-primary/20"
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

