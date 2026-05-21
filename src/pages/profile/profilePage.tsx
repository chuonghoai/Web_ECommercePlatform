import { useRef } from "react";
import { useProfileController } from "./profile.controller";
import { UserInfoSidebar } from "./components/userInfoSidebar";
import { WishlistTab } from "./components/wishlistTab";
import { EditProfileModal } from "./components/editProfileModal";
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
        isEditModalOpen,
        isChangePasswordOpen,
        handleFieldChange,
        handleSaveProfile,
        handleEditClick,
        handleCloseModal,
        handleOpenChangePassword,
        handleCloseChangePassword,
        handleWishlistPageChange,
    } = useProfileController();

    const infoSectionRef = useRef<HTMLDivElement>(null);
    const wishlistSectionRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <div className="w-full px-[5%] py-8 mx-auto min-h-screen bg-stone-50/50">
            <div className="mb-8">
                <h1 className="font-['Lora',serif] text-[32px] font-semibold text-[#1C1917] leading-tight">
                    Hồ sơ cá nhân
                </h1>
                <p className="text-[15px] text-[#57534E] mt-1">
                    Quản lý thông tin và sản phẩm yêu thích của bạn.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 lg:sticky lg:top-[100px]">
                    <UserInfoSidebar
                        user={user}
                        formData={formData}
                        onEditClick={handleEditClick}
                        onChangePasswordClick={handleOpenChangePassword}
                        onScrollToInfo={() => scrollToSection(infoSectionRef)}
                        onScrollToWishlist={() => scrollToSection(wishlistSectionRef)}
                    />
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-8">
                    <div
                        ref={infoSectionRef}
                        className="bg-white border border-[#E7E5E4] rounded-[16px] p-6 lg:p-8 shadow-sm"
                    >
                        <h2 className="font-['Lora',serif] text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
                            Thông tin cá nhân
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Họ và tên</span>
                                <div className="h-11 px-4 flex items-center bg-stone-50 border border-stone-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-stone-900 text-sm font-medium">
                                    {formData.fullName || "Chưa cập nhật"}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Email</span>
                                <div className="h-11 px-4 flex items-center bg-stone-50 border border-stone-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-stone-900 text-sm font-medium">
                                    {user?.email || "Chưa cập nhật"}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Số điện thoại</span>
                                <div className="h-11 px-4 flex items-center bg-stone-50 border border-stone-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-stone-900 text-sm font-medium">
                                    {formData.phone || "Chưa cập nhật"}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Ngày sinh</span>
                                <div className="h-11 px-4 flex items-center bg-stone-50 border border-stone-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-stone-900 text-sm font-medium">
                                    {formData.dateOfBirth
                                        ? new Intl.DateTimeFormat("vi-VN").format(new Date(formData.dateOfBirth))
                                        : "Chưa cập nhật"}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Giới tính</span>
                                <div className="h-11 px-4 flex items-center bg-stone-50 border border-stone-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-stone-900 text-sm font-medium">
                                    {formData.gender === "male"
                                        ? "Nam"
                                        : formData.gender === "female"
                                        ? "Nữ"
                                        : formData.gender === "other"
                                        ? "Khác"
                                        : "Chưa cập nhật"}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={wishlistSectionRef}
                        className="bg-white border border-[#E7E5E4] rounded-[16px] p-6 lg:p-8 shadow-sm"
                    >
                        <h2 className="font-['Lora',serif] text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
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

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                formData={formData}
                isSaving={isSaving}
                onFieldChange={handleFieldChange}
                onSave={handleSaveProfile}
            />

            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onClose={handleCloseChangePassword}
            />
        </div>
    );
}

export default ProfilePage;
