import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";

const BookDetails = () => {
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState(null);

    const loadedBook = useLoaderData();
    useEffect(() => {
        if (loadedBook) {
            setBook(loadedBook);
            setLoading(false);
        }
    }, [loadedBook]);

    if (loading || !book) {
        return <CustomLoader></CustomLoader>;
    }
    const {
        bookName,
        image,
        sold,
        writerName,
        price,
        discounts,
        _id,
        description,
        category,
    } = book;

    const discountPrice = price - price * (discounts / 100);
    const roundPrice = Math.ceil(discountPrice);

    return (
        <div className="w-full flex lg:flex-row flex-col p-2">
            <div className=" lg:w-4/6  mx-auto flex flex-col md:flex-row ">
                <div className="w-96 md:w-full mx-auto ">
                    <img
                        className="max-w-sm w-72 h-[420px] mx-auto"
                        src={image}
                        alt=""
                    />
                </div>
                <div className="lg:pt-20 w-full p-4">
                    <p className="text-2xl font-medium text-[#757575]">
                        {bookName}
                    </p>
                    <p>
                        By:{" "}
                        <span className="text-blue-500 cursor-pointer hover:underline">
                            {writerName}
                        </span>
                    </p>
                    <p>
                        Category:{" "}
                        <span className="cursor-pointer hover:underline">
                            {category}
                        </span>
                    </p>
                    <div className="flex gap-2 text-xl font-medium items-center">
                        <p className="line-through text-red-500">TK.{price}</p>
                        <p className="text-green-500">TK.{roundPrice}</p>
                        <p className="text-xs">You save {discounts}%</p>
                    </div>
                    <p className="text-xs text-warning font-medium">
                        Sold: {sold}
                    </p>
                </div>
            </div>

            <div className="lg:w-2/6 p-4 w-full">
                <h1>From Same Category</h1>
            </div>
        </div>
    );
};

export default BookDetails;
