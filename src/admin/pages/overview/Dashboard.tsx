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
                <button className="btn-primary font-body text-sm font-semibold px-4 py-2 hover:-translate-y-[2px]">
                    Export Report
                </button>
            )
        });
    }, [setHeaderOptions]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 w-full pb-8">
            {/* Page Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="font-headline text-4xl font-semibold text-text-ink">Overview</h2>
                    <p className="font-body text-lg text-text-muted mt-2">Welcome back. Here is the performance of your artisan collections.</p>
                </div>
                <div className="flex items-center gap-2 bg-surface-card border-[1px] border-border-subtle rounded-lg px-3 py-1.5 cursor-pointer hover:border-border-medium transition-colors">
                    <span className="material-symbols-outlined text-[18px] text-text-muted">calendar_today</span>
                    <span className="font-body text-xs font-semibold text-text-ink">Last 30 Days</span>
                    <span className="material-symbols-outlined text-[18px] text-text-muted">arrow_drop_down</span>
                </div>
            </div>

            {/* Hero KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface-card border-[1px] border-border-subtle rounded-xl p-6 border-t-4 border-t-primary-container hover:translate-y-[-2px] hover:border-border-medium transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[48px]">account_balance_wallet</span>
                    </div>
                    <p className="font-body text-xs font-semibold text-text-muted tracking-widest uppercase">Total Revenue</p>
                    <h3 className="font-headline text-3xl font-semibold text-text-ink mt-2">$124,500</h3>
                    <div className="flex items-center gap-1 mt-4">
                        <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">arrow_upward</span>
                        <span className="font-body text-xs font-semibold text-[#4d7c0f]">12.5%</span>
                        <span className="font-body text-sm text-text-muted ml-2">vs last month</span>
                    </div>
                </div>
                <div className="bg-surface-card border-[1px] border-border-subtle rounded-xl p-6 border-t-4 border-t-primary-container hover:translate-y-[-2px] hover:border-border-medium transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[48px]">shopping_bag</span>
                    </div>
                    <p className="font-body text-xs font-semibold text-text-muted tracking-widest uppercase">Orders</p>
                    <h3 className="font-headline text-3xl font-semibold text-text-ink mt-2">1,248</h3>
                    <div className="flex items-center gap-1 mt-4">
                        <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">arrow_upward</span>
                        <span className="font-body text-xs font-semibold text-[#4d7c0f]">8.2%</span>
                        <span className="font-body text-sm text-text-muted ml-2">vs last month</span>
                    </div>
                </div>
                <div className="bg-surface-card border-[1px] border-border-subtle rounded-xl p-6 border-t-4 border-t-primary-container hover:translate-y-[-2px] hover:border-border-medium transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[48px]">monitoring</span>
                    </div>
                    <p className="font-body text-xs font-semibold text-text-muted tracking-widest uppercase">Conversion</p>
                    <h3 className="font-headline text-3xl font-semibold text-text-ink mt-2">3.4%</h3>
                    <div className="flex items-center gap-1 mt-4">
                        <span className="material-symbols-outlined text-[16px] text-error">arrow_downward</span>
                        <span className="font-body text-xs font-semibold text-error">1.1%</span>
                        <span className="font-body text-sm text-text-muted ml-2">vs last month</span>
                    </div>
                </div>
                <div className="bg-surface-card border-[1px] border-border-subtle rounded-xl p-6 border-t-4 border-t-primary-container hover:translate-y-[-2px] hover:border-border-medium transition-all duration-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[48px]">group</span>
                    </div>
                    <p className="font-body text-xs font-semibold text-text-muted tracking-widest uppercase">Returning Users</p>
                    <h3 className="font-headline text-3xl font-semibold text-text-ink mt-2">42%</h3>
                    <div className="flex items-center gap-1 mt-4">
                        <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">arrow_upward</span>
                        <span className="font-body text-xs font-semibold text-[#4d7c0f]">5.4%</span>
                        <span className="font-body text-sm text-text-muted ml-2">vs last month</span>
                    </div>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-surface-card border-[1px] border-border-subtle rounded-xl p-6 hover:translate-y-[-2px] transition-transform duration-200">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-body text-sm font-semibold text-text-ink tracking-widest uppercase">Revenue Overview</h3>
                        <button className="material-symbols-outlined text-text-muted hover:text-text-ink">more_horiz</button>
                    </div>
                    <div className="relative w-full h-[300px]">
                        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between font-body text-xs font-semibold text-text-muted">
                            <span>$150k</span>
                            <span>$100k</span>
                            <span>$50k</span>
                            <span>$0</span>
                        </div>
                        <div className="absolute left-12 right-0 top-2 bottom-8">
                            <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                                <line className="chart-grid stroke-border-subtle stroke-1 opacity-50" strokeDasharray="4" x1="0" x2="100" y1="0" y2="0"></line>
                                <line className="chart-grid stroke-border-subtle stroke-1 opacity-50" strokeDasharray="4" x1="0" x2="100" y1="33" y2="33"></line>
                                <line className="chart-grid stroke-border-subtle stroke-1 opacity-50" strokeDasharray="4" x1="0" x2="100" y1="66" y2="66"></line>
                                <line className="chart-grid stroke-border-subtle stroke-1 opacity-50" strokeDasharray="4" x1="0" x2="100" y1="100" y2="100"></line>
                                <path className="chart-line stroke-primary-container stroke-2 fill-none" d="M0 80 Q 10 70, 20 75 T 40 40 T 60 50 T 80 20 T 100 10"></path>
                                <circle className="chart-point fill-primary-container stroke-white stroke-2" cx="0" cy="80" r="4"></circle>
                                <circle className="chart-point fill-primary-container stroke-white stroke-2" cx="20" cy="75" r="4"></circle>
                                <circle className="chart-point fill-primary-container stroke-white stroke-2" cx="40" cy="40" r="4"></circle>
                                <circle className="chart-point fill-primary-container stroke-white stroke-2" cx="60" cy="50" r="4"></circle>
                                <circle className="chart-point fill-primary-container stroke-white stroke-2" cx="80" cy="20" r="4"></circle>
                                <circle className="chart-point fill-primary-container stroke-white stroke-2" cx="100" cy="10" r="4"></circle>
                            </svg>
                        </div>
                        <div className="absolute left-12 right-0 bottom-0 flex justify-between font-body text-xs font-semibold text-text-muted pt-2 border-t-[1px] border-border-subtle">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="bg-surface-card border-[1px] border-border-subtle rounded-xl p-6 flex-1 hover:translate-y-[-2px] transition-transform duration-200">
                        <h3 className="font-body text-sm font-semibold text-text-ink tracking-widest uppercase mb-4">Top Categories</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between pb-2 border-b-[1px] border-border-subtle">
                                <span className="font-body text-base text-text-ink">Ceramics</span>
                                <span className="font-body text-sm font-semibold text-text-ink">45%</span>
                            </li>
                            <li className="flex items-center justify-between pb-2 border-b-[1px] border-border-subtle">
                                <span className="font-body text-base text-text-ink">Textiles</span>
                                <span className="font-body text-sm font-semibold text-text-ink">28%</span>
                            </li>
                            <li className="flex items-center justify-between pb-2 border-b-[1px] border-border-subtle">
                                <span className="font-body text-base text-text-ink">Woodwork</span>
                                <span className="font-body text-sm font-semibold text-text-ink">15%</span>
                            </li>
                            <li className="flex items-center justify-between pb-2">
                                <span className="font-body text-base text-text-ink">Glass</span>
                                <span className="font-body text-sm font-semibold text-text-ink">12%</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-surface-card border-[1px] border-border-subtle rounded-xl p-6 flex-1 hover:translate-y-[-2px] transition-transform duration-200">
                        <h3 className="font-body text-sm font-semibold text-text-ink tracking-widest uppercase mb-4">Trending</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-surface-container border-[1px] border-border-subtle rounded-md overflow-hidden">
                                    <img alt="Ceramic vase" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi7OgsYmg32QCIVbqYS3_0KF2kh7c1yS6I06M3tolKO_iA6ax03SULOSgwnD0Z3wX4Fx2TAN2YVCeOEnglUuyU4MXxoZOFcmGr_wdwFK00jOvCPU7-j9k5jdcQITyKRLKevO7JZJuifsW4sRkKkYqos36y-8XlDkAi6m6OgPBja-6v8NOpE3opyOa6Y5QP_31oOXh5wecxj1JeHPmJsRpqzKHt_cWcDLfKS-SY-Y7Cbzkwh-9LLUL6haB5FzpgJiEcMS0GylT9ORMn" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-body text-xs font-semibold text-text-ink">Speckled Vase</p>
                                    <p className="font-body text-sm text-text-muted">$85.00</p>
                                </div>
                                <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">trending_up</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-surface-container border-[1px] border-border-subtle rounded-md overflow-hidden">
                                    <img alt="Linen throw" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Jc-2t68rrME7fO1Es2elfR9UBDuUH_dvuJbjIltO3EBDFwcuKJJdp1ndStQEJGRsOnAH_47P6qM40oHfrRtKzcn2M9Xg9uPZ7zE4QRCO2y8k71PPnL9s6r2eDM_QcU8AtF2l9GUHpqbo48jCgwlCQmo7ZTJwsyXW4Pw6qRr8uwn29QTKLAXnoqM65XPyzt0Mr7bQxOPW6P1LBsIkl3PYXRxdxB6wmx-7cqOgi_KRMzuqui2m87eqxCUf_J_cGU1ETMrJmMKRZVoU" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-body text-xs font-semibold text-text-ink">Linen Throw</p>
                                    <p className="font-body text-sm text-text-muted">$120.00</p>
                                </div>
                                <span className="material-symbols-outlined text-[16px] text-[#4d7c0f]">trending_up</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Product Performance Table */}
            <div className="bg-surface-card border-[1px] border-border-subtle rounded-xl p-6 hover:translate-y-[-2px] transition-transform duration-200">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-body text-sm font-semibold text-text-ink tracking-widest uppercase">Product Performance</h3>
                    <button className="font-body text-xs font-semibold text-text-muted hover:text-text-ink underline">View All</button>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="font-body text-xs font-semibold text-text-muted tracking-widest uppercase pb-2 border-b-[1.5px] border-border-medium">Product</th>
                                <th className="font-body text-xs font-semibold text-text-muted tracking-widest uppercase pb-2 border-b-[1.5px] border-border-medium px-4">Category</th>
                                <th className="font-body text-xs font-semibold text-text-muted tracking-widest uppercase pb-2 border-b-[1.5px] border-border-medium px-4">Sales</th>
                                <th className="font-body text-xs font-semibold text-text-muted tracking-widest uppercase pb-2 border-b-[1.5px] border-border-medium px-4">Status</th>
                                <th className="font-body text-xs font-semibold text-text-muted tracking-widest uppercase pb-2 border-b-[1.5px] border-border-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="font-body text-base text-text-ink">
                            <tr className="hover:bg-surface-container transition-colors border-b-[1px] border-border-subtle">
                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-surface-card border-[1px] border-border-subtle rounded overflow-hidden">
                                            <img alt="Ceramic vase" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd38akPQyIUsOtGSfLmYWODcn6-tRy_VOjLr-vTNajEmCMbFlijCcZYKy2vm3yaZ0uJXATQNgEEroQUNZomO38EGjqAUscmFfPXurh10cpoLYAWAZn0m08xqQpn9aQH3xg8iXgFAZSi76Ug8Fm9xDH7clOyu-8WMJThaut4GXhb-dorFMK3ThCxDD3U9Zzeio231ph9_0uXMGYJaf123FY2IyREUx87HQH8Bd7YHqhq8VkcR7lXIAS35TBPLifast-IqTiJh403ZMn" />
                                        </div>
                                        <span className="font-headline text-lg font-semibold leading-tight text-text-ink">Speckled Vase</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-text-muted">Ceramics</td>
                                <td className="py-4 px-4">342</td>
                                <td className="py-4 px-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dcfce7] text-[#166534] font-body text-[11px] font-semibold tracking-wider uppercase border-[1px] border-[#86efac]">In Stock</span>
                                </td>
                                <td className="py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="btn-secondary font-body text-xs font-semibold px-3 py-1.5 hover:-translate-y-[2px]">View Details</button>
                                        <button className="text-text-muted hover:text-text-ink p-1"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-surface-container transition-colors border-b-[1px] border-border-subtle">
                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-surface-card border-[1px] border-border-subtle rounded overflow-hidden">
                                            <img alt="Linen throw" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM5WL4lnjZ4Mizzc4RW4y4jK9zmJy9tiVxGzvJ81TsDSOYeEO0g6hd1CLZbw8dALnv3t5g5AczQFdjiIngDq6umgffVtJGXnEvEdlQMEa6zN-hfTtw_CIhQP4tUdCGBcZs11axU89o_eEd9SOcJRCInsjhXucTrqzee3x4lJ7-0luBeUG3eQ00zPbkobLdLNS_3XPNe4OKmO7hBt1TLETBSw8KIJFsvH8Gg_qfN0PeItPoA-AuQ1fPrEn6ez7USKXSXyzrPbCwlGYk" />
                                        </div>
                                        <span className="font-headline text-lg font-semibold leading-tight text-text-ink">Linen Throw</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-text-muted">Textiles</td>
                                <td className="py-4 px-4">215</td>
                                <td className="py-4 px-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#fef08a] text-[#854d0e] font-body text-[11px] font-semibold tracking-wider uppercase border-[1px] border-[#fde047]">Low Stock</span>
                                </td>
                                <td className="py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="btn-secondary font-body text-xs font-semibold px-3 py-1.5 hover:-translate-y-[2px]">View Details</button>
                                        <button className="text-text-muted hover:text-text-ink p-1"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                    </div>
                                </td>
                            </tr>
                            <tr className="hover:bg-surface-container transition-colors border-b-[1px] border-border-subtle">
                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-surface-card border-[1px] border-border-subtle rounded overflow-hidden">
                                            <img alt="Walnut cutting board" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkyAamILVtAIZGZN1yyR-bg6WrN_1lZxyAbjtSrcQ5DTuLVOxdCSFJS_1JLauKsb2KuEgGvbUMaui54_wLmnNXDV3USQG-DzJmx_D1ts4GMgGj7cxPgWh-Zobw52mOez2fHBh1D4C4ZCA3MySaA37_1pbHQxSKY_drUkAJjaQb728PE154D-hLV9BrhszW8VisEj_W5xSwdKa4mYa5XaQjfLKYZ2K54CyPSXXNJp2YQMi60ot0UKdYLQJSOrPIWXAVdhbjve51DLkf" />
                                        </div>
                                        <span className="font-headline text-lg font-semibold leading-tight text-text-ink">Walnut Board</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-text-muted">Woodwork</td>
                                <td className="py-4 px-4">189</td>
                                <td className="py-4 px-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#fee2e2] text-error font-body text-[11px] font-semibold tracking-wider uppercase border-[1px] border-[#fecaca]">Out of Stock</span>
                                </td>
                                <td className="py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="btn-secondary font-body text-xs font-semibold px-3 py-1.5 hover:-translate-y-[2px]">View Details</button>
                                        <button className="text-text-muted hover:text-text-ink p-1"><span className="material-symbols-outlined text-[20px]">edit</span></button>
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
