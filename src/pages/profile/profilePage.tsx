import { useRef } from "react";
import { useProfileController } from "./profile.controller";
import { UserInfoSidebar } from "./components/userInfoSidebar";
import { WishlistTab } from "./components/wishlistTab";
import { ProfileInformationCard } from "./components/ProfileInformationCard";
import { ChangePasswordModal } from "./components/changePasswordModal";

function ProfilePage() {
    const {
        user,
        formData,
        isSaving,
        wishlistItems,
        wishlistPagination,
        wishlistPage,
        isLoadingWishlist,
        isEditMode,
        isChangePasswordOpen,
        handleFieldChange,
        handleEnterEdit,
        handleCancelEdit,
        handleSaveProfile,
        handleOpenChangePassword,
        handleCloseChangePassword,
        handleWishlistPageChange,
    } = useProfileController();

    const infoSectionRef = useRef<HTMLDivElement>(null);
    const wishlistSectionRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const avatarInitial = user?.fullName?.charAt(0)?.toUpperCase() ?? "U";

    return (
        <div className="w-full min-h-screen bg-stone-50/50">

            {/* Hero section */}
            <div className="relative w-full overflow-hidden bg-linear-to-br from-stone-100 via-stone-50 to-white border-b border-stone-200">
                <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-market-primary/5 pointer-events-none" />
                <div className="absolute -bottom-8 left-1/3 w-48 h-48 rounded-full bg-market-secondary/5 pointer-events-none" />

                <div className="max-w-400 mx-auto px-6 lg:px-10 py-10">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="shrink-0 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] bg-stone-100">
                            {user?.avatarUrl ? (
                                <img
                                    src={user.avatarUrl}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-market-secondary flex items-center justify-center text-white font-bold text-4xl select-none">
                                    {avatarInitial}
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="min-w-0">
                            <h1 className="font-['Lora',serif] text-2xl lg:text-3xl font-bold text-stone-900 leading-tight truncate">
                                {user?.fullName || "Người dùng"}
                            </h1>
                            <p className="text-stone-500 text-sm mt-1 truncate">{user?.email}</p>
                            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                                {user?.role && (
                                    <span className="inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-semibold bg-market-primary/10 text-market-primary border border-market-primary/20">
                                        {user.role === "ADMIN" ? "Quản trị viên" : user.role === "STAFF" ? "Nhân viên" : "Khách hàng"}
                                    </span>
                                )}
                                <span className="inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-500 border border-stone-200">
                                    Hồ sơ cá nhân
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-400 mx-auto px-6 lg:px-10 py-8">
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* Sidebar */}
                    <div className="w-full lg:w-65 xl:w-70 shrink-0 lg:sticky lg:top-22">
                        <UserInfoSidebar
                            user={user}
                            onChangePasswordClick={handleOpenChangePassword}
                            onScrollToInfo={() => scrollToSection(infoSectionRef)}
                            onScrollToWishlist={() => scrollToSection(wishlistSectionRef)}
                        />
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0 flex flex-col gap-6">

                        <div ref={infoSectionRef}>
                            <ProfileInformationCard
                                user={user}
                                formData={formData}
                                isEditMode={isEditMode}
                                isSaving={isSaving}
                                onFieldChange={handleFieldChange}
                                onEnterEdit={handleEnterEdit}
                                onSave={handleSaveProfile}
                                onCancel={handleCancelEdit}
                            />
                        </div>

                        <div
                            ref={wishlistSectionRef}
                            className="bg-white border border-border-subtle rounded-2xl p-6 shadow-sm"
                        >
                            <h2 className="font-['Lora',serif] text-lg font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
                                Danh sách yêu thích
                            </h2>
                            <WishlistTab
                                items={wishlistItems}
                                isLoading={isLoadingWishlist}
                                pagination={wishlistPagination}
                                currentPage={wishlistPage}
                                onPageChange={handleWishlistPageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onClose={handleCloseChangePassword}
            />
        </div>
    );
}

export default ProfilePage;
