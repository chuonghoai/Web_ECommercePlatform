import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-surface text-text-muted w-full mt-auto border-t-[1px] border-border-subtle opacity-75 flex justify-between items-center px-10 py-6 transition-opacity duration-200 mt-8">
            <div>
                <span className="font-body text-xs font-semibold uppercase tracking-widest text-text-ink">MarketNest v2.4.0 • Built for Artisans</span>
            </div>
            <ul className="flex gap-6">
                <li><Link className="font-body text-sm text-text-muted hover:text-primary transition-colors duration-200" to="#">Support</Link></li>
                <li><Link className="font-body text-sm text-text-muted hover:text-primary transition-colors duration-200" to="#">Documentation</Link></li>
                <li><Link className="font-body text-sm text-text-muted hover:text-primary transition-colors duration-200" to="#">Terms of Service</Link></li>
            </ul>
        </footer>
    );
};
