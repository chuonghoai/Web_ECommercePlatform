import { Outlet } from "react-router-dom";
import { useProfileLayoutController } from "./profileLayout.controller";
import { ProfileHeroSection } from "../components/ProfileHeroSection";
import { UserInfoSidebar } from "../components/userInfoSidebar";
import { ChangePasswordModal } from "../components/changePasswordModal";

export const ProfileLayout = () => {
    const controller = useProfileLayoutController();

    return (
        <div className="w-full min-h-screen bg-stone-50/50">
            <ProfileHeroSection user={controller.user} />

            <div className="max-w-400 mx-auto px-6 lg:px-10 py-8">
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    <aside className="w-full lg:w-65 xl:w-70 shrink-0 lg:sticky lg:top-22">
                        <UserInfoSidebar
                            user={controller.user}
                            onChangePasswordClick={controller.handleOpenChangePassword}
                        />
                    </aside>

                    <div className="flex-1 min-w-0">
                        <Outlet />
                    </div>
                </div>
            </div>

            <ChangePasswordModal
                isOpen={controller.isChangePasswordOpen}
                onClose={controller.handleCloseChangePassword}
            />
        </div>
    );
};
