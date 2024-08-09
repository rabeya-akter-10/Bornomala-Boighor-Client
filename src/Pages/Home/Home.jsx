import React from "react";
import BookByCategory from "./BookByCategory/BookByCategory";
import banner from "../../assets/banner1.jpg";
import Hero from "./Hero/Hero";
import Publications from "./Publications/Publications";
import Writers from "./Writers/Writers";
import AllBooks from "./AllBooks/AllBooks";
import BestSellerBook from "./BestSellerBook.jsx/BestSellerBook";
import BlogsSlider from "../../Components/BlogsSlider/BlogsSlider";

const Home = () => {
    return (
        <div>
            <div className="">
                <Hero></Hero>
            </div>
            {/* <div className="md:hidden w-full flex items-center justify-center mt-6"><img src="https://i.ibb.co/nC0YqSG/Hero-banner.png" alt="" /></div> */}

            <h1 className="text-center pt-8 text-xl text-green-600 ">
                ক্যাটাগরি সমুহ
            </h1>
            <BookByCategory></BookByCategory>
            <BestSellerBook></BestSellerBook>
            <AllBooks></AllBooks>
            <Writers></Writers>
            <BlogsSlider></BlogsSlider>
        </div>
    );
};

export default Home;
