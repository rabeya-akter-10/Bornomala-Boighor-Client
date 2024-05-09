import { Navigate, useLocation } from "react-router-dom";
import CustomLoader from "../Components/customLoader/CustomLoader";
import useAuth from "../Hooks/UseAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    const location = useLocation();
    if (loading) {
        return <CustomLoader></CustomLoader>;
    }
    if (user) {
        return children;
    }
    return <Navigate to={"/login"} replace state={location}></Navigate>;
};

export default PrivateRoute;
