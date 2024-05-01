// Import useState and useEffect
import React, { useState, useEffect } from "react";
import useAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import { FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Cart = () => {
    const { user } = useAuth();
    const [axiosSecure] = UseAxiosSecure();
    const [loadingData, setLoadingData] = useState(true);
    const [cart, setCart] = useState([]);

    // get Cart
    const { data: userCart = [], refetch: cartRefetch } = useQuery({
        queryKey: ["userCart"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts/${user?.email}`);
            return res.data;
        },
    });

    // get Books
    const { data: books = [] } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            return res.data;
        },
    });

    useEffect(() => {
        if (userCart.length > 0) {
            const savedItem = books.filter((book) =>
                userCart.some((cartItem) => cartItem.bookId === book._id)
            );
            setCart(savedItem);
            setLoadingData(false);
        }
    }, [books, userCart]);

    const handleDelete = async (selectedId) => {
        const selectedItem = userCart.find((item) => item.bookId === selectedId);
        try {
            await axiosSecure.delete(`/carts/${selectedItem?._id}`);
            // If deletion is successful, refetch the books data
            await cartRefetch();
            // Show success message
          toast.success("Item removed from cart")
        } catch (error) {
          
            // Show error message
         toast.error("Failed to remove")
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);
    if (loadingData) {
        return <CustomLoader />;
    }

    return (
        <div>
            <h1 className="mx-auto w-fit my-4 text-lg font-medium text-gray-600 font-mono">
                Cart Items: {cart.length}
            </h1>
            <div className="px-4">
                <div className="overflow-x-auto">
                    <table className="table text-xs">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                        />
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item._id}>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                            />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={item.image}
                                                        alt={item.bookName}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium text-[12px]">
                                                    {item.bookName}
                                                </div>
                                                <div className="text-sm opacity-50 hidden md:flex">
                                                    {item.writerName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {Math.ceil(
                                            item.price -
                                                item.price *
                                                    (item.discounts / 100)
                                        )}
                                    </td>

                                    <td>
                                        <FaTrashAlt
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            className="text-red-500 cursor-pointer p-2 w-10 h-10 hover:bg-red-500 hover:text-white rounded-full"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Cart;
