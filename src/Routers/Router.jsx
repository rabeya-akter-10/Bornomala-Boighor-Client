import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";
import AddBook from "../Pages/Dashboard/AdminPage/AddBook";
import Home from "../Pages/Home/Home";
import BookDetails from "../Pages/BookDetails/BookDetails";
import ManageBook from "../Pages/Dashboard/AdminPage/ManageBook/ManageBook";
import Books from "../Pages/Books/Books";
import CategoryBooks from "../Pages/CategoryBooks/CategoryBooks";
import Publications from "../Pages/Publications/Publications";
import Writers from "../Pages/Writers/Writers";
import Profile from "../Pages/Profile/Profile";

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
            {
                path: "/books/:id",
                element: <BookDetails></BookDetails>,
                loader: ({ params }) =>
                    fetch(
                        `https://bornomala-boighor-server.vercel.app/books/${params?.id}`
                    ),
            },
            {
                path: "/manage-books",
                element: <ManageBook></ManageBook>,
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
                path: "/publications/:publication",
                element: <Publications></Publications>,
            },
            {
                path: "/writers/:writer",
                element: <Writers></Writers>,
            },
            {
                path: "/users/:name",
                element: <Profile></Profile>,
            },
        ],
    },
]);

export default router;
