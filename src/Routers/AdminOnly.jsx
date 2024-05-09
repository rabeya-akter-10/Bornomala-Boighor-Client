import React from "react";
import UseAdmin from "../Hooks/UseAdmin";
import { Navigate, useLocation } from "react-router-dom";
import CustomLoader from "../Components/customLoader/CustomLoader";
import useAuth from "../Hooks/UseAuth";

const AdminOnly = ({ children }) => {
    const { user, loading } = useAuth();

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to={"/"}></Navigate>;
};

export default AdminOnly;
