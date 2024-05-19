import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import AwesomeStarsRating from 'react-awesome-stars-rating';
import toast, { Toaster } from 'react-hot-toast';
import useAuth from '../../Hooks/UseAuth';
import CustomLoader from '../../Components/CustomLoader/CustomLoader';
import wait from '../../assets/please_wait.gif';

const GiveAReview = () => {
    const { bookId } = useParams();
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [axiosSecure] = UseAxiosSecure();
    const navigate = useNavigate();

    const imageHostingUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;

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
        setOrderId(orderData);
    }, [bookId]);

    const onSubmit = (e) => {
        e.preventDefault();
        setUploading(true);
        const comment = e.target.comment.value;
        const imageFile = e.target.image.files[0];

        if (!imageFile) {
            toast.error("Please select an image file.");
            setUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        fetch(imageHostingUrl, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgResponse) => {
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.display_url;

                    const review = {
                        rating,
                        comment,
                        image: imgUrl,
                        userEmail: user?.email,
                        userName: user?.displayName,
                        bookId,
                        orderId
                    };

                    axiosSecure.post(`/reviews`, review)
                        .then(() => {
                            setUploading(false);
                            toast.success('Review submitted successfully!');
                            setTimeout(() => {
                                navigate('/order-history');
                            }, 500);
                        })
                        .catch((error) => {
                            setUploading(false);
                            console.error('Error submitting review:', error);
                        });
                }
            });
    };

    // Scroll to top
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    if (!book) {
        return <CustomLoader />; // Placeholder for loading state
    }

    return (
        <div className="container mx-auto p-4">
            {uploading && (
                <div className='fixed flex w-full justify-center items-center h-full top-0 left-0 z-40 bg-white'>
                    <img className='md:w-52 md:h-40' src={wait} alt="Please wait" />
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4">Review for {book.title}</h1>
            <div className="mb-4">
                <img src={book?.image} alt={book?.title} className="w-24 object-cover" />
                <p className="mt-2 text-lg">{book?.bookName}</p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Rating:
                    </label>
                    <AwesomeStarsRating
                        value={rating}
                        name="rating"
                        onChange={(value) => setRating(value)}
                        size={24}
                        isHalf={false} // Use integer values
                        className="rating"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Image:
                    </label>
                    <input
                        type='file'
                        name='image'
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Comment:
                    </label>
                    <textarea
                        name='comment'
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
            <Toaster />
        </div>
    );
};

export default GiveAReview;
