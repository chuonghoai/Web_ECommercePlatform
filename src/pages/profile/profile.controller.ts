import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
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

    const [searchParams, setSearchParams] = useSearchParams();

    const currentUrlState = useMemo(() => {
        return {
            page: Number(searchParams.get("page")) || 1,
        };
    }, [searchParams]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        loadWishlist(currentUrlState.page);
    }, [currentUrlState.page]);

    const handleFieldChange = (field: keyof UpdateProfileRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = async () => {
        const success = await saveProfile();
        if (success) {
            setIsEditModalOpen(false);
        }
    };

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        if (user) {
            setFormData({
                fullName: user.fullName,
                phone: formData.phone,
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
            });
        }
    };

    const handleOpenChangePassword = () => {
        setIsChangePasswordOpen(true);
    };

    const handleCloseChangePassword = () => {
        setIsChangePasswordOpen(false);
    };

    const handleWishlistPageChange = (newPage: number) => {
        if (wishlistPagination && newPage >= 1 && newPage <= wishlistPagination.totalPages) {
            searchParams.set("page", newPage.toString());
            setSearchParams(searchParams);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return {
        user,
        formData,
        isSaving,
        wishlistItems,
        wishlistPagination,
        wishlistPage: currentUrlState.page,
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
    };
};
