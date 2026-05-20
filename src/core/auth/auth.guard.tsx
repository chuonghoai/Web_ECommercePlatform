import { Navigate } from "react-router-dom";
import { userStorageService } from "../../features/user/services/userStorage.service";

interface Props {
    children: React.ReactNode;
}

function AuthGuard({ children }: Props) {
    const user = userStorageService.getUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default AuthGuard;