import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = () => {

    const { curentUser, loading } = useContext(AuthContext)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (curentUser === null) {
        return <Navigate to="/" replace={true} />;
    }
    return <Outlet />;
};

export default ProtectedRoute; 