import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Login from "../Pages/Login&Register/Login";
import Register from "../Pages/Login&Register/Register";
import Home from "../Pages/Home/Home";
import BookDetails from "../Pages/BookDetails/BookDetails";
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
import OrderConfirmation from "../Pages/Cart/OrderConfirmation.jsx";
import PaymentsSuccess from "../Pages/Payments/PaymentsSuccess.jsx";
import OrderHistory from "../Pages/OrderHistory/OrderHistory.jsx";
import GiveAReview from "../Pages/GiveAReview/GiveAReview.jsx";
import Invoice from "../Pages/OrderHistory/Invoice.jsx";
import Reviews from "../Pages/Reviews/Reviews.jsx";
import AddBlog from "../Pages/BlogsPages/AddBlog/AddBlog.jsx";
import SalesReport from "../Pages/Dashboard/AdminPage/SalesReport/SalesReport.jsx";
import MyBlogs from "../Pages/BlogsPages/MyBlogs/MyBlogs.jsx";
import EditBlog from "../Pages/BlogsPages/EditBlog/EditBlog.jsx";
import Blogs from "../Pages/BlogsPages/Blogs/Blogs.jsx";
import ShippingLevel from "../Pages/Dashboard/ShippingLevel/ShippingLevel.jsx";
import AdminDashBoard from "../Pages/Dashboard/AdminPage/AdminDashBoard/AdminDashBoard.jsx";
import AddBook from "../Pages/Dashboard/AdminPage/AddBooks/AddBook.jsx";
import ManageBook from "../Pages/Dashboard/AdminPage/ManageBook/ManageBook.jsx";
import NewOrders from "../Pages/Dashboard/AdminPage/NewOrders/NewOrders.jsx";
import ToShipped from "../Pages/Dashboard/ToShipped/ToShipped.jsx";
import DeliveredOrders from "../Pages/Dashboard/AdminPage/DeliveredOrders/DelivaredOrders.jsx";
import OrderDetails from "../Pages/Dashboard/AdminPage/OrderDetails/OrderDetails.jsx";
import ManageStocks from "../Pages/Dashboard/AdminPage/ManageStocks/ManageStocks.jsx";
import ManageUsers from "../Pages/Dashboard/AdminPage/ManageUsers/ManageUsers.jsx";
import UserDetails from "../Pages/Dashboard/AdminPage/UserDetails/UserDetails.jsx";
import ViewAnalysis from "../Pages/Dashboard/AdminPage/ViewAnalysis/ViewAnalysis.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/", element: <Home /> },
            {
                path: "/books/:id",
                element: <BookDetails />,
                loader: ({ params }) => fetch(`https://bornomala-boighor-server.vercel.app/books/${params?.id}`)
            },
            { path: "/books", element: <Books /> },
            { path: "/categories/:category", element: <CategoryBooks /> },
            { path: "/categories", element: <Categories /> },
            { path: "/publications/:publication", element: <Publication /> },
            { path: "/publications", element: <Publications /> },
            { path: "/writers/:writer", element: <Writers /> },
            {
                path: "/users/:name",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/cart",
                element: (
                    <PrivateRoute>
                        <Cart />
                    </PrivateRoute>
                ),
            },
            {
                path: "/order-confirmation",
                element: (
                    <PrivateRoute>
                        <OrderConfirmation />
                    </PrivateRoute>
                ),
            },
            {
                path: "/order-history",
                element: (
                    <PrivateRoute>
                        <OrderHistory />
                    </PrivateRoute>
                ),
            },
            {
                path: "/success-payment/:trans_id",
                element: (
                    <PrivateRoute>
                        <PaymentsSuccess />
                    </PrivateRoute>
                ),
            },
            {
                path: "/give-review/:bookId",
                element: (
                    <PrivateRoute>
                        <GiveAReview />
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-reviews",
                element: (
                    <PrivateRoute>
                        <Reviews />
                    </PrivateRoute>
                ),
            },
            {
                path: "/add-blog",
                element: (
                    <PrivateRoute>
                        <AddBlog />
                    </PrivateRoute>
                ),
            },
            {
                path: "/edit-blog/:id",
                element: (
                    <PrivateRoute>
                        <EditBlog />
                    </PrivateRoute>
                ),
            },
            {
                path: "/my-blogs",
                element: (
                    <PrivateRoute>
                        <MyBlogs />
                    </PrivateRoute>
                ),
            },
            {
                path: '/blogs',
                element: < Blogs />
            }
        ],
    },
    {
        path: "/dashboard",
        element: (
            <AdminOnly>
                <Dashboard />
            </AdminOnly>
        ),
        children: [
            {
                path: "",
                element: (
                    <AdminOnly>
                        <AdminDashBoard />
                    </AdminOnly>
                ),
            },
            {
                path: "add-book",
                element: (
                    <AdminOnly>
                        <AddBook />
                    </AdminOnly>
                ),
            },
            {
                path: "manage-books",
                element: (
                    <AdminOnly>
                        <ManageBook />
                    </AdminOnly>
                ),
            },
            {
                path: "new-orders",
                element: (
                    <AdminOnly>
                        <NewOrders />
                    </AdminOnly>
                ),
            },
            {
                path: "to-shipped",
                element: (
                    <AdminOnly>
                        <ToShipped />
                    </AdminOnly>
                ),
            },
            {
                path: "delivered",
                element: (
                    <AdminOnly>
                        <DeliveredOrders />
                    </AdminOnly>
                ),
            },
            {
                path: "order-details/:transactionId",
                element: (
                    <AdminOnly>
                        <OrderDetails />
                    </AdminOnly>
                ),
            },
            {
                path: "manage-stocks",
                element: (
                    <AdminOnly>
                        <ManageStocks />
                    </AdminOnly>
                ),
            },
            {
                path: "sells-report",
                element: (
                    <AdminOnly>
                        <SalesReport />
                    </AdminOnly>
                ),
            },
            {
                path: "manage-users",
                element: (
                    <AdminOnly>
                        <ManageUsers />
                    </AdminOnly>
                ),
            },
            {
                path: "user-details/:email",
                element: (
                    <AdminOnly>
                        <UserDetails />
                    </AdminOnly>
                ),
            },
            {
                path: "view-analysis",
                element: (
                    <AdminOnly>
                        <ViewAnalysis />
                    </AdminOnly>
                ),
            },
        ],
    },
    {
        path: "/invoice/:transactionId",
        element: (
            <PrivateRoute>
                <Invoice />
            </PrivateRoute>
        ),
    },
    {
        path: "shipping-level/:transactionId",
        element: (
            <AdminOnly>
                <ShippingLevel />
            </AdminOnly>
        ),
    },
]);

export default router;
