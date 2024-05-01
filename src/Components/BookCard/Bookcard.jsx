import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const Bookcard = ({ book }) => {
    const [axiosSecure] = UseAxiosSecure();
    const { user } = useAuth();
    const [show, setShow] = useState(false);
    const { bookName, image, sold, writerName, price, discounts, _id } = book;
    const discountPrice = price - price * (discounts / 100);
    const roundPrice = Math.ceil(discountPrice);
    // get Cart
    const { data: carts = [], refetch: cartRefetch } = useQuery({
        queryKey: ["carts"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts`);
            return res.data;
        },
    });
    const handleAddCart = () => {
        const item = {
            bookName,
            userEmail: user?.email,
            userName: user?.displayName,
            bookId: _id,
        };

        axiosSecure.post("/carts", item).then((data) => {
            if (data.data.acknowledged) {
                toast.success("Book added to cart");
                cartRefetch();
            }
        });
    };

    return (
        <div
            onMouseEnter={() => {
                setShow(true);
            }}
            onMouseLeave={() => {
                // Corrected from handleMouseLeave to onMouseLeave
                setShow(false);
            }}
            className="relative w-fit"
        >
            <div className="flex flex-col justify-center items-center h-72 w-44 border border-b-green-600 border-r-green-600  hover:shadow-xl shadow-sm rounded-sm p-2">
                <img
                    className="w-[120px] h-44 mb-2"
                    src={image}
                    alt={bookName}
                />
                <h1 className="text-sm font-bold">{bookName}</h1>
                <p className="text-xs">{writerName}</p>
                <div className="flex gap-2 text-xs font-medium">
                    {discounts > 0 && (
                        <p className="line-through text-red-500">TK.{price}</p>
                    )}
                    <p className="text-green-500">TK.{roundPrice}</p>
                </div>
                {sold > 0 && (
                    <p className="text-xs font-medium text-warning absolute left-4 bottom-4">
                        Sold: {sold}
                    </p>
                )}

                {discounts > 0 && (
                    <div className="absolute z-10 bg-green-600 w-12 h-10 rounded-ss-badge flex items-center justify-center -bottom-0 -right-0 text-white font-semibold text-xs ">
                        <p className="leading-none">
                            <span className="m-0 leading-none">
                                {discounts}%
                            </span>
                            <br />
                            <span className=" leading-none">Off</span>
                        </p>
                    </div>
                )}
            </div>

            {show && (
                <div className="absolute bottom-0 bg-gray-200 bg-opacity-80  z-30 w-full h-full ">
                    <div className="flex items-center justify-center w-full h-full flex-col">
                        <button
                            onClick={handleAddCart}
                            className="w-fit px-4 py-1 bg-green-600 hover:bg-green-700 z-40 text-white opacity-100 rounded-sm"
                        >
                            Add to cart
                        </button>

                        <Link
                            to={`/books/${_id}`}
                            className="absolute bottom-0 py-2 bg-blue-500 w-full text-center hover:bg-blue-700 text-white font-medium"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            )}
            <Toaster></Toaster>
        </div>
    );
};

export default Bookcard;
