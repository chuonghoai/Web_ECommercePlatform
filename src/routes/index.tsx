import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage/loginPage";
import RegisterPage from "../pages/auth/RegisterPage/registerPage";
import { MainLayout } from "../components/layout/MainLayout";
import MarketplacePage from "../pages/marketplace/marketplacePage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* MAIN */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<MarketplacePage />} />
                </Route>

                {/* AUTH */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* URL INVALID */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;