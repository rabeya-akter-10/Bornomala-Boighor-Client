import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import "./NavigationBar.css";
import { AuthContext } from "../../Providers/AuthProviders";
import logo from "../../assets/logo.png";

const NavigationBar = () => {
    const { user, loading, logout } = useContext(AuthContext);
    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-white">
                <Vortex
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={[
                        "red",
                        "green",
                        "blue",
                        "yellow",
                        "orange",
                        "purple",
                    ]}
                />
            </div>
        );
    }
    const handleLogout = () => {
        logout()
            .then((result) => {})
            .catch((error) => {});
    };
    return (
        <div className="bg-white">
            <div className="navbar  border-b border-success max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <div
                            tabIndex={0}
                            className=" menu-compact dropdown-content mt-3 p-2 flex flex-col shadow bg-base-100 rounded-box w-52"
                        >
                            <NavLink
                                className="font-medium px-3 py-2 rounded-lg hover:bg-slate-200 lg:text-base text-xs text-success"
                                to={"/"}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className="font-medium px-3 py-2 rounded-lg hover:bg-slate-200 lg:text-base text-xs text-success"
                                to={"/addBook"}
                            >
                                Add A Book
                            </NavLink>
                        </div>
                    </div>
                    <Link to={"/"} className="flex items-center">
                        <img className="h-10" src={logo} alt="" />
                    </Link>
                </div>
                <span className="lg:hidden navbar-center">
                    <input
                        type="text"
                        placeholder="Search by book name"
                        className="px-4 py-2 focus:outline-none text-center rounded-3xl input input-bordered input-success ml-3 w-36"
                    />
                </span>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <input
                            type="text"
                            placeholder="Search by book name"
                            className="px-4 py-2 text-center focus:outline-none input rounded-3xl input-bordered input-success w-80 "
                        />
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end lg:mr-3 mr-1">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle"
                        >
                            <Link className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-[#149352]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </Link>
                        </label>
                    </div>
                    {!user && (
                        <NavLink
                            className=" font-medium px-3 py-2 rounded-lg hover:bg-slate-200 lg:text-base text-xs text-success "
                            to={"/login"}
                        >
                            Login
                        </NavLink>
                    )}
                    {user && (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full outline outline-success">
                                    <img src={user.photoURL} />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-compact space-y-2 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <Link className="justify-between">
                                        {user.displayName}
                                    </Link>
                                </li>
                                <li>
                                    <Link>Settings</Link>
                                </li>
                                {user && (
                                    <li>
                                        <a onClick={handleLogout}>Logout</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
