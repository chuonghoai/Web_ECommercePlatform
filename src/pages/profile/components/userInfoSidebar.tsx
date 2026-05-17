import type { User } from "../../../features/user/models/user.model";
import type { UpdateProfileRequest } from "../../../features/user/dto/updateProfile.type";

interface UserInfoSidebarProps {
    user: User | null;
    formData: UpdateProfileRequest;
    onEditClick: () => void;
}

const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Chưa cập nhật";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('vi-VN').format(date);
};

const getGenderLabel = (gender?: string) => {
    switch (gender) {
        case 'male': return 'Nam';
        case 'female': return 'Nữ';
        case 'other': return 'Khác';
        default: return 'Chưa cập nhật';
    }
};

export const UserInfoSidebar = ({
    user,
    formData,
    onEditClick,
}: UserInfoSidebarProps) => {
    return (
        <div className="bg-white border border-[#E7E5E4] rounded-[12px] p-8 flex flex-col items-center shadow-sm">
            {/* Avatar section - Enlarged */}
            <div className="relative mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md bg-stone-100">
                    {user?.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-market-secondary flex items-center justify-center text-white font-bold text-6xl">
                            {user?.fullName?.charAt(0)?.toUpperCase() ?? "U"}
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center w-full mb-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-1">{user?.fullName || "Người dùng"}</h2>
                <p className="text-stone-500 text-sm">{user?.email}</p>
            </div>

            {/* User Details */}
            <div className="w-full space-y-4 mb-8">
                <div className="flex flex-col gap-1 pb-3 border-b border-stone-100">
                    <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Số điện thoại</span>
                    <span className="text-stone-900 font-medium">{formData.phone || "Chưa cập nhật"}</span>
                </div>
                
                <div className="flex flex-col gap-1 pb-3 border-b border-stone-100">
                    <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Giới tính</span>
                    <span className="text-stone-900 font-medium">{getGenderLabel(formData.gender)}</span>
                </div>

                <div className="flex flex-col gap-1 pb-3 border-b border-stone-100">
                    <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Ngày sinh</span>
                    <span className="text-stone-900 font-medium">{formatDate(formData.dateOfBirth)}</span>
                </div>
            </div>

            <button
                onClick={onEditClick}
                className="w-full h-12 flex items-center justify-center gap-2 border-2 border-market-primary text-market-primary font-semibold rounded-lg hover:bg-market-primary/5 transition-all active:scale-[0.98]"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Cập nhật thông tin
            </button>
        </div>
    );
};
