import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import paid from '../../assets/paid.png'
import logo from '../../assets/logo.png'
import { FaAddressCard, FaDownload, FaGlobe, FaMapLocationDot, FaMobile } from 'react-icons/fa6';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Invoice = () => {
    const params = useParams();
    const transactionId = params.transactionId;
    const pdfRef = useRef();

    const [axiosSecure] = UseAxiosSecure();

    // Get orders
    const { data: order = null, refetch: orderRefetch } = useQuery({
        queryKey: ["order", transactionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/transId/${transactionId}`);
            return res.data;
        },
    });

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

    const downloadPdf = () => {
        const input = pdfRef.current;
        html2canvas(input, { useCORS: true, scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 25.4, 25.4, pdfWidth - 50.8, pdfHeight - 50.8);
            pdf.save(`Bornomala Invoice-${transactionId}.pdf`);
        }).catch((error) => {
            console.error('Error generating PDF:', error);
        });
    };

    const cusAdd = `${order?.client?.address?.division}, ${order?.client?.address?.district}, ${order?.client?.address?.postCode} `

    if (!order) {
        return <div>Loading...</div>; // Or any loading state you prefer
    }


    return (
        <div className='py-4 flex flex-col justify-between px-2 max-w-7xl mx-auto '>
            {/* <div>
                <Link className='btn btn-sm text-white' to={'/order-history'}>Back</Link>
            </div> */}
            <div className='w-full flex items-end h-fit justify-center my-8'>
                <button onClick={downloadPdf} className='px-4 btn btn-sm btn-primary '>Download <FaDownload></FaDownload> </button>
            </div>

            <div className='border w-fit mx-auto p-20 text-xs' >
                <div div ref={pdfRef} className='pdf-content' >
                    <style>
                        {`
                * {
                    color: #000 !important;
                    background-color: #fff !important;
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                .pdf-content {
                    margin: 0 auto;
                    width: calc(210mm - 2 * 25.4mm); 
                    height: calc(297mm - 2 * 12.7mm); 
                    box-sizing: border-box;
                    font-size: 12pt;
                }
                `}
                    </style>

                    <div className='text-xs pb-6 w-full space-y-4'>
                        <div className=''>
                            <img className='w-40 pb-4' src={logo} alt="" />
                            <div className='space-y-1'>
                                <p className='flex items-center gap-1'><FaMapMarkerAlt></FaMapMarkerAlt> Address: Mirpur 10,Block D,Dhaka</p>
                                <p className='flex items-center gap-1'><FaPhoneAlt></FaPhoneAlt> Mobile: +8801644976404</p>
                                <p className='flex items-center gap-1 pb-2'><FaGlobe></FaGlobe> Website: <a href="https://bornomala-mart.web.app">https://bornomala-mart.web.app</a></p>
                            </div>
                            <hr />
                        </div>
                        <div className='w-full flex gap-4 justify-between'>
                            <div className='font-semibold space-y-1 w-[50%]'>
                                <p className='underline text-sm font-semibold'>Customer Info:</p>
                                <p className='font-semibold'> Name: {order.client?.name}</p>
                                <p>Phone: {order?.client?.phone}</p>
                                <p> Address: {cusAdd}</p>
                                <p>Area/Street: {order?.client?.address?.street}</p>
                            </div>
                            <div className=' space-y-1 w-[50%]'>
                                <p className='underline text-sm  font-semibold'>Order Info:</p>
                                <p >Transaction Id: <span className='text-sm'> {order.transactionId}</span></p>
                                <p >Placed on {formatDate(order.orderCreationDate)}</p>
                                <p >Estimated Delivery {order.estimatedDelivery}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full rounded-md text-xs'>

                        <div className='w-full flex flex-col gap-3 pt-4'>
                            {order?.products?.map((product) => (
                                <div key={product.bookId} className='w-full flex justify-between gap-4 border-b p-2 items-center '>
                                    <div className='flex gap-2 items-center'>
                                        <img className='w-10 h-10' src={product.image} alt={product.bookName} />
                                        <div>
                                            <h3 className='font-medium py-[4px]'>{product.bookName}</h3>
                                            <p className='text-xs py-[4px]'>{product.publications}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between w-[25%]'>
                                        <p>{product?.itemCount}pcs</p>
                                        <p>{product.discountedPrice}*{product?.itemCount}={product.itemCount * product.discountedPrice}tk</p>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <div className='flex w-full justify-end items-center text-xs'>
                            <div className="relative w-full flex flex-col items-end pr-2 pt-4  text-gray-600">
                                <p className=' py-[4px]'>Total Price: {order?.totalPrice}tk</p>
                                <p className=" py-[4px]">Delivery Cost: + {order?.deliveryCost}tk</p>
                                <hr className='w-40 mt-2' />
                                <p >SubTotal: = {order?.totalPrice + order?.deliveryCost}tk</p>

                                <img className='absolute left-48 w-28' src={paid} alt="" />
                            </div>
                        </div>
                    </div>

                </div >
            </div>

        </div >
    );
};

export default Invoice;
