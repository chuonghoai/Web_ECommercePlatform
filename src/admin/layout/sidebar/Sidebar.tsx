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
        <nav className="bg-primary-container text-primary flex flex-col h-full py-lg px-md fixed left-0 top-0 w-64 border-r-[1.5px] border-outline-variant transition-all duration-200 ease-in-out z-50">
            <div className="mb-xl px-sm flex items-center gap-sm">
                <h1 className="font-headline-lg text-headline-lg italic text-on-surface">marketnest</h1>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-sm px-sm uppercase tracking-widest">Artisan Dashboard</p>
            <ul className="flex flex-col gap-unit flex-1 overflow-y-auto no-scrollbar">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`flex items-center gap-md px-md py-sm rounded-lg hover:translate-y-[-2px] transition-transform duration-200 ${isActive ? 'text-on-primary-fixed bg-secondary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                                <span className="font-label-md text-label-md">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div className="mt-auto pt-md border-t-[1.5px] border-outline-variant/30">
                <ul className="flex flex-col gap-unit">
                    <li>
                        <Link to="/admin/support" className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-on-surface hover:translate-y-[-2px] transition-transform duration-200">
                            <span className="material-symbols-outlined">help</span>
                            <span className="font-label-md text-label-md">Support</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/documentation" className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:text-on-surface hover:translate-y-[-2px] transition-transform duration-200">
                            <span className="material-symbols-outlined">description</span>
                            <span className="font-label-md text-label-md">Documentation</span>
                        </Link>
                    </li>
                </ul>
                <div className="mt-md flex items-center gap-md px-md">
                    <img alt="User profile" className="w-8 h-8 rounded-full border-[1.5px] border-brand-tan object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbO_7Cc4RxMzu8jEJy7FNBRbAFJb8j0ygsoayljk-lOxADi51uZNmAaEpmkv7SeXke9h-Td1PMOW63NLYTjh6VP0W8UQ2--Bpzg-to4hMVEUvNf4DBRpyTqMG5Qqcste76Y5i44XYDH54CiocAqehTI3WpOEGD09q9ibglFE0rooDUYryZZ6U2uz7Wfnw831FEH_G_Op7USb6kCtK5ZzyCudghuv1GIgQ9G_ui24JFxHI1IX6hD8p525UidrtmXDRxd30bcYbK5dmq" />
                    <div>
                        <p className="font-label-sm text-label-sm text-on-surface">Eleanor Vance</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Artisan Director</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};
