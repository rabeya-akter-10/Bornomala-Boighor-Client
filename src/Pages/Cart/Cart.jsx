import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseCart from "../../Hooks/UseCart";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import { FaTrashAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import UseAllBooks from "../../Hooks/UseAllBooks";

const Cart = () => {
    const { user } = useAuth();
    const [axiosSecure] = UseAxiosSecure();
    const [loadingData, setLoadingData] = useState(true);
    const [userCart, setUserCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [sortBy, setSortBy] = useState('');
    const { cart, cartRefetch } = UseCart(user?.email);
    const { books } = UseAllBooks();

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
        if (selectedItemsArray.length === 0) {
            toast.error("Please select items to place an order.");
            return;
        }

        try {
            const orderData = {
                items: selectedItemsArray.map(item => ({
                    bookId: item._id,
                    itemCount: item.count,
                    bookName: item.bookName,
                    discountedPrice: Math.ceil(item.price - (item.price * (item.discounts / 100))),
                    publications: item.publications,
                    image: item.image,
                    reviews: false
                }))
            };

            // Save order data in local storage
            localStorage.setItem('orderItem', JSON.stringify(orderData));
            window.location.replace("/order-confirmation");
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    const handleCheckboxChange = (event, itemId) => {
        const selectedCount = Object.values(selectedItems).filter(value => value).length;

        if (event.target.checked && selectedCount >= 3) {
            toast.error("You can only select up to 3 items.");
            return;
        }

        setSelectedItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [itemId]: event.target.checked
        }));
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleSort = () => {
        const sortedCart = [...userCart];
        if (sortBy === 'priceAsc') {
            sortedCart.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceDesc') {
            sortedCart.sort((a, b) => b.price - a.price);
        }
        return sortedCart;
    };

    const handleItemCountChange = (itemId, increment) => {
        setUserCart(prevCart => prevCart.map(item => {
            if (item._id === itemId) {
                const newCount = item.count + increment;
                if (newCount >= 1 && newCount <= 3) {
                    return { ...item, count: newCount };
                }
            }
            return item;
        }));
    };

    if (loadingData) {
        return <CustomLoader />;
    }

    // Calculate total price
    const totalPrice = userCart.reduce((total, item) => {
        if (selectedItems[item._id]) {
            const discountedPrice = Math.ceil(item.price - (item.price * (item.discounts / 100)));
            return total + (discountedPrice * item.count);
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
                        <div className="flex justify-end my-4 text-xs">
                            <select
                                value={sortBy}
                                onChange={handleSortChange}
                                className="py-1 px-2 border border-gray-400 rounded-md"
                            >
                                <option value="">Sort By</option>
                                <option value="priceAsc">Price (Low to High)</option>
                                <option value="priceDesc">Price (High to Low)</option>
                            </select>
                        </div>
                        <div className="px-4">
                            <div className="overflow-x-auto">
                                <table className="table text-xs">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Price <br /> Qty
                                            </th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {handleSort().map((item) => (
                                            <tr key={item._id}>
                                                <th>
                                                    {item?.quantity > 0 ? (
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedItems[item._id] || false}
                                                            onChange={(event) => handleCheckboxChange(event, item._id)}
                                                        />
                                                    ) : (
                                                        <th></th>
                                                    )}
                                                </th>
                                                <td className="">
                                                    {item?.quantity === 0 && (
                                                        <div className="w-full md:max-w-3xl max-w-[310px] rounded-md left-0 h-[60px] absolute bg-black bg-opacity-40 text-red-500 text-xl flex items-center justify-center">
                                                            <p className="text-center">Out of stock</p>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={item.image} alt={item.bookName} />
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
                                                <td className=" flex flex-col items-start justify-between  gap-1">
                                                    <p className="text-center w-fit pl-1">
                                                        {Math.ceil(
                                                            item.price - item.price * (item.discounts / 100)
                                                        )}tk
                                                    </p>
                                                    <p className="flex items-center gap-2 justify-center ">
                                                        <button
                                                            onClick={() => handleItemCountChange(item._id, -1)}
                                                            className="p text-gray-700 rounded-md"
                                                            disabled={item.count <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span>{item.count}</span>
                                                        <button
                                                            onClick={() => handleItemCountChange(item._id, 1)}
                                                            className=" text-gray-700 rounded-md"
                                                            disabled={item.count >= 3}
                                                        >
                                                            +
                                                        </button>
                                                    </p></td>
                                                <td className="">
                                                    <FaTrashAlt
                                                        onClick={() => handleDelete(item._id)}
                                                        className="text-red-500 cursor-pointer p-2 w-10 h-10 hover:bg-red-500 hover:text-white rounded-full"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-full max-w-4xl flex gap-4 justify-end bottom-0 fixed px-3">
                            {totalPrice > 0 && (
                                <p className="my-3 py-3 bg-slate-200 rounded-sm bg-opacity-70 px-5">
                                    Estimated Price: {totalPrice}
                                </p>
                            )}
                            <button
                                onClick={handlePlaceOrder}
                                className="bg-orange-500 px-5 py-3 text-white font-semibold rounded-sm my-3 hover:bg-orange-600 hover:shadow-md hover:shadow-orange-300 uppercase"
                            >
                                Place Order
                            </button>
                        </div>
                        <Toaster />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
