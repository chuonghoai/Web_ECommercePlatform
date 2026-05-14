import { useProfileController } from "./profile.controller";
import { PersonalInfoTab } from "./components/personalInfoTab";
import { WishlistTab } from "./components/wishlistTab";

const tabs = [
    { key: "info" as const, label: "Thông tin cá nhân" },
    { key: "wishlist" as const, label: "Sản phẩm yêu thích" },
];

function ProfilePage() {
    const {
        activeTab,
        setActiveTab,
        user,
        formData,
        isSaving,
        wishlistItems,
        wishlistPagination,
        wishlistPage,
        isLoadingWishlist,
        isEditingMode,
        handleFieldChange,
        handleSaveProfile,
        handleEditClick,
        handleWishlistPageChange,
    } = useProfileController();

    return (
        <div className="max-w-[900px] mx-auto pb-12">
            {/* Page title */}
            <div className="mb-8">
                <h1 className="font-['Lora',serif] text-[32px] font-semibold text-[#1C1917] leading-tight">
                    Hồ sơ cá nhân
                </h1>
                <p className="text-[15px] text-[#57534E] mt-1">
                    Quản lý thông tin và sản phẩm yêu thích của bạn.
                </p>
            </div>

            {/* Card container */}
            <div className="bg-white border border-[#E7E5E4] rounded-[8px] overflow-hidden">
                {/* Tab nav */}
                <div className="flex border-b border-[#E7E5E4]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            id={`profile-tab-${tab.key}`}
                            onClick={() => setActiveTab(tab.key)}
                            className={`relative h-[52px] px-6 text-[14px] font-semibold transition-colors ${
                                activeTab === tab.key
                                    ? "text-market-primary"
                                    : "text-[#57534E] hover:text-[#1C1917] hover:bg-market-background"
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.key && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-market-primary rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div className="p-6 md:p-8">
                    {activeTab === "info" && (
                        <PersonalInfoTab
                            user={user}
                            formData={formData}
                            isSaving={isSaving}
                            isEditingMode={isEditingMode}
                            onFieldChange={handleFieldChange}
                            onSave={handleSaveProfile}
                            onEditClick={handleEditClick}
                        />
                    )}

                    {activeTab === "wishlist" && (
                        <WishlistTab
                            items={wishlistItems}
                            isLoading={isLoadingWishlist}
                            pagination={wishlistPagination}
                            currentPage={wishlistPage}
                            onPageChange={handleWishlistPageChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
