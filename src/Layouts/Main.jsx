import React from "react";
import Home from "../Pages/Home/Home";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
const Main = () => {
    return (
        <div className="max-w-7xl mx-auto w-full">
            <div className="z-40 fixed w-full max-w-7xl">
                <NavigationBar></NavigationBar>
            </div>
            <div className="pt-20 min-h-[100vh]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;
