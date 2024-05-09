import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";
import AddBook from "../Pages/Dashboard/AdminPage/AddBooks/AddBook";
import Home from "../Pages/Home/Home";
import BookDetails from "../Pages/BookDetails/BookDetails";
import ManageBook from "../Pages/Dashboard/AdminPage/ManageBook/ManageBook";
import Books from "../Pages/Books/Books";
import CategoryBooks from "../Pages/CategoryBooks/CategoryBooks";
import Writers from "../Pages/Writers/Writers";
import Profile from "../Pages/Profile/Profile";
import Cart from "../Pages/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import AdminOnly from "./AdminOnly";
import Dashboard from "../Layouts/Dashboard";
import Categories from "../Pages/Categories/Categories";
import Publication from "../Pages/Publications/Publication.jsx";
import Publications from "../Pages/Publications/Publications.jsx";

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
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/books/:id",
                element: <BookDetails></BookDetails>,
                loader: ({ params }) =>
                    fetch(
                        `https://bornomala-boighor-server.vercel.app/books/${params?.id}`
                    ),
            },
          
            {
                path: "/books",
                element: <Books></Books>,
            },
            {
                path: "/categories/:category",
                element: <CategoryBooks></CategoryBooks>,
            },
            {
                path: "/categories",
                element: <Categories></Categories>,
            },
            {
                path: "/publications/:publication",
                element: <Publication></Publication>,
            },
            {
                path: "/publications",
                element: <Publications></Publications>,
            },
            {
                path: "/writers/:writer",
                element: <Writers></Writers>,
            },
            {
                path: "/users/:name",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>,
            },
            {
                path: "/cart",
                element:<PrivateRoute> <Cart></Cart></PrivateRoute>
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <AdminOnly>
                <Dashboard></Dashboard>
            </AdminOnly>
        ),
        children: [
            {
                path: "add-book",
                element: <AddBook></AddBook>
            },
            {
                path: "manage-books",
                element: <ManageBook></ManageBook>
            },
           
        ],
    },
]);

export default router;
