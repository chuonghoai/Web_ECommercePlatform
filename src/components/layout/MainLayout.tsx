import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-market-background font-['Open_Sans',sans-serif]">
            <Header />

            <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 py-8">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};