import React, { useState } from 'react';
import UserOrderHistory from '../../Hooks/UserOrderHistory';
import useAuth from '../../Hooks/UseAuth';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';

const OrderHistory = () => {
    const { user } = useAuth();
    const email = user?.email;
    const navigate = useNavigate()
    const { orders, ordersRefetch } = UserOrderHistory(email);

    const [sortOrder, setSortOrder] = useState('asc'); // State to manage sort order

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const calculateTotalPrice = (products) => {
        return products.reduce((total, product) => total + product.discountedPrice, 0);
    };

    const getBadgeClass = (status) => {
        switch (status) {
            case 'Processing':
                return 'badge-warning';
            case 'Delivered':
                return 'badge-success';
            case 'Canceled':
                return 'badge-danger';
            default:
                return '';
        }
    };

    const sortOrders = (orders, order) => {
        return [...orders].sort((a, b) => {
            const dateA = new Date(a.orderCreationDate);
            const dateB = new Date(b.orderCreationDate);
            return order === 'asc' ? dateB - dateA : dateA - dateB;
        });
    };

    const handleGiveRivew = (orderId, bookId) => {
        localStorage.setItem('data', JSON.stringify(orderId));
        navigate(`/give-review/${bookId}`)
    }

    if (!orders.length) {
        return <div className='w-full min-h-[80vh] flex items-center justify-center'><h1 className='text-center text-gray-400'>After placing your first order,<br />regular updates will be listed here</h1></div>
    }

    const sortedOrders = sortOrders(orders, sortOrder); // Sort orders based on sortOrder

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });


    return (
        <div className='bg-green-100 lg:bg-white bg-opacity-50 min-h-[88vh]'>
            <h1 className='text-center py-6 text-xl text-gray-400 font-medium'>Orders</h1>
            <div className='max-w-3xl mx-auto w-full px-4 flex flex-col items-center gap-4 pb-12'>
                {/* Sort select */}
                <div className='flex items-center justify-end w-full mb-4 text-xs'>
                    <label htmlFor="sortOrder" className="mr-2 text-gray-600">Sort by Date:</label>
                    <select
                        id="sortOrder"
                        className='px-4 py-1 bg-white border border-gray-300 rounded-md'
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                {sortedOrders.map((order) => {
                    const totalPrice = calculateTotalPrice(order.products);
                    const deliveryCost = order.deliveryCost || 70; // Default to 70 if deliveryCost is not specified
                    const subtotal = totalPrice + deliveryCost;

                    return (
                        <div key={order.transactionId} className='w-full p-6 rounded-md bg-white shadow-lg'>
                            {/* <style>
                                {`
                * {
                    color: #000 !important;
                    background-color: #fff !important;
                }
                `}
                            </style> */}

                            <div className='flex flex-col md:flex-row md:justify-between w-full gap-2'>
                                <div>
                                    <p className='text-sm text-gray-400'>Order #{order.transactionId}</p>
                                    <p className='text-sm text-gray-400'>Placed on {formatDate(order.orderCreationDate)}</p>
                                </div>
                                <p className='text-green-500 text-sm md:w-64'>Estimated Delivery {order.estimatedDelivery}</p>
                            </div>
                            <div className='w-full flex flex-col gap-3 pt-4'>
                                {order.products.map((product) => (
                                    <div to={`/books/${product.bookId}`} key={product.bookId} className='w-full flex justify-between gap-4 border-b p-6 rounded-md items-center hover:shadow-md'>
                                        <div className='flex gap-2 items-center'>
                                            <img className='w-10 h-10' src={product.image} alt="" />
                                            <div>
                                                <h3 className='font-medium'>{product.bookName}</h3>
                                                <p className='text-xs text-gray-500'>{product.publications}</p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-1 items-center justify-center w-[20%]'>
                                            <p>{product.discountedPrice}tk</p>
                                            {order.orderStatus === 'Delivered' && !product.reviews && (
                                                <button onClick={() => {
                                                    handleGiveRivew(order._id, product.bookId)
                                                }} className='text-blue-500 text-center text-xs md:text-sm px-2 py-1 hover:bg-slate-50 bg-slate-100 rounded-sm'>
                                                    Give Review
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-between   items-center'>
                                {/* <Link to={`/invoice/${order?.transactionId}`} className='bg-green-500 hover:bg-green-600 px-2 py-1 text-xs text-white rounded-md font-medium'>Invoice</Link> */}

                                <a href={`/invoice/${order?.transactionId}`} target='blank'
                                    className='bg-green-500 hover:bg-green-600 px-2 py-1 text-xs text-white rounded-md font-medium'>Invoice</a>
                                <p className={`text-xs w-fit font-semibold text-white badge ${getBadgeClass(order.orderStatus)}`}>{order.orderStatus}</p>
                                <div className="flex flex-col  w-40 items-end  pr-4 pt-4 text-sm text-gray-600">
                                    <p>Total Price: {totalPrice}tk</p>
                                    <p className="border-b border-gray-400">Delivery Cost: + {deliveryCost}tk</p>
                                    <p>SubTotal: = {subtotal}tk</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderHistory;
