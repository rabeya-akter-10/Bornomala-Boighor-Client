import React from "react";
import BookByCategory from "./BookByCategory/BookByCategory";
import banner from "../../assets/banner1.jpg";
import Hero from "./Hero/Hero";

const Home = () => {
    return (
        <div>
            <div>
                <Hero></Hero>
            </div>
            <BookByCategory></BookByCategory>
        </div>
    );
};

export default Home;
