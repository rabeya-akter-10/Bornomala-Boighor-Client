import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AwesomeStarsRating from 'react-awesome-stars-rating';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../Hooks/UseAuth';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';

const GiveAReview = () => {
    const { bookId } = useParams(); // Get book ID from URL params
    const { user } = useAuth()
    const [rating, setRating] = useState(0); // State to store rating
    const [comment, setComment] = useState(''); // State to store comment
    const [orderId, setorderId] = useState(null); // State to store comment

    const [axiosSecure] = UseAxiosSecure();
    const navigate = useNavigate()

    // Get book details
    const { data: book = {}, refetch: bookRefetch } = useQuery({
        queryKey: ["book", bookId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books/${bookId}`);
            return res.data;
        },
    });

    useEffect(() => {
        const data = localStorage.getItem("data");
        const orderData = JSON.parse(data);
        setorderId(orderData);
    }, [bookId])

    console.log(orderId);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const review = {
            rating,
            comment,
            bookId,
            userEmail: user?.email,
            userName: user?.displayName,
            orderId

        }

        try {
            // Submit review to backend
            const response = await axiosSecure.post(`/reviews`, review);
            toast.success('Review submitted successfully!');
            setTimeout(() => {
                navigate('/order-history')
            }, 500);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (!book) {
        return <CustomLoader></CustomLoader> // Placeholder for loading state
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Review for {book.title}</h1>
            <div className="mb-4">
                <img src={book?.image} alt={book?.title} className="w-36 object-cover" />
                <p className="mt-2 text-lg">{book?.bookName}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Rating:
                    </label>
                    <AwesomeStarsRating
                        value={rating}
                        onChange={(value) => setRating(value)}
                        size={24}
                        isHalf={false} // Use integer values
                        className="rating"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Comment:
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full h-40 md:h-20 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit Review
                </button>
            </form>
            <Toaster></Toaster>
        </div>
    );
};

export default GiveAReview;
