import React from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import useAuth from '../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import './Reviews.css';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'; // Ensure you import the default styles

const Reviews = () => {
    const { user } = useAuth();
    const email = user?.email;
    const [axiosSecure] = UseAxiosSecure();

    // Get reviews
    const { data: reviews = null, refetch: reviewsRefetch } = useQuery({
        queryKey: ["reviews", email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${email}`);
            return res.data;
        },
    });

    // Get books
    const { data: books = null, refetch: booksRefetch } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            return res.data;
        },
    });

    const getBookName = (bookId) => {
        const book = books.find(book => book._id === bookId);
        return book ? book.bookName : "Book not found";
    };

    return (
        <div className="reviews-container p-4">
            <h1 className="text-center text-2xl font-bold mb-4 text-gray-500"> Reviews</h1>
            <div className="reviews-list grid gap-4">
                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="review-card p-4 border rounded-lg shadow-lg">
                            <div className="review-content mb-4">
                                <p className="text-lg font-semibold">{getBookName(review.bookId)}</p>
                                <div className="flex items-center gap-1 mb-2">
                                    <Rating value={review.rating} readOnly style={{ maxWidth: 100 }} />
                                </div>
                                <h2 className="review-comment text-gray-700">{review.comment}</h2>
                            </div>
                            {review.image && <img className="w-full max-w-xs rounded-lg" src={review.image} alt="Review" />}
                        </div>
                    ))
                ) : (
                    <p className="no-reviews-message text-center text-gray-500">No reviews found.</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;
