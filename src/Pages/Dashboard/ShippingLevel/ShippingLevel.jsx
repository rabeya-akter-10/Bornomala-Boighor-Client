import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import paid from '../../../assets/paid.png';
import logo from '../../../assets/logo.png';
import { FaAddressCard, FaDownload, FaGlobe, FaMapLocationDot, FaMobile } from 'react-icons/fa6';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import JsBarcode from 'jsbarcode';

const ShippingLevel = () => {
    const params = useParams();
    const transactionId = params.transactionId;
    const pdfRef = useRef(null);
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
            const pdf = new jsPDF('p', 'mm', 'a5', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 25.4, 25.4, pdfWidth - 50.8, pdfHeight - 50.8);
            pdf.save(`Bornomala Invoice-${transactionId}.pdf`);
        }).catch((error) => {
            console.error('Error generating PDF:', error);
        });
    };

    const cusAdd = `${order?.client?.address?.division}, ${order?.client?.address?.district}, ${order?.client?.address?.postCode} `;

    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            JsBarcode(canvasRef.current, `${transactionId}`, {
                format: "CODE128",
                lineColor: "#000",
                width: 2,
                height: 100,
                displayValue: true
            });
        }
    }, [order]); // Call JsBarcode whenever order changes

    if (!order) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <h1>Generating...</h1>
            </div>
        );
    }

    return (
        <div className='py-4 flex flex-col justify-between px-2 max-w-7xl mx-auto '>
            <div className='w-full flex items-end h-fit justify-center my-8'>
                <button onClick={downloadPdf} className='px-4 btn btn-sm btn-primary '>Download <FaDownload /></button>
            </div>

            <div className='border w-fit mx-auto p-10 text-xs'>
                <div ref={pdfRef} className='pdf-content'>
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
                            width: calc(148mm - 2 * 25.4mm); 
                            height: calc(210mm - 2 * 12.7mm); 
                            box-sizing: border-box;
                            font-size: 12pt;
                        }
                        `}
                    </style>

                    <div className='text-xs pb-6 w-full space-y-4'>
                        <div>
                            <img className='w-40 pb-4' src={logo} alt="" />
                            <div className='space-y-1'>
                                <p className='flex items-center gap-1'><FaMapMarkerAlt /> Address: Mirpur 10, Block D, Dhaka</p>
                                <p className='flex items-center gap-1'><FaPhoneAlt /> Mobile: +8801644976404</p>
                                <p className='flex items-center gap-1 pb-2'><FaGlobe /> Website: <a href="https://bornomala-mart.web.app">https://bornomala-mart.web.app</a></p>
                            </div>
                            <hr />
                        </div>
                        <div className='w-full flex flex-col gap-4 justify-between'>
                            <div className='font-semibold space-y-1 w-[70%]'>
                                <p className='underline text-sm font-semibold'>Customer Info:</p>
                                <p className='font-semibold'> Name: {order.client?.name}</p>
                                <p>Phone: {order?.client?.phone}</p>
                                <p> Address: {cusAdd}</p>
                                <p>Area/Street: {order?.client?.address?.street}</p>
                            </div>
                            <div className=' space-y-1 w-[100%]'>
                                <p className='underline text-sm font-semibold'>Order Info:</p>
                                <p>Transaction Id: <span className='text-sm'> {order.transactionId}</span></p>
                                <p>Placed on {formatDate(order.orderCreationDate)}</p>
                                <p>Estimated Delivery {order.estimatedDelivery}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full rounded-md text-xs'>

                        <div>
                            <canvas ref={canvasRef}></canvas>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingLevel;
