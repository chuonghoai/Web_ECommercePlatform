import type { UpdateProfileRequest } from "../../../features/user/dto/updateProfile.type";
import type { User } from "../../../features/user/models/user.model";

interface PersonalInfoTabProps {
    user: User | null;
    formData: UpdateProfileRequest;
    isSaving: boolean;
    avatarPreview: string | null;
    isUploadingAvatar: boolean;
    isEditingMode: boolean;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onFieldChange: (field: keyof UpdateProfileRequest, value: string) => void;
    onSave: () => void;
    onEditClick: () => void;
    onAvatarClick: () => void;
    onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfoTab = ({
    user,
    formData,
    isSaving,
    avatarPreview,
    isUploadingAvatar,
    isEditingMode,
    fileInputRef,
    onFieldChange,
    onSave,
    onEditClick,
    onAvatarClick,
    onAvatarChange,
}: PersonalInfoTabProps) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar section */}
            <div className="flex flex-col items-center gap-4 lg:w-[220px] shrink-0">
                <div className="relative group cursor-pointer" onClick={onAvatarClick}>
                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-[2px] border-[#E7E5E4] group-hover:border-market-primary transition-colors">
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-market-secondary flex items-center justify-center text-white font-bold text-[36px]">
                                {user?.fullName?.charAt(0)?.toUpperCase() ?? "U"}
                            </div>
                        )}
                    </div>

                    <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {isUploadingAvatar ? (
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                    </div>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onAvatarChange}
                    id="avatar-upload-input"
                />

                <div className="text-center">
                    <p className="text-[14px] font-semibold text-[#1C1917]">{user?.fullName}</p>
                    <p className="text-[13px] text-[#A8A29E] mt-0.5">{user?.email}</p>
                </div>

                <button
                    type="button"
                    onClick={onAvatarClick}
                    disabled={isUploadingAvatar}
                    className="w-full h-[38px] border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[13px] font-semibold text-[#57534E] hover:bg-market-background hover:border-market-primary hover:text-market-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploadingAvatar ? "Đang tải..." : "Thay đổi ảnh"}
                </button>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-[1px] bg-[#E7E5E4]" />

            {/* Form section */}
            <div className="flex-1 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-[#57534E]">Họ và tên</label>
                        <input
                            id="profile-fullname"
                            type="text"
                            value={formData.fullName ?? ""}
                            onChange={(e) => onFieldChange("fullName", e.target.value)}
                            placeholder="Nhập họ và tên"
                            disabled={!isEditingMode}
                            className="h-[44px] px-4 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-market-primary focus:ring-[3px] focus:ring-market-primary/15 transition-all disabled:bg-[#F5F5F4] disabled:text-[#A8A29E] disabled:cursor-not-allowed disabled:border-[#E7E5E4]"
                        />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-[#57534E]">Số điện thoại</label>
                        <input
                            id="profile-phone"
                            type="tel"
                            value={formData.phone ?? ""}
                            onChange={(e) => onFieldChange("phone", e.target.value)}
                            placeholder="Nhập số điện thoại"
                            disabled={!isEditingMode}
                            className="h-[44px] px-4 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[14px] text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-market-primary focus:ring-[3px] focus:ring-market-primary/15 transition-all disabled:bg-[#F5F5F4] disabled:text-[#A8A29E] disabled:cursor-not-allowed disabled:border-[#E7E5E4]"
                        />
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-[#57534E]">Giới tính</label>
                        <div className="relative">
                            <select
                                id="profile-gender"
                                value={formData.gender ?? ""}
                                onChange={(e) => onFieldChange("gender", e.target.value)}
                                disabled={!isEditingMode}
                                className="w-full h-[44px] px-4 pr-10 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[14px] text-[#1C1917] outline-none focus:border-market-primary focus:ring-[3px] focus:ring-market-primary/15 transition-all bg-white appearance-none cursor-pointer disabled:bg-[#F5F5F4] disabled:text-[#A8A29E] disabled:cursor-not-allowed disabled:border-[#E7E5E4]"
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#57534E]">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Date of birth */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-[#57534E]">Ngày sinh</label>
                        <input
                            id="profile-dob"
                            type="date"
                            value={formData.dateOfBirth ?? ""}
                            onChange={(e) => onFieldChange("dateOfBirth", e.target.value)}
                            disabled={!isEditingMode}
                            className="h-[44px] px-4 border-[1.5px] border-[#D6D3D1] rounded-[4px] text-[14px] text-[#1C1917] outline-none focus:border-market-primary focus:ring-[3px] focus:ring-market-primary/15 transition-all disabled:bg-[#F5F5F4] disabled:text-[#A8A29E] disabled:cursor-not-allowed disabled:border-[#E7E5E4]"
                        />
                    </div>
                </div>

                {/* Email (read-only) */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#57534E]">Email</label>
                    <div className="h-[44px] px-4 border-[1.5px] border-[#E7E5E4] rounded-[4px] text-[14px] text-[#A8A29E] bg-market-background flex items-center select-none">
                        {user?.email}
                    </div>
                    <p className="text-[12px] text-[#A8A29E]">Email không thể thay đổi</p>
                </div>

                {/* Save button */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onEditClick}
                        disabled={isEditingMode}
                        className="h-[44px] px-6 border-[1.5px] border-market-primary text-market-primary text-[14px] font-semibold rounded-[4px] hover:bg-market-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:border-[#D6D3D1] disabled:text-[#A8A29E]"
                    >
                        Cập nhật thông tin
                    </button>
                    <button
                        id="profile-save-btn"
                        type="button"
                        onClick={onSave}
                        disabled={!isEditingMode || isSaving}
                        className="h-[44px] px-8 bg-market-primary text-white text-[14px] font-semibold rounded-[4px] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSaving && (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}
                        {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                    </button>
                </div>
            </div>
        </div>
    );
};
