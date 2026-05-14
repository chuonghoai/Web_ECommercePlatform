import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage/loginPage";
import RegisterPage from "../pages/auth/RegisterPage/registerPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage/forgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ForgotPasswordPage/resetPasswordPage";
import { MainLayout } from "../components/layout/MainLayout";
import MarketplacePage from "../pages/marketplace/marketplacePage";
import ProductPage from "../pages/product/productPage";
import CheckoutPage from "../pages/checkout/checkoutPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* MAIN */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<MarketplacePage />} />
                    <Route path="product/:id" element={<ProductPage />} />

                    {/* CHECKOUT */}
                    <Route path="checkout" element={<CheckoutPage />} />
                </Route>

                {/* AUTH */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* URL INVALID */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;