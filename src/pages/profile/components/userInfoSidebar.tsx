import type { User } from "../../../features/user/models/user.model";
import type { UpdateProfileRequest } from "../../../features/user/dto/updateProfile.type";

interface UserInfoSidebarProps {
    user: User | null;
    formData: UpdateProfileRequest;
    onEditClick: () => void;
    onChangePasswordClick: () => void;
    onScrollToInfo: () => void;
    onScrollToWishlist: () => void;
}

type MenuItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: () => void;
    isDestructive?: boolean;
};

export const UserInfoSidebar = ({
    user,
    onEditClick,
    onChangePasswordClick,
    onScrollToInfo,
    onScrollToWishlist,
}: UserInfoSidebarProps) => {
    const menuItems: MenuItem[] = [
        {
            id: "info",
            label: "Thông tin cá nhân",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            action: onScrollToInfo,
        },
        {
            id: "edit-profile",
            label: "Chỉnh sửa thông tin cá nhân",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            ),
            action: onEditClick,
        },
        {
            id: "wishlist",
            label: "Wishlist / Yêu thích",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            action: onScrollToWishlist,
        },
        {
            id: "orders",
            label: "Theo dõi đơn hàng",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
            action: () => {},
        },
        {
            id: "address",
            label: "Quản lý địa chỉ",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            action: () => {},
        },
        {
            id: "password",
            label: "Đổi mật khẩu",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            action: onChangePasswordClick,
        },
        {
            id: "logout",
            label: "Đăng xuất",
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            ),
            action: () => {},
            isDestructive: true,
        },
    ];

    return (
        <div className="bg-white border border-[#E7E5E4] rounded-[16px] overflow-hidden shadow-sm">
            <div className="p-6 flex flex-col items-center border-b border-stone-100">
                <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] bg-stone-100">
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
                <h2 className="text-lg font-bold text-stone-900 text-center leading-tight">{user?.fullName || "Người dùng"}</h2>
                <p className="text-stone-400 text-xs mt-0.5 text-center">{user?.email}</p>
            </div>

            <nav className="p-3">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={item.action}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                            ${item.isDestructive
                                ? "text-red-500 hover:bg-red-50 hover:text-red-600"
                                : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                            }`}
                    >
                        <span className={`shrink-0 ${item.isDestructive ? "text-red-400" : "text-stone-500"}`}>
                            {item.icon}
                        </span>
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};
