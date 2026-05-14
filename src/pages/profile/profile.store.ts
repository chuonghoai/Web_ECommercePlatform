import { useState } from "react";
import { UserService } from "../../features/user/services/user.service";
import { userStorageService } from "../../features/user/services/userStorage.service";
import type { UpdateProfileRequest } from "../../features/user/dto/updateProfile.type";
import type { WishlistItem } from "../../features/user/models/wishlist.model";
import type { User } from "../../features/user/models/user.model";
import { useToast } from "../../components/toast/toast";
import type { ApiResponse } from "../../core/api/apiResponse";

const userService = new UserService();
const WISHLIST_LIMIT = 6;

export const useProfileStore = () => {
    const { toast } = useToast();
    const [user, setUser] = useState<User | null>(userStorageService.getUser());

    const [formData, setFormData] = useState<UpdateProfileRequest>({
        fullName: user?.fullName ?? "",
        phone: "",
        gender: undefined,
        dateOfBirth: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [wishlistPagination, setWishlistPagination] = useState<ApiResponse<any>["pagination"]>();
    const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);

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

    const saveProfile = async (): Promise<boolean> => {
        setIsSaving(true);
        try {
            await userService.updateProfile(formData);
            if (user && formData.fullName) {
                const updated = { ...user, fullName: formData.fullName };
                userStorageService.setUser(updated);
                setUser(updated);
            }
            toast("Cập nhật hồ sơ thành công", "success");
            return true;
        } catch {
            toast("Cập nhật hồ sơ thất bại", "error");
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return {
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
    };
};
