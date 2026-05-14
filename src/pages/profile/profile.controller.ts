import { useState, useEffect } from "react";
import type { UpdateProfileRequest } from "../../features/user/dto/updateProfile.type";
import { useProfileStore } from "./profile.store";

export const useProfileController = () => {
    const {
        user,
        formData,
        setFormData,
        isSaving,
        wishlistItems,
        wishlistPagination,
        isLoadingWishlist,
        loadProfile,
        loadWishlist,
        saveProfile
    } = useProfileStore();

    const [activeTab, setActiveTab] = useState<"info" | "wishlist">("info");
    const [wishlistPage, setWishlistPage] = useState(1);
    const [isEditingMode, setIsEditingMode] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        if (activeTab === "wishlist") {
            loadWishlist(wishlistPage);
        }
    }, [activeTab, wishlistPage]);

    const handleFieldChange = (field: keyof UpdateProfileRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = async () => {
        const success = await saveProfile();
        if (success) {
            setIsEditingMode(false);
        }
    };

    const handleEditClick = () => {
        setIsEditingMode(true);
    };

    const handleWishlistPageChange = (page: number) => {
        setWishlistPage(page);
    };

    return {
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
    };
};
