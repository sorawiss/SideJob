import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = () => {

    const { isAuthenticated, loading } = useContext(AuthContext)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Outlet />;
    }
    return <Navigate to="/" replace={true} />;
};

export default ProtectedRoute; 