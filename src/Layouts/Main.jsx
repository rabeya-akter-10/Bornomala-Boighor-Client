import React from "react";
import Home from "../Pages/Home/Home";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";
const Main = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="w-full z-20">
                <NavigationBar></NavigationBar>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;
