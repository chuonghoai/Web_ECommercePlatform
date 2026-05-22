import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { useState } from "react";
import type { ReactNode } from "react";

export interface HeaderOptions {
    links?: { label: string; href: string; active?: boolean }[];
    showSearch?: boolean;
    rightActions?: ReactNode;
}

export const AdminLayout = () => {
    const [headerOptions, setHeaderOptions] = useState<HeaderOptions>({
        links: [{ label: 'Dashboard', href: '/admin', active: true }],
        showSearch: true,
        rightActions: null,
    });

    return (
        <div className="bg-primary-container text-on-surface font-body-md antialiased overflow-hidden flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64 overflow-hidden min-h-screen">
                <Header {...headerOptions} />
                <main className="flex-1 overflow-y-auto p-margin-desktop bg-primary-container flex flex-col">
                    <Outlet context={{ setHeaderOptions }} />
                    <Footer />
                </main>
            </div>
        </div>
    );
}