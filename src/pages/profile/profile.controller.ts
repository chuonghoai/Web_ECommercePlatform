import { useState, useEffect, useRef } from "react";
import { UserService } from "../../features/user/services/user.service";
import { userStorageService } from "../../features/user/services/userStorage.service";
import type { UpdateProfileRequest } from "../../features/user/dto/updateProfile.type";
import type { WishlistItem } from "../../features/user/dto/wishlist.type";
import type { User } from "../../features/user/models/user.model";
import { useToast } from "../../components/toast/toast";
import type { ApiResponse } from "../../core/api/apiResponse";

const userService = new UserService();
const WISHLIST_LIMIT = 6;

export const useProfileController = () => {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<"info" | "wishlist">("info");
    const [user, setUser] = useState<User | null>(userStorageService.getUser());

    const [formData, setFormData] = useState<UpdateProfileRequest>({
        fullName: user?.fullName ?? "",
        phone: "",
        gender: undefined,
        dateOfBirth: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl || null);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [wishlistPagination, setWishlistPagination] = useState<ApiResponse<any>["pagination"]>();
    const [wishlistPage, setWishlistPage] = useState(1);
    const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);

    const [isEditingMode, setIsEditingMode] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        if (activeTab === "wishlist") {
            loadWishlist(wishlistPage);
        }
    }, [activeTab, wishlistPage]);

    const loadProfile = async () => {
        try {
            const result = await userService.getProfile();
            const profile = result.data;

            const updatedUser: User = {
                id: profile.id,
                email: profile.email,
                fullName: profile.fullName,
                role: user?.role || "USER",
                avatarUrl: profile.avatarUrl
            };

            setUser(updatedUser);
            userStorageService.setUser(updatedUser);

            setFormData({
                fullName: profile.fullName,
                phone: profile.phone,
                gender: profile.gender,
                dateOfBirth: profile.dateOfBirth,
            });
            setAvatarPreview(profile.avatarUrl || null);
        } catch {
            toast("Không thể tải thông tin hồ sơ", "error");
        }
    };

    const loadWishlist = async (page: number) => {
        setIsLoadingWishlist(true);
        try {
            const result = await userService.getWishlist(page, WISHLIST_LIMIT);
            setWishlistItems(result.data.items);
            setWishlistPagination(result.pagination);
        } catch {
            toast("Không thể tải danh sách yêu thích", "error");
        } finally {
            setIsLoadingWishlist(false);
        }
    };

    const handleFieldChange = (field: keyof UpdateProfileRequest, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            await userService.updateProfile(formData);
            if (user && formData.fullName) {
                const updated = { ...user, fullName: formData.fullName };
                userStorageService.setUser(updated);
                setUser(updated);
            }
            toast("Cập nhật hồ sơ thành công", "success");
            setIsEditingMode(false);
        } catch {
            toast("Cập nhật hồ sơ thất bại", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleEditClick = () => {
        setIsEditingMode(true);
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);

        setIsUploadingAvatar(true);
        try {
            const result = await userService.uploadAvatar(file);
            if (user) {
                const updated = { ...user, avatarUrl: result.data.avatarUrl };
                userStorageService.setUser(updated);
                setUser(updated);
            }
            toast("Upload avatar thành công", "success");
        } catch {
            toast("Upload avatar thất bại", "error");
            setAvatarPreview(user?.avatarUrl || null);
        } finally {
            setIsUploadingAvatar(false);
        }
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
        avatarPreview,
        isUploadingAvatar,
        fileInputRef,
        wishlistItems,
        wishlistPagination,
        wishlistPage,
        isLoadingWishlist,
        isEditingMode,
        handleFieldChange,
        handleSaveProfile,
        handleEditClick,
        handleAvatarClick,
        handleAvatarChange,
        handleWishlistPageChange,
    };
};
