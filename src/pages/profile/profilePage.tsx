import { useProfileController } from "./profile.controller";
import { UserInfoSidebar } from "./components/userInfoSidebar";
import { WishlistTab } from "./components/wishlistTab";
import { EditProfileModal } from "./components/editProfileModal";

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
        handleFieldChange,
        handleSaveProfile,
        handleEditClick,
        handleCloseModal,
        handleWishlistPageChange,
    } = useProfileController();

    return (
        <div className="w-full px-[5%] py-8 mx-auto min-h-screen bg-stone-50/50">
            {/* Page title */}
            <div className="mb-8">
                <h1 className="font-['Lora',serif] text-[32px] font-semibold text-[#1C1917] leading-tight">
                    Hồ sơ cá nhân
                </h1>
                <p className="text-[15px] text-[#57534E] mt-1">
                    Quản lý thông tin và sản phẩm yêu thích của bạn.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left column: Sticky User Info */}
                <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 lg:sticky lg:top-[100px]">
                    <UserInfoSidebar 
                        user={user}
                        formData={formData}
                        onEditClick={handleEditClick}
                    />
                </div>

                {/* Right column: Wishlist */}
                <div className="flex-1 min-w-0">
                    <div className="bg-white border border-[#E7E5E4] rounded-[12px] p-6 lg:p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
                            Sản phẩm yêu thích
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

            {/* Edit Modal */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={handleCloseModal}
                formData={formData}
                isSaving={isSaving}
                onFieldChange={handleFieldChange}
                onSave={handleSaveProfile}
            />
        </div>
    );
}

export default ProfilePage;
