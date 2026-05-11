import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userStorageService } from "../../../features/user/services/userStorage.service";
import type { User } from "../../../features/user/models/user.model";
import { useCart } from "../../../features/cart/contexts/CartProvider";
import { useToast } from "../../toast/toast";
import { AuthService } from "../../../features/auth/services/auth.service";

const authService = new AuthService();

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const { cartCount } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = userStorageService.getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    toast("Đăng xuất thành công", "info");
    navigate("/");
  };

  const handleNavigateProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="bg-white border-b border-[#E7E5E4] sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-['Lora',serif] text-[24px] font-bold text-[#1C1917] flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-market-secondary flex items-center justify-center text-white text-[14px] italic shadow-none">MN</div>
          MarketNest
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-[480px] mx-8 relative">
          <input
            type="text"
            placeholder="Tìm kiếm tác phẩm thủ công, nghệ nhân..."
            className="w-full bg-market-background border-[1.5px] border-[#D6D3D1] rounded-[4px] h-[42px] px-4 pr-12 text-[15px] font-['Open_Sans',sans-serif] outline-none focus:border-market-primary focus:ring-[3px] focus:ring-market-primary/15 transition-all text-[#1C1917] placeholder:text-[#A8A29E]"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#A8A29E] hover:text-market-primary transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex gap-6 text-[15px] font-semibold text-[#57534E]">
            <Link to="/" className="hover:text-market-primary transition-colors">Khám phá</Link>
            <Link to="/categories" className="hover:text-market-primary transition-colors">Danh mục</Link>
          </nav>

          <div className="flex items-center gap-5 border-l border-[#E7E5E4] pl-6">
            {/* Cart button */}
            <Link to="/cart" className="relative text-[#57534E] hover:text-market-primary transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-market-primary text-white text-[10px] font-bold min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* User info || login button */}
            {user ? (
              <div className="relative group flex items-center gap-3 cursor-pointer py-2">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-9 h-9 rounded-full object-cover border-[1.5px] border-[#D6D3D1] group-hover:border-market-primary transition-colors"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-market-secondary flex items-center justify-center text-white font-bold text-[14px]">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-[14px] font-semibold text-[#1C1917] group-hover:text-market-primary transition-colors">
                  {user.fullName}
                </span>

                <div className="absolute top-full right-0 mt-1 w-[200px] bg-white border border-[#D6D3D1] rounded-[4px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-100 shadow-[0_8px_24px_rgba(28,25,23,0.1)]">
                  <div className="flex flex-col py-1">
                    <Link to="/profile" className="flex items-center h-[48px] px-4 text-[14px] font-medium text-[#1C1917] hover:bg-market-background transition-colors">
                      Thông tin cá nhân
                    </Link>
                    <Link to="/settings" className="flex items-center h-[48px] px-4 text-[14px] font-medium text-[#1C1917] hover:bg-market-background transition-colors border-t border-[#E7E5E4]">
                      Cài đặt
                    </Link>
                    <button onClick={handleLogout} className="flex items-center w-full h-[48px] px-4 text-[14px] font-semibold text-market-error hover:bg-market-background transition-colors border-t border-[#E7E5E4] text-left">
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-[14px] font-semibold text-market-primary border-[1.5px] border-market-primary px-4 py-1.5 rounded-[4px] hover:bg-market-background transition-colors">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};