import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { HeaderOptions } from '../../layout/AdminLayout';

export const DashboardPage = () => {
    const { setHeaderOptions } = useOutletContext<{ setHeaderOptions: (options: HeaderOptions) => void }>();

    useEffect(() => {
        setHeaderOptions({
            links: [
                { label: 'Dashboard', href: '/admin', active: true },
                { label: 'Reports', href: '/admin/reports' }
            ],
            showSearch: true,
            rightActions: (
                <button className="bg-[#C2410C] text-on-primary font-label-md text-label-md px-4 py-2 rounded-lg hover:translate-y-[-2px] transition-transform duration-200">
                    Export Report
                </button>
            )
        });
    }, [setHeaderOptions]);

    return (
        <div className="max-w-7xl mx-auto space-y-xl w-full pb-xl">
            {/* Page Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="font-headline-xl text-headline-xl text-on-surface">Overview</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant mt-sm">Welcome back. Here is the performance of your artisan collections.</p>
                </div>
                <div className="flex items-center gap-sm bg-surface-container-lowest border-[1px] border-brand-tan rounded-lg px-3 py-1.5 cursor-pointer hover:border-on-surface transition-colors">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span className="font-label-sm text-label-sm">Last 30 Days</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
                </div>
            </div>

            {/* Hero KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                <div className="bg-surface-container-lowest border-[1.5px] border-brand-tan rounded-xl p-lg border-t-4 border-t-[#C2410C] hover:translate-y-[-2px] hover:border-on-surface-variant transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[48px]">account_balance_wallet</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">Total Revenue</p>
                    <h3 className="font-headline-lg text-headline-lg mt-sm">$124,500</h3>
                    <div className="flex items-center gap-xs mt-md">
                        <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">arrow_upward</span>
                        <span className="font-label-sm text-label-sm text-[#4d7c0f]">12.5%</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant ml-sm">vs last month</span>
                    </div>
                </div>
                <div className="bg-surface-container-lowest border-[1.5px] border-brand-tan rounded-xl p-lg border-t-4 border-t-[#C2410C] hover:translate-y-[-2px] hover:border-on-surface-variant transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[48px]">shopping_bag</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">Orders</p>
                    <h3 className="font-headline-lg text-headline-lg mt-sm">1,248</h3>
                    <div className="flex items-center gap-xs mt-md">
                        <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">arrow_upward</span>
                        <span className="font-label-sm text-label-sm text-[#4d7c0f]">8.2%</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant ml-sm">vs last month</span>
                    </div>
                </div>
                <div className="bg-surface-container-lowest border-[1.5px] border-brand-tan rounded-xl p-lg border-t-4 border-t-[#C2410C] hover:translate-y-[-2px] hover:border-on-surface-variant transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[48px]">monitoring</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">Conversion</p>
                    <h3 className="font-headline-lg text-headline-lg mt-sm">3.4%</h3>
                    <div className="flex items-center gap-xs mt-md">
                        <span className="material-symbols-outlined text-[16px] text-[#b91c1c]">arrow_downward</span>
                        <span className="font-label-sm text-label-sm text-[#b91c1c]">1.1%</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant ml-sm">vs last month</span>
                    </div>
                </div>
                <div className="bg-surface-container-lowest border-[1.5px] border-brand-tan rounded-xl p-lg border-t-4 border-t-[#C2410C] hover:translate-y-[-2px] hover:border-on-surface-variant transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-lg opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[48px]">group</span>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase">Returning Users</p>
                    <h3 className="font-headline-lg text-headline-lg mt-sm">42%</h3>
                    <div className="flex items-center gap-xs mt-md">
                        <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">arrow_upward</span>
                        <span className="font-label-sm text-label-sm text-[#4d7c0f]">5.4%</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant ml-sm">vs last month</span>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                <div className="lg:col-span-2 bg-surface-container-lowest border-[1.5px] border-brand-tan rounded-xl p-lg hover:translate-y-[-2px] transition-transform duration-200">
                    <div className="flex justify-between items-center mb-xl">
                        <h3 className="font-label-md text-label-md text-on-surface tracking-widest uppercase">Revenue Overview</h3>
                        <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface">more_horiz</button>
                    </div>
                    <div className="relative w-full h-[300px]">
                        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between font-label-sm text-label-sm text-on-surface-variant">
                            <span>$150k</span>
                            <span>$100k</span>
                            <span>$50k</span>
                            <span>$0</span>
                        </div>
                        <div className="absolute left-12 right-0 top-2 bottom-8">
                            <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                                <line className="chart-grid stroke-brand-tan stroke-1 opacity-30" strokeDasharray="4" x1="0" x2="100" y1="0" y2="0"></line>
                                <line className="chart-grid stroke-brand-tan stroke-1 opacity-30" strokeDasharray="4" x1="0" x2="100" y1="33" y2="33"></line>
                                <line className="chart-grid stroke-brand-tan stroke-1 opacity-30" strokeDasharray="4" x1="0" x2="100" y1="66" y2="66"></line>
                                <line className="chart-grid stroke-brand-tan stroke-1 opacity-30" strokeDasharray="4" x1="0" x2="100" y1="100" y2="100"></line>
                                <path className="chart-line stroke-brand-orange stroke-2 fill-none" d="M0 80 Q 10 70, 20 75 T 40 40 T 60 50 T 80 20 T 100 10"></path>
                                <circle className="chart-point fill-brand-orange stroke-white stroke-2" cx="0" cy="80" r="4"></circle>
                                <circle className="chart-point fill-brand-orange stroke-white stroke-2" cx="20" cy="75" r="4"></circle>
                                <circle className="chart-point fill-brand-orange stroke-white stroke-2" cx="40" cy="40" r="4"></circle>
                                <circle className="chart-point fill-brand-orange stroke-white stroke-2" cx="60" cy="50" r="4"></circle>
                                <circle className="chart-point fill-brand-orange stroke-white stroke-2" cx="80" cy="20" r="4"></circle>
                                <circle className="chart-point fill-brand-orange stroke-white stroke-2" cx="100" cy="10" r="4"></circle>
                            </svg>
                        </div>
                        <div className="absolute left-12 right-0 bottom-0 flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-sm border-t-[1px] border-brand-tan/50">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-gutter">
                    <div className="bg-surface-container-lowest border-[1.5px] border-brand-tan rounded-xl p-lg flex-1 hover:translate-y-[-2px] transition-transform duration-200">
                        <h3 className="font-label-md text-label-md text-on-surface tracking-widest uppercase mb-md">Top Categories</h3>
                        <ul className="space-y-md">
                            <li className="flex items-center justify-between pb-sm border-b-[1px] border-brand-tan/30">
                                <span className="font-body-md text-body-md text-on-surface">Ceramics</span>
                                <span className="font-label-md text-label-md text-on-surface">45%</span>
                            </li>
                            <li className="flex items-center justify-between pb-sm border-b-[1px] border-brand-tan/30">
                                <span className="font-body-md text-body-md text-on-surface">Textiles</span>
                                <span className="font-label-md text-label-md text-on-surface">28%</span>
                            </li>
                            <li className="flex items-center justify-between pb-sm border-b-[1px] border-brand-tan/30">
                                <span className="font-body-md text-body-md text-on-surface">Woodwork</span>
                                <span className="font-label-md text-label-md text-on-surface">15%</span>
                            </li>
                            <li className="flex items-center justify-between pb-sm">
                                <span className="font-body-md text-body-md text-on-surface">Glass</span>
                                <span className="font-label-md text-label-md text-on-surface">12%</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-surface-container-lowest border-[1.5px] border-brand-tan rounded-xl p-lg flex-1 hover:translate-y-[-2px] transition-transform duration-200">
                        <h3 className="font-label-md text-label-md text-on-surface tracking-widest uppercase mb-md">Trending</h3>
                        <ul className="space-y-sm">
                            <li className="flex items-center gap-md">
                                <div className="w-10 h-10 bg-primary-container border-[1px] border-brand-tan rounded-md overflow-hidden">
                                    <img alt="Ceramic vase" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi7OgsYmg32QCIVbqYS3_0KF2kh7c1yS6I06M3tolKO_iA6ax03SULOSgwnD0Z3wX4Fx2TAN2YVCeOEnglUuyU4MXxoZOFcmGr_wdwFK00jOvCPU7-j9k5jdcQITyKRLKevO7JZJuifsW4sRkKkYqos36y-8XlDkAi6m6OgPBja-6v8NOpE3opyOa6Y5QP_31oOXh5wecxj1JeHPmJsRpqzKHt_cWcDLfKS-SY-Y7Cbzkwh-9LLUL6haB5FzpgJiEcMS0GylT9ORMn" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-label-sm text-label-sm text-on-surface">Speckled Vase</p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">$85.00</p>
                                </div>
                                <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">trending_up</span>
                            </li>
                            <li className="flex items-center gap-md">
                                <div className="w-10 h-10 bg-primary-container border-[1px] border-brand-tan rounded-md overflow-hidden">
                                    <img alt="Linen throw" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Jc-2t68rrME7fO1Es2elfR9UBDuUH_dvuJbjIltO3EBDFwcuKJJdp1ndStQEJGRsOnAH_47P6qM40oHfrRtKzcn2M9Xg9uPZ7zE4QRCO2y8k71PPnL9s6r2eDM_QcU8AtF2l9GUHpqbo48jCgwlCQmo7ZTJwsyXW4Pw6qRr8uwn29QTKLAXnoqM65XPyzt0Mr7bQxOPW6P1LBsIkl3PYXRxdxB6wmx-7cqOgi_KRMzuqui2m87eqxCUf_J_cGU1ETMrJmMKRZVoU" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-label-sm text-label-sm text-on-surface">Linen Throw</p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">$120.00</p>
                                </div>
                                <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">trending_up</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Product Performance Table */}
            <div className="bg-surface-container-lowest border-[1.5px] border-brand-tan rounded-xl p-lg hover:translate-y-[-2px] transition-transform duration-200">
                <div className="flex justify-between items-center mb-xl">
                    <h3 className="font-label-md text-label-md text-on-surface tracking-widest uppercase">Product Performance</h3>
                    <button className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface underline">View All</button>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase pb-sm border-b-[1.5px] border-brand-tan">Product</th>
                                <th className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase pb-sm border-b-[1.5px] border-brand-tan px-md">Category</th>
                                <th className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase pb-sm border-b-[1.5px] border-brand-tan px-md">Sales</th>
                                <th className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase pb-sm border-b-[1.5px] border-brand-tan px-md">Status</th>
                                <th className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase pb-sm border-b-[1.5px] border-brand-tan text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="font-body-md text-body-md text-on-surface">
                            <tr className="hover:bg-primary-container/50 transition-colors border-b-[1px] border-brand-tan/50">
                                <td className="py-md pr-md">
                                    <div className="flex items-center gap-md">
                                        <div className="w-12 h-12 bg-surface border-[1px] border-brand-tan rounded overflow-hidden">
                                            <img alt="Ceramic vase" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd38akPQyIUsOtGSfLmYWODcn6-tRy_VOjLr-vTNajEmCMbFlijCcZYKy2vm3yaZ0uJXATQNgEEroQUNZomO38EGjqAUscmFfPXurh10cpoLYAWAZn0m08xqQpn9aQH3xg8iXgFAZSi76Ug8Fm9xDH7clOyu-8WMJThaut4GXhb-dorFMK3ThCxDD3U9Zzeio231ph9_0uXMGYJaf123FY2IyREUx87HQH8Bd7YHqhq8VkcR7lXIAS35TBPLifast-IqTiJh403ZMn" />
                                        </div>
                                        <span className="font-headline-md text-[18px] leading-tight">Speckled Vase</span>
                                    </div>
                                </td>
                                <td className="py-md px-md text-on-surface-variant">Ceramics</td>
                                <td className="py-md px-md">342</td>
                                <td className="py-md px-md">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dcfce7] text-[#166534] font-label-sm text-[11px] tracking-wider uppercase border-[1px] border-[#86efac]">In Stock</span>
                                </td>
                                <td className="py-md text-right">
                                    <div className="flex items-center justify-end gap-sm">
                                        <button className="bg-surface-container-lowest border-[1.5px] border-brand-tan text-on-surface font-label-sm px-3 py-1.5 rounded-lg hover:translate-y-[-2px] transition-transform">View Details</button>
                                        <button className="text-on-surface-variant hover:text-on-surface p-1"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary-container/50 transition-colors border-b-[1px] border-brand-tan/50">
                                <td className="py-md pr-md">
                                    <div className="flex items-center gap-md">
                                        <div className="w-12 h-12 bg-surface border-[1px] border-brand-tan rounded overflow-hidden">
                                            <img alt="Linen throw" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM5WL4lnjZ4Mizzc4RW4y4jK9zmJy9tiVxGzvJ81TsDSOYeEO0g6hd1CLZbw8dALnv3t5g5AczQFdjiIngDq6umgffVtJGXnEvEdlQMEa6zN-hfTtw_CIhQP4tUdCGBcZs11axU89o_eEd9SOcJRCInsjhXucTrqzee3x4lJ7-0luBeUG3eQ00zPbkobLdLNS_3XPNe4OKmO7hBt1TLETBSw8KIJFsvH8Gg_qfN0PeItPoA-AuQ1fPrEn6ez7USKXSXyzrPbCwlGYk" />
                                        </div>
                                        <span className="font-headline-md text-[18px] leading-tight">Linen Throw</span>
                                    </div>
                                </td>
                                <td className="py-md px-md text-on-surface-variant">Textiles</td>
                                <td className="py-md px-md">215</td>
                                <td className="py-md px-md">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#fef08a] text-[#854d0e] font-label-sm text-[11px] tracking-wider uppercase border-[1px] border-[#fde047]">Low Stock</span>
                                </td>
                                <td className="py-md text-right">
                                    <div className="flex items-center justify-end gap-sm">
                                        <button className="bg-surface-container-lowest border-[1.5px] border-brand-tan text-on-surface font-label-sm px-3 py-1.5 rounded-lg hover:translate-y-[-2px] transition-transform">View Details</button>
                                        <button className="text-on-surface-variant hover:text-on-surface p-1"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-primary-container/50 transition-colors border-b-[1px] border-brand-tan/50">
                                <td className="py-md pr-md">
                                    <div className="flex items-center gap-md">
                                        <div className="w-12 h-12 bg-surface border-[1px] border-brand-tan rounded overflow-hidden">
                                            <img alt="Walnut cutting board" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkyAamILVtAIZGZN1yyR-bg6WrN_1lZxyAbjtSrcQ5DTuLVOxdCSFJS_1JLauKsb2KuEgGvbUMaui54_wLmnNXDV3USQG-DzJmx_D1ts4GMgGj7cxPgWh-Zobw52mOez2fHBh1D4C4ZCA3MySaA37_1pbHQxSKY_drUkAJjaQb728PE154D-hLV9BrhszW8VisEj_W5xSwdKa4mYa5XaQjfLKYZ2K54CyPSXXNJp2YQMi60ot0UKdYLQJSOrPIWXAVdhbjve51DLkf" />
                                        </div>
                                        <span className="font-headline-md text-[18px] leading-tight">Walnut Board</span>
                                    </div>
                                </td>
                                <td className="py-md px-md text-on-surface-variant">Woodwork</td>
                                <td className="py-md px-md">189</td>
                                <td className="py-md px-md">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#fee2e2] text-[#991b1b] font-label-sm text-[11px] tracking-wider uppercase border-[1px] border-[#fecaca]">Out of Stock</span>
                                </td>
                                <td className="py-md text-right">
                                    <div className="flex items-center justify-end gap-sm">
                                        <button className="bg-surface-container-lowest border-[1.5px] border-brand-tan text-on-surface font-label-sm px-3 py-1.5 rounded-lg hover:translate-y-[-2px] transition-transform">View Details</button>
                                        <button className="text-on-surface-variant hover:text-on-surface p-1"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
