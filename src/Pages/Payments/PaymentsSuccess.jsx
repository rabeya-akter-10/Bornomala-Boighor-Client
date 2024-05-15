import React from 'react';
import { FaArrowRight, FaArrowRightArrowLeft } from 'react-icons/fa6';
import { TiTick } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const PaymentsSuccess = () => {
    return (
        <div className='flex items-center justify-center w-full h-[80vh]'>
            <div className='w-full flex flex-col items-center gap-4 font-mono'>
                <TiTick className='w-16 h-16 bg-green-500 text-white font-semibold rounded-full text-center ' />
                <div className='text-center px-4'>
                    <h1 className='text-2xl text-success text-center'>Payment Done.</h1>
                    <p className='text-gray-400'>Thank you for completing your secure online payment.</p>
                    <p>Have a great day!</p>
                </div>
                <Link to={'/order-history'}
                    className="uppercase font-medium text-white bg-orange-500 rounded-sm hover:bg-orange-600 px-4 py-2 flex items-center gap-2"
                >Order History <FaArrowRight /> </Link>
            </div>
        </div>
    );
};

export default PaymentsSuccess;