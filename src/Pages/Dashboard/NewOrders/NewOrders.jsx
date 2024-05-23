import React from 'react';
import UseOrderByStatus from '../../../Hooks/UseOrderByStatus';
import { Link } from 'react-router-dom';
import { PiPackageFill } from 'react-icons/pi';
import { RiNewspaperLine } from 'react-icons/ri';
import { TbFileBarcode } from 'react-icons/tb';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const NewOrders = () => {
    const { orders, ordersRefetch } = UseOrderByStatus("processing")
    const [axiosSecure] = UseAxiosSecure();
    const handlePacked = (id) => {
        const update = {
            orderStatus: "To-Shipped"
        }

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/orders/status/${id}`, update).then((response) => {
                    if (response.data.acknowledged) {
                        ordersRefetch();
                        Swal.fire({
                            icon: "success",
                            title: "Oder Status Changed Succesfully!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            }
        });
    }

    return (
        <div className='py-12 lg:py-0 bg-gray-50 px-4'>
            <h1 className='text-center text-2xl text-gray-400 font-semibold pt-10 font-mono'>Pending Orders: {orders?.length}</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto w-fit text-xs py-10'>
                {orders.map(order => (
                    <div key={order._id} className='relative w-[360px] md:w-[300px]  h-52 bg-white rounded-lg p-4 shadow-sm shadow-sky-400 border-r-4  border-b-4 border-sky-400'>
                        <div className='pb-2'>
                            <p className=' text-gray-400'>Customer: <span className='text-black'> {order?.client.name}</span></p>
                            <p className='text-gray-400'>TransactionID: <Link to={`/dashboard/order/${order?.transactionId}`} className='text-sky-400 font-semibold'> {order?.transactionId}</Link></p>
                            <div className='flex justify-between'>
                                <p className='text-gray-400'>Price: <span className='text-green-500 font-semibold text-sm'> {order?.totalPrice}tk</span></p>

                                <button onClick={() => {
                                    handlePacked(order?._id)
                                }} className='bg-green-500 px-2 py-1 rounded-md text-white uppercase font-medium hover:bg-green-600 flex items-center gap-1'>Packed <PiPackageFill className='text-lg' /> </button>

                            </div>
                        </div>
                        {
                            order?.products?.map((p, index) => <ul key={index} className='list-disc'>
                                <li className='flex justify-between items-center font-medium border-b'>
                                    <p className=''>{index + 1}. {p.bookName}</p>  <p className=''>{p?.itemCount}pcs</p>
                                </li>
                            </ul>)
                        }
                        <div className='absolute right-4 bottom-4 flex'>
                            <Link className='bg-blue-400 px-2 py-1 rounded-md text-white uppercase font-medium hover:bg-blue-600 flex items-center gap-1 text-md'>Details <RiNewspaperLine /> </Link>
                        </div>
                        <div className='absolute left-4 bottom-4 flex'>
                            <a
                                href={`/shipping-level/${order?.transactionId}`}
                                className='bg-yellow-400 px-2 py-1 rounded-md text-white uppercase font-medium hover:bg-yellow-600 flex items-center gap-1 text-sm'
                            >
                                <TbFileBarcode />
                            </a>
                        </div>

                    </div>
                ))}
            </div>
        </div >
    );
};

export default NewOrders;