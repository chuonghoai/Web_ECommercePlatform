import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { userStorageService } from "../../../features/user/services/userStorage.service";
import { EUserRole, type User } from "../../../features/user/models/user.model";

export const Sidebar = () => {
    const [user, setUser] = useState<User | null>(null);
    const location = useLocation();

    useEffect(() => {
        const loadUser = () => {
            const currentUser = userStorageService.getUser();
            setUser(currentUser);
        }

        loadUser();
        window.addEventListener("auth_changed", loadUser);

        return () => {
            window.removeEventListener("auth_changed", loadUser);
        }
    }, []);

    const navItems = [
        { path: "/admin", icon: "dashboard", label: "Tổng quan" },
        { path: "/admin/orders", icon: "shopping_cart", label: "Đơn hàng" },
        { path: "/admin/products", icon: "inventory_2", label: "Sản phẩm" },
        { path: "/admin/staff", icon: "people", label: "Nhân viên" },
        { path: "/admin/inventory", icon: "warehouse", label: "Kho hàng" },
        { path: "/admin/settings", icon: "settings", label: "Cài đặt" },
    ];

    return (
        <nav className="bg-background-page text-primary flex flex-col h-full py-6 px-4 fixed left-0 top-0 w-64 border-r-[1.5px] border-border-subtle transition-all duration-200 ease-in-out z-50">
            <div className="mb-8 px-2 flex items-center gap-2">
                <h1 className="font-headline text-2xl italic text-text-ink font-bold">MarketNest</h1>
            </div>
            <p className="font-body text-xs text-text-muted mb-2 px-2 uppercase tracking-widest font-semibold">Artisan Dashboard</p>
            <ul className="flex flex-col gap-1 flex-1 overflow-y-auto no-scrollbar">
                {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path) && (item.path !== '/admin' || location.pathname === '/admin' || location.pathname === '/admin/overview');
                    return (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center gap-4 px-4 py-2 rounded-lg hover:-translate-y-0.5 transition-transform duration-200 ${isActive ? 'text-primary-container bg-surface-container font-bold' : 'text-text-muted hover:text-text-ink'}`}
                            >
                                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                                <span className="font-body text-sm font-semibold">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="mt-auto pt-4 border-t-[1.5px] border-border-subtle">
                <ul className="flex flex-col gap-1">
                    <li>
                        <button className="flex items-center gap-4 px-4 py-2 text-text-muted hover:text-text-ink hover:-translate-y-0.5 transition-transform duration-200">
                            <span className="material-symbols-outlined">help</span>
                            <span className="font-body text-sm font-semibold">Hỗ trợ</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center gap-4 px-4 py-2 text-text-muted hover:text-text-ink hover:-translate-y-0.5 transition-transform duration-200">
                            <span className="material-symbols-outlined">description</span>
                            <span className="font-body text-sm font-semibold">Tài liệu</span>
                        </button>
                    </li>
                </ul>
                <div className="mt-4 flex items-center gap-4 px-4">
                    <img
                        alt="User profile"
                        className="w-8 h-8 rounded-full border-[1.5px] border-border-medium object-cover"
                        src={user?.avatarUrl || ""}
                    />
                    <div>
                        <span className="font-body text-sm font-semibold text-text-ink">{user?.fullName}</span>
                        <p className="font-body text-[10px] text-text-muted">{user?.role === EUserRole.ADMIN ? "Quản trị viên" : "Nhân viên"}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};
