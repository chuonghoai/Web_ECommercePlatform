import { Navigate } from "react-router-dom";
import { tokenService } from "./token.service";

interface Props {
    children: React.ReactNode;
}

function AuthGuard({ children }: Props) {
    const token = tokenService.getAccessToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default AuthGuard;