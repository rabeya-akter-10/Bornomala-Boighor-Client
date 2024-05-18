import React from 'react';
import UserOrderHistory from '../../Hooks/UserOrderHistory';
import useAuth from '../../Hooks/UseAuth';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const { user } = useAuth();
    const email = user?.email;
    const { orders, ordersRefetch } = UserOrderHistory(email);


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

    if (!orders.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-green-100 bg-opacity-50 min-h-[88vh]'>
            <h1 className='text-center py-6 text-xl text-gray-400 font-medium'>Orders</h1>
            <div className='max-w-3xl mx-auto w-full px-4 flex flex-col items-center gap-4 pb-12'>
                {orders.map((order) => {
                    const totalPrice = calculateTotalPrice(order.products);
                    const deliveryCost = order.deliveryCost || 70; // Default to 70 if deliveryCost is not specified
                    const subtotal = totalPrice + deliveryCost;

                    return (
                        <div key={order.transactionId} className='w-full p-6  rounded-md bg-white shadow-lg'>
                            <div className='flex flex-col md:flex-row  md:justify-between w-full gap-2'>
                                <div>
                                    <p className='text-sm text-gray-400'>Order #{order.transactionId}</p>
                                    <p className='text-sm text-gray-400'>Placed on {formatDate(order.orderCreationDate)}</p>
                                </div>
                                <p className='text-green-500 text-sm md:w-64'>Estimated Delivery {order.estimatedDelivery}</p>
                            </div>
                            <div className='w-full flex flex-col gap-3'>
                                {order.products.map((product) => (
                                    <Link to={`/books/${product.bookId}`} key={product.bookId} className='w-full flex justify-between gap-4 border-b p-6 rounded-md items-center hover:shadow-md'>
                                        <div className='flex gap-2 items-center'>
                                            <img className='w-10 h-10' src={product.image} alt="" />
                                            <div className=''>
                                                <h3 className='font-medium'>{product.bookName}</h3>
                                                <p className='text-xs text-gray-500'>{product.publications}</p>
                                            </div>
                                        </div>
                                        <p>{product.discountedPrice}tk</p>
                                    </Link>
                                ))}
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className={`text-xs font-semibold text-white badge ${getBadgeClass(order.orderStatus)}`}>{order.orderStatus}</p>
                                <div className="flex flex-col items-end lg:pr-72 pr-4 pt-4 text-sm text-gray-600">
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
