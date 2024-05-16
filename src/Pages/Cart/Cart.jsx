import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import { FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import UseCart from "../../Hooks/UseCart";
import UseBooks from "../../Hooks/UseBooks";

const Cart = () => {
    const { user } = useAuth();
    const [axiosSecure] = UseAxiosSecure();
    const [loadingData, setLoadingData] = useState(true);
    const [userCart, setUserCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const { cart, cartRefetch } = UseCart(user?.email);

    // Get Books
    const { books } = UseBooks()

    useEffect(() => {
        if (cart.length > 0 && books.length > 0) {
            const groupedCart = cart.reduce((acc, currentItem) => {
                const existingItem = acc.find(item => item.bookId === currentItem.bookId);
                if (existingItem) {
                    existingItem.count++;
                } else {
                    const book = books.find(book => book._id === currentItem.bookId);
                    if (book) {
                        acc.push({ ...book, count: 1 });
                    }
                }
                return acc;
            }, []);
            setUserCart(groupedCart);
        }
        setLoadingData(false);
    }, [books, cart]);

    const handleDelete = async (selectedId) => {
        const selectedItem = cart.find((item) => item.bookId === selectedId);
        try {
            await axiosSecure.delete(`/carts/${selectedItem?._id}`);
            await cartRefetch();
            setUserCart(cart);
            if (cart.length === 1) {
                window.location.reload();
            }
            toast.success("Item removed from cart");
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove");
        }
    };

    const handlePlaceOrder = async () => {
        const selectedItemsArray = userCart.filter(item => selectedItems[item._id]);
        console.log(selectedItemsArray);

        if (selectedItemsArray.length === 0) {
            toast.error("Please select items to place an order.");
            return;
        }

        try {
            const orderData = {
                items: selectedItemsArray.map(item => (
                    {
                        bookId: item._id,
                        itemCount: item.count,
                        bookName: item.bookName,
                        discountedPrice: Math.ceil(item.price - (item.price * (item.discounts / 100))
                        ),
                        publications: item.publications,
                        image: item.image,
                    }))
            };

            // Save order data in local storage
            localStorage.setItem('orderItem', JSON.stringify(orderData));
            window.location.replace("/order-confirmation")


        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    const handleCheckboxChange = (event, itemId) => {
        setSelectedItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [itemId]: event.target.checked
        }));
    };

    if (loadingData) {
        return <CustomLoader />;
    }

    // Calculate total price
    const totalPrice = userCart.reduce((total, item) => {
        if (selectedItems[item._id]) {
            const discountedPrice = item.price - (item.price * (item.discounts / 100));
            return total + Math.ceil(discountedPrice * item.count);
        }
        return total;
    }, 0);

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    return (
        <div>
            {userCart.length <= 0 ? (
                <div className="w-full min-h-[80vh] flex items-center justify-center ">
                    <h1 className="text-mono text-gray-500">The cart is empty</h1>
                </div>
            ) : (

                <div>
                    <div className="font-mono w-full max-w-4xl mx-auto relative">
                        <h1 className="mx-auto w-fit my-4 text-lg font-medium text-gray-600 font-mono">
                            Cart Items: {userCart.length}
                        </h1>
                        <div className="px-4">
                            <div className="overflow-x-auto">
                                <table className="table text-xs">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userCart.map((item) => (
                                            <tr key={item._id}>
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems[item._id]}
                                                        onChange={(event) => handleCheckboxChange(event, item._id)}
                                                    />
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
                        <div className="w-full max-w-4xl flex gap-4 justify-end bottom-0 fixed  px-3">

                            {
                                totalPrice > 0 && <p className="my-3 py-3  bg-slate-200 rounded-sm bg-opacity-30 px-5">Estimated Price: {totalPrice}</p>
                            }

                            <button onClick={handlePlaceOrder} className="bg-orange-500 px-5 py-3 text-white font-semibold rounded-sm my-3 hover:bg-orange-600 hover:shadow-md hover:shadow-orange-300 uppercase">Place Order</button>
                        </div>
                        <Toaster />
                    </div>
                </div>
            )}



        </div >
    );
};

export default Cart;
