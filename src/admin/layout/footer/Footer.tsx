import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-surface text-secondary w-full mt-auto border-t-[1px] border-outline-variant opacity-50 flex justify-between items-center px-margin-desktop py-lg transition-opacity duration-200 mt-xl">
            <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">Marketnest v2.4.0 • Built for Artisans</span>
            </div>
            <ul className="flex gap-lg">
                <li><Link className="font-body-sm text-body-sm text-on-tertiary-container hover:text-primary transition-colors duration-200" to="#">Support</Link></li>
                <li><Link className="font-body-sm text-body-sm text-on-tertiary-container hover:text-primary transition-colors duration-200" to="#">Documentation</Link></li>
                <li><Link className="font-body-sm text-body-sm text-on-tertiary-container hover:text-primary transition-colors duration-200" to="#">Terms of Service</Link></li>
            </ul>
        </footer>
    );
};
