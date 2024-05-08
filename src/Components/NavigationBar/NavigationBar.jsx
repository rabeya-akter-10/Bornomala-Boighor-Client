import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import "./NavigationBar.css";
import { AuthContext } from "../../Providers/AuthProviders";
import logo from "../../assets/logo.png";
import CustomLoader from "../CustomLoader/CustomLoader";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseCart from "../../Hooks/UseCart";
import UseBooks from "../../Hooks/UseBooks";

const NavigationBar = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { books } = UseBooks();
  const { cart, cartRefetch } = UseCart(user?.email);

  useEffect(() => {
    cartRefetch();
  }, [user]);

  const handleLogout = () => {
    logout()
      .then((result) => {})
      .catch((error) => {});

    window.location.reload();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredBooks = [];

  if(searchTerm) {
    filteredBooks = books.filter((book) =>
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  


  return (
    <div className="bg-white">
      <div className="navbar  border-b border-success max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown ">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
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
                to={"/add-book"}
              >
                Add A Book
              </NavLink>
              <NavLink
                className="font-medium px-3 py-2 rounded-lg hover:bg-slate-200 lg:text-base text-xs text-success"
                to={"/manage-books"}
              >
                Manage Stocks
              </NavLink>
              <NavLink
                className="font-medium px-3 py-2 rounded-lg hover:bg-slate-200 lg:text-base text-xs text-success"
                to={"/books"}
              >
                All Books
              </NavLink>
            </div>
          </div>
          <Link to={"/"} className="flex items-center">
            <img className="h-10" src={logo} alt="" />
          </Link>
        </div>
        <span className="md:hidden navbar-center">
          <input
            type="text"
            placeholder="Search by book name"
            className="px-2 py-1 text-[13px] focus:outline-none text-center rounded-3xl input input-bordered input-success ml-3 w-36"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </span>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <input
              type="text"
              placeholder="Search by book name"
              className="px-4 py-2 text-center text-sm focus:outline-none input rounded-3xl input-bordered input-success w-80"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end lg:mr-3 mr-1">
            <label tabIndex={0} className="">
              {user && (
                <Link
                  to={"/cart"}
                  className="indicator relative hover:bg-slate-200 p-4 rounded-full"
                >
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
                  <p className="badge bg-green-500 text-white absolute left-0 bottom-2">
                    {cart.length}
                  </p>
                </Link>
              )}
            </label>
          </div>
          {!user && (
            <span>
              {" "}
              <NavLink
                className=" font-medium px-3 py-2 rounded-lg hover:bg-slate-200 lg:text-base text-xs text-success "
                to={"/login"}
              >
                Login
              </NavLink>
            </span>
          )}
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full outline outline-success">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact space-y-2 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to={`/users/${user?.displayName}`}
                    className="justify-between"
                  >
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
      {/* Render search results */}
      <div className="relative flex items-center w-full justify-center">
        <ul className="absolute mx-auto bg-gray-200  top-0">
         {filteredBooks?.map((book) => (
           <Link onClick={()=>{
            setSearchTerm("")
           }} to={`/books/${book._id}`}> <li className="border-b border-white py-2 px-4 w-80 hover:bg-slate-50" key={book._id}>
           {book.bookName}
         </li></Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
