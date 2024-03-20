import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import Bookcard from "../../Components/BookCard/Bookcard";

const BookDetails = () => {
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState({});
    const [books, setBooks] = useState([]);

    const loadedBook = useLoaderData();
    useEffect(() => {
        if (loadedBook) {
            setBook(loadedBook);
            setLoading(false);
        }
    }, [loadedBook]);

    const {
        bookName,
        image,
        sold,
        writerName,
        price,
        discounts,
        _id,
        descriptions,
        category,
    } = book;

    useEffect(() => {
        fetch(`https://bornomala-boighor-server.vercel.app/books`)
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter(
                    (book) => book?.category == category
                );
                const slices = filtered.slice(0, 4);

                setBooks(slices);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching book details:", error);
                setLoading(false);
            });
    }, [category]);

    const discountPrice = price - price * (discounts / 100);
    const roundPrice = Math.ceil(discountPrice);

    if (loading || !book) {
        return <CustomLoader></CustomLoader>;
    }
    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    return (
        <div className="w-full flex lg:flex-row flex-col py-4 relative">
            <div className=" lg:w-4/6  mx-auto flex flex-col md:flex-row ">
                <div className="w-96 h-fit md:w-full mx-auto relative">
                    <img
                        className="max-w-sm w-72 h-[420px] mx-auto"
                        src={book?.image}
                        alt=""
                    />

                    {book?.discounts > 0 && (
                        <div className="absolute z-10 bg-green-600 w-20 h-20 rounded-es-badge flex items-center justify-center -bottom-0 -right-0 text-white  text-2xl font-bold">
                            <p className="leading-none">
                                <span className="m-0 leading-none">
                                    {book?.discounts}%
                                </span>
                                <br />
                                <span className=" leading-none">Off</span>
                            </p>
                        </div>
                    )}
                </div>
                <div className="lg:pt-20 w-full p-4">
                    <p className="text-2xl font-medium text-[#757575]">
                        {book?.bookName}
                    </p>
                    <p>
                        By:{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline">
                            {book?.writerName}
                        </span>
                    </p>
                    <p>
                        Category:{" "}
                        <span className="cursor-pointer hover:underline">
                            {book?.category}
                        </span>
                    </p>
                    <div className="flex gap-2 text-xl font-medium items-center">
                        {book?.discounts > 0 && (
                            <p className="line-through text-red-500">
                                TK.{book?.price}
                            </p>
                        )}
                        <p className="text-green-500">TK.{roundPrice}</p>
                        {discounts > 0 && (
                            <p className="text-xs">You save {discounts}%</p>
                        )}
                    </div>
                    {sold > 0 && (
                        <p className="text-xs text-warning font-medium">
                            Sold: {sold}
                        </p>
                    )}
                    <p className="text-xs py-8 text-[#757575]">
                        {descriptions}
                    </p>
                </div>
            </div>
            <hr className="m-4 lg:hidden" />

            <div className="lg:w-2/6  w-full">
                <h1 className="text-center text-green-600 py-4">
                    From Same Category
                </h1>

                <div className="grid lg:fixed bg-white top-16 md:grid-cols-4 lg:border-l grid-cols-2 md:gap-6 lg:grid-cols-2 gap-4 py-6 px-4  mx-auto w-fit">
                    {books?.map((b) => (
                        <Bookcard book={b} key={b._id}></Bookcard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
