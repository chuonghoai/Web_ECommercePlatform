import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    links?: { label: string; href: string; active?: boolean }[];
    showSearch?: boolean;
    rightActions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ links = [], showSearch = true, rightActions }) => {
    return (
        <header className="bg-surface-card text-primary docked full-width top-0 sticky z-40 border-b border-border-subtle shadow-sm transition-all duration-200 ease-in-out flex justify-between items-center w-full px-10 py-4">
            <div className="flex items-center gap-8">
                <nav className="flex gap-6">
                    {links.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.href}
                            className={`font-body text-sm font-semibold transition-transform duration-200 ${
                                link.active
                                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                                    : 'text-text-muted hover:text-text-ink hover:-translate-y-0.5'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex items-center gap-6">
                {showSearch && (
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-hover:text-primary transition-colors">search</span>
                        <input className="input-field pl-10 pr-4 py-2 font-body text-sm text-text-ink w-64 placeholder-text-muted" placeholder="Search orders, products..." type="text" />
                    </div>
                )}
                <div className="flex items-center gap-4 border-l border-border-subtle pl-6">
                    <button className="relative text-text-muted hover:text-text-ink hover:-translate-y-0.5 transition-all">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-primary-container rounded-full"></span>
                    </button>
                    {rightActions}
                </div>
            </div>
        </header>
    );
};
