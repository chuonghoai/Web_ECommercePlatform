import { useState, useEffect } from "react";
import { useProfileStore } from "../profile.store";

export const useProfileLayoutController = () => {
    const { user, loadProfile } = useProfileStore();
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const handleOpenChangePassword = () => {
        setIsChangePasswordOpen(true);
    };

    const handleCloseChangePassword = () => {
        setIsChangePasswordOpen(false);
    };

    return {
        user,
        isChangePasswordOpen,
        handleOpenChangePassword,
        handleCloseChangePassword,
    };
};
