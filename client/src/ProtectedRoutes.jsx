import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = () => {

    const { currentUser, loading, logout } = useContext(AuthContext)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (currentUser === null) {
        return <Navigate to="/" replace={true} />;
    }
    return <Outlet />;
};

export default ProtectedRoute; 