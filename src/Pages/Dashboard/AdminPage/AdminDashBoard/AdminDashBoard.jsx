import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaBox, FaCarAlt, FaCarBattery, FaPlus, FaTruck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { LuClipboardList } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { MdOutlineManageHistory } from 'react-icons/md';

const AdminDashBoard = () => {
    const [pending, setPending] = useState([])
    const [toShipped, setToShipped] = useState([])
    const [delivered, setDelivared] = useState([])
    const [canceled, setcaceled] = useState([])

    const [axiosSecure] = UseAxiosSecure();
    // get Cart
    const { data: orders = [], refetch: ordersRefetch } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders`);
            return res.data;
        },
    });

    useEffect(() => {

        const ProcessingOrders = orders.filter(order => order.orderStatus == "Processing")
        const toShip = orders.filter(order => order.orderStatus == "To Shipped")
        const deliverd = orders.filter(order => order.orderStatus == "Delivered")
        const canceled = orders.filter(order => order.orderStatus == "Canceled")

        setPending(ProcessingOrders);
        setToShipped(toShip);
        setDelivared(deliverd);
        setcaceled(canceled);

    }, [orders])

    return (
        <div className='bg-[#f9fbfd] w-full min-h-screen py-10'>
            {/* Orders */}
            <div className='w-fit mx-auto px-4 mt-4'>
                <h1 className='text-2xl text-gray-500 py-6 text-center uppercase'>Manage Orders</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-2 w-fit mx-auto'>
                    <Link to={'/dashboard/new-orders'} className='bg-white hover:shadow-lg hover:scale-90 duration-300 text-sky-400 w-48 md:h-32 h-28 md:w-52 rounded-xl flex flex-col items-center gap-2 justify-center border-b-4  border-r-4 shadow-md  border-sky-400'>
                        <div className='flex items-center justify-center gap-3'>
                            <div className=' bg-sky-200  w-8 h-8  p-2 rounded-full flex items-center justify-center'>
                                <LuClipboardList className='text-sky-400' />
                            </div>
                            <p className='text-5xl'>{pending?.length}</p>
                        </div>
                        <p className='text-xl font-medium  text-center'>
                            New Orders
                        </p>
                    </Link>

                    <Link to={"/dashboard/to-shipped"} className='bg-white hover:shadow-lg hover:scale-90 duration-300 text-yellow-400 w-48 md:h-32 h-28 md:w-52 rounded-xl flex flex-col items-center gap-2 justify-center border-b-4  border-r-4 shadow-md  border-yellow-400'>
                        <div className='flex items-center justify-center gap-3'>
                            <div className=' bg-yellow-200  w-8 h-8  p-2 rounded-full flex items-center justify-center'>
                                <FaTruck className='text-yellow-400' />
                            </div>
                            <p className='text-5xl'>{toShipped?.length}</p>
                        </div>
                        <p className='text-xl font-medium  text-center'>
                            To Shipped
                        </p>
                    </Link>

                    <Link to={"/dashboard/delivered"} className='bg-white hover:shadow-lg hover:scale-90 duration-300 text-green-400 w-[188px] md:h-32 h-28 md:w-52 rounded-xl flex flex-col items-center gap-2 justify-center border-b-4  border-r-4 shadow-md  border-success'>
                        <div className='flex items-center justify-center gap-3'>
                            <div className=' bg-green-200  w-8 h-8  p-2 rounded-full flex items-center justify-center'>
                                <FaBox className='text-green-400' />
                            </div>
                            <p className='text-5xl'>{delivered?.length}</p>
                        </div>
                        <p className='text-xl font-medium  text-center'>
                            Delivered
                        </p>
                    </Link>


                    <Link to={'/dashboard/canceled'} className='bg-white hover:shadow-lg hover:scale-90 duration-300 text-red-400 w-48 md:h-32 h-28 md:w-52 rounded-xl flex flex-col items-center gap-2 justify-center border-b-4  border-r-4 shadow-md  border-red-400'>
                        <div className='flex items-center justify-center gap-3'>
                            <div className=' bg-red-200  w-8 h-8  p-2 rounded-full flex items-center justify-center'>
                                <FaXmark className='text-red-400' />
                            </div>
                            <p className='text-5xl'>{canceled?.length}</p>
                        </div>
                        <p className='text-xl font-medium  text-center'>
                            Canceled
                        </p>
                    </Link>
                </div>
            </div>

            {/* Manage Books */}

            {/* <div className='w-fit mx-auto px-4 mt-4'>
                <h1 className='text-2xl text-gray-500 py-6 text-center uppercase'>Manage Books</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 md:gap-5 gap-2 w-fit mx-auto'>
                    <Link to={'/dashboard/add-book'} className='bg-white hover:shadow-lg hover:scale-90 duration-300 text-sky-400 w-48 md:h-32 h-28 md:w-52 rounded-xl flex flex-col items-center gap-2 justify-center border-b-4  border-r-4 shadow-md  border-sky-400'>
                        <div className='flex items-center justify-center gap-3'>
                            <div className=' bg-sky-200  w-8 h-8  p-2 rounded-full flex items-center justify-center'>
                                <FaPlus className='text-sky-400' />
                            </div>

                        </div>
                        <p className='text-xl font-medium  text-center'>
                            Add New Book
                        </p>
                    </Link>

                    <Link to={"/dashboard/manage-books"} className='bg-white hover:shadow-lg hover:scale-90 duration-300 text-yellow-400 w-48 md:h-32 h-28 md:w-52 rounded-xl flex flex-col items-center gap-2 justify-center border-b-4  border-r-4 shadow-md  border-yellow-400'>
                        <div className='flex items-center justify-center gap-3'>
                            <div className=' bg-yellow-200  w-8 h-8  p-2 rounded-full flex items-center justify-center'>
                                <MdOutlineManageHistory className='text-yellow-400' />
                            </div>

                        </div>
                        <p className='text-xl font-medium  text-center'>
                            Manage Stocks
                        </p>
                    </Link>

                    <Link to={"/delivered"} className='bg-white hover:shadow-lg hover:scale-90 duration-300 text-green-400 w-[188px] md:h-32 h-28 md:w-52 rounded-xl flex flex-col items-center gap-2 justify-center border-b-4  border-r-4 shadow-md  border-success'>
                        <div className='flex items-center justify-center gap-3'>
                            <div className=' bg-green-200  w-8 h-8  p-2 rounded-full flex items-center justify-center'>
                                <FaBox className='text-green-400' />
                            </div>
                            <p className='text-5xl'>{delivered?.length}</p>
                        </div>
                        <p className='text-xl font-medium  text-center'>
                            Delivered
                        </p>
                    </Link>


                    <Link to={'/canceled'} className='bg-white hover:shadow-lg hover:scale-90 duration-300 text-red-400 w-48 md:h-32 h-28 md:w-52 rounded-xl flex flex-col items-center gap-2 justify-center border-b-4  border-r-4 shadow-md  border-red-400'>
                        <div className='flex items-center justify-center gap-3'>
                            <div className=' bg-red-200  w-8 h-8  p-2 rounded-full flex items-center justify-center'>
                                <FaXmark className='text-red-400' />
                            </div>
                            <p className='text-5xl'>{canceled?.length}</p>
                        </div>
                        <p className='text-xl font-medium  text-center'>
                            Canceled
                        </p>
                    </Link>
                </div>
            </div> */}


        </div>
    );
};

export default AdminDashBoard;