import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";
import AddBook from "../Pages/Dashboard/AdminPage/AddBook";
import Home from "../Pages/Home/Home";
import BookDetails from "../Pages/BookDetails/BookDetails";

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
        ],
    },
]);

export default router;
