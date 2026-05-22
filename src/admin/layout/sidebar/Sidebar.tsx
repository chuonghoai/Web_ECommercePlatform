import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { path: "/admin", icon: "dashboard", label: "Overview" },
        { path: "/admin/orders", icon: "shopping_cart", label: "Orders" },
        { path: "/admin/products", icon: "inventory_2", label: "Products" },
        { path: "/admin/customers", icon: "group", label: "Customers" },
        { path: "/admin/analytics", icon: "analytics", label: "Analytics" },
        { path: "/admin/trends", icon: "trending_up", label: "Trends" },
        { path: "/admin/marketing", icon: "campaign", label: "Marketing" },
        { path: "/admin/inventory", icon: "warehouse", label: "Inventory" },
        { path: "/admin/settings", icon: "settings", label: "Settings" },
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
                                className={`flex items-center gap-4 px-4 py-2 rounded-lg hover:translate-y-[-2px] transition-transform duration-200 ${isActive ? 'text-primary-container bg-surface-container font-bold' : 'text-text-muted hover:text-text-ink'}`}
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
                        <Link to="/admin/support" className="flex items-center gap-4 px-4 py-2 text-text-muted hover:text-text-ink hover:translate-y-[-2px] transition-transform duration-200">
                            <span className="material-symbols-outlined">help</span>
                            <span className="font-body text-sm font-semibold">Support</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/documentation" className="flex items-center gap-4 px-4 py-2 text-text-muted hover:text-text-ink hover:translate-y-[-2px] transition-transform duration-200">
                            <span className="material-symbols-outlined">description</span>
                            <span className="font-body text-sm font-semibold">Documentation</span>
                        </Link>
                    </li>
                </ul>
                <div className="mt-4 flex items-center gap-4 px-4">
                    <img alt="User profile" className="w-8 h-8 rounded-full border-[1.5px] border-border-medium object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbO_7Cc4RxMzu8jEJy7FNBRbAFJb8j0ygsoayljk-lOxADi51uZNmAaEpmkv7SeXke9h-Td1PMOW63NLYTjh6VP0W8UQ2--Bpzg-to4hMVEUvNf4DBRpyTqMG5Qqcste76Y5i44XYDH54CiocAqehTI3WpOEGD09q9ibglFE0rooDUYryZZ6U2uz7Wfnw831FEH_G_Op7USb6kCtK5ZzyCudghuv1GIgQ9G_ui24JFxHI1IX6hD8p525UidrtmXDRxd30bcYbK5dmq" />
                    <div>
                        <p className="font-body text-sm font-semibold text-text-ink">Eleanor Vance</p>
                        <p className="font-body text-[10px] text-text-muted">Artisan Director</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};
