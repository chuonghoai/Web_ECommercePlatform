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

    const [isEditMode, setIsEditMode] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    // Snapshot formData khi bắt đầu edit để có thể Hủy
    const [formDataSnapshot, setFormDataSnapshot] = useState<UpdateProfileRequest | null>(null);

    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        loadWishlist(currentUrlState.page);
    }, [currentUrlState.page]);

    const handleFieldChange = (field: keyof UpdateProfileRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleEnterEdit = () => {
        // Lưu snapshot để Hủy có thể restore
        setFormDataSnapshot({ ...formData });
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        // Restore về snapshot trước khi edit
        if (formDataSnapshot) {
            setFormData(() => formDataSnapshot);
        }
        setIsEditMode(false);
        setFormDataSnapshot(null);
    };

    const handleSaveProfile = async () => {
        const success = await saveProfile();
        if (success) {
            setIsEditMode(false);
            setFormDataSnapshot(null);
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
        isEditMode,
        isChangePasswordOpen,
        handleFieldChange,
        handleEnterEdit,
        handleCancelEdit,
        handleSaveProfile,
        handleOpenChangePassword,
        handleCloseChangePassword,
        handleWishlistPageChange,
    };
};
