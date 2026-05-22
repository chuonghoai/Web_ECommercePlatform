import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    links?: { label: string; href: string; active?: boolean }[];
    showSearch?: boolean;
    rightActions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ links = [], showSearch = true, rightActions }) => {
    return (
        <header className="bg-surface-container-lowest text-primary docked full-width top-0 sticky z-40 border-b-[1.5px] border-outline-variant shadow-sm transition-all duration-200 ease-in-out flex justify-between items-center w-full px-margin-desktop py-md">
            <div className="flex items-center gap-xl">
                <nav className="flex gap-lg">
                    {links.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.href}
                            className={`font-label-md text-label-md transition-transform duration-200 ${
                                link.active
                                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                                    : 'text-on-surface-variant hover:text-on-surface hover:translate-y-[-2px]'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex items-center gap-lg">
                {showSearch && (
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-hover:text-primary transition-colors">search</span>
                        <input className="pl-10 pr-4 py-2 bg-primary-container border-[1px] border-brand-tan rounded-lg font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-on-surface transition-colors w-64 placeholder-on-surface-variant" placeholder="Search orders, products..." type="text" />
                    </div>
                )}
                <div className="flex items-center gap-md border-l-[1px] border-outline-variant pl-lg">
                    <button className="relative text-on-surface-variant hover:text-on-surface hover:translate-y-[-2px] transition-all">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-brand-orange rounded-full"></span>
                    </button>
                    {rightActions}
                </div>
            </div>
        </header>
    );
};
