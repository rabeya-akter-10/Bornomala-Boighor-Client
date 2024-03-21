import React from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Bookcard from "../../../Components/BookCard/Bookcard";

const BestSellerBook = () => {
    const [axiosSecure] = UseAxiosSecure();
    // get all best seller books
    const { data: bestSeller = [], refetch: bestSellerRefetch } = useQuery({
        queryKey: ["bestSeller"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/best-seller`);
            return res.data;
        },
    });
    return (
        <div>
            <h1 className="text-center pt-8 text-xl text-green-600 ">
                বেস্ট সেলার বই
            </h1>

            <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 md:gap-6 gap-4 py-6 mx-auto w-fit">
                {bestSeller.map((book) => (
                    <Bookcard key={book._id} book={book}></Bookcard>
                ))}
            </div>
        </div>
    );
};

export default BestSellerBook;
