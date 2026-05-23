import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage/loginPage";
import RegisterPage from "../pages/auth/RegisterPage/registerPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage/forgotPassword/forgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ForgotPasswordPage/resetPassword/resetPasswordPage";
import { MainLayout } from "../components/layout/MainLayout";
import MarketplacePage from "../pages/marketplace/marketplacePage";
import ProductPage from "../pages/product/productPage";
import CheckoutPage from "../pages/order-checkout/checkoutPage";
import ProfilePage from "../pages/profile/profilePage";
import CartPage from "../pages/cart/CartPage";
import AuthGuard from "../core/auth/auth.guard";
import { AdminLayout } from "../admin/layout/AdminLayout";
import { DashboardPage } from "../admin/pages/overview/Dashboard";
import { CartProvider } from "../features/cart/contexts/CartContext";
import { EUserRole } from "../features/user/models/user.model";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* MAIN */}
                <Route path="/" element={
                    <AuthGuard requireAuth={false} allowedRoles={[EUserRole.USER]}>
                        <CartProvider>
                            <MainLayout />
                        </CartProvider>
                    </AuthGuard>
                }>
                    <Route index element={<MarketplacePage />} />
                    <Route path="product/:id" element={<ProductPage />} />
                    {/* CART */}
                    <Route path="cart" element={
                        <AuthGuard requireAuth={true} allowedRoles={[EUserRole.USER]}>
                            <CartPage />
                        </AuthGuard>
                    } />

                    {/* ORDER-CHECKOUT */}
                    <Route path="order/checkout" element={
                        <AuthGuard requireAuth={true} allowedRoles={[EUserRole.USER]}>
                            <CheckoutPage />
                        </AuthGuard>
                    } />

                    {/* PROFILE */}
                    <Route path="profile" element={
                        <AuthGuard requireAuth={true} allowedRoles={[EUserRole.USER]}>
                            <ProfilePage />
                        </AuthGuard>
                    } />
                </Route>

                {/* ADMIN & STAFF */}
                <Route path="/admin" element={
                    <AuthGuard requireAuth={true} allowedRoles={[EUserRole.ADMIN, EUserRole.STAFF]}>
                        <AdminLayout />
                    </AuthGuard>
                }>
                    <Route index element={<Navigate to="/admin/overview" replace />} />
                    <Route path="overview" element={<DashboardPage />} />
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