import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";
import AddBook from "../Pages/Dashboard/AdminPage/AddBook";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/add-book",
                element: <AddBook></AddBook>,
            },
            {
                path: "/",
                element: <Home></Home>,
            },
        ],
    },
]);

export default router;
