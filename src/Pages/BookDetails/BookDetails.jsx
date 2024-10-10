import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import Bookcard from "../../Components/BookCard/Bookcard";
import ReviewCard from "../../Components/ReviewCard/RevirewCard"; // Ensure this matches the file name
import UseHandleAddCart from "../../Hooks/UseHandleAddCart";
import { FaEye } from "react-icons/fa";

const BookDetails = () => {
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [books, setBooks] = useState([]);
    const [viewCount, setViewCount] = useState(0);
    const [error, setError] = useState(null); // Error state for handling fetch errors
    const loadedBook = useLoaderData();
    const { handleAddCart } = UseHandleAddCart(book);
    const [ip, setIp] = useState('')

    // Fetch book details and set it to state
    useEffect(() => {
        if (loadedBook) {
            setBook(loadedBook);
            setLoading(false);
        }
    }, [loadedBook]);

    // Fetch reviews for the book
    useEffect(() => {
        if (loadedBook?._id) {
            fetch(`https://bornomala-boighor-server.vercel.app/reviews/books/${loadedBook._id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch reviews.');
                    }
                    return res.json();
                })
                .then(data => setReviews(data))
                .catch(err => {
                    console.error(err);
                    setError('Failed to fetch reviews.');
                });
        }
    }, [loadedBook]);

    // Fetch related books based on category
    useEffect(() => {
        if (book.category) {
            fetch(`https://bornomala-boighor-server.vercel.app/all-books`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch related books.');
                    }
                    return res.json();
                })
                .then(data => {
                    const filteredBooks = data.filter(b => b.category === book.category);
                    setBooks(filteredBooks.slice(0, 4)); // Fetch 4 related books
                })
                .catch(err => {
                    console.error(err);
                    setError('Failed to fetch related books.');
                });
        }
    }, [book.category]);

    // Increment the view count on page load
    useEffect(() => {
        const fetchIpAndTrackView = async () => {
            try {
                const ipRes = await fetch('https://api.ipify.org/?format=json');
                const ipData = await ipRes.json();
                setIp(ipData.ip);

                if (loadedBook?._id) {
                    const viewRes = await fetch('https://bornomala-boighor-server.vercel.app/book/view', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ bookId: loadedBook._id, ipAddress: ipData.ip, bookName: loadedBook.bookName }), // Use fetched IP address here
                    });
                    const viewData = await viewRes.json();
                    if (viewData?.viewCount) {
                        setViewCount(viewData?.viewCount); // Update view count state
                    }
                }
            } catch (error) {
                console.error('Error tracking views:', error);
            }
        };

        fetchIpAndTrackView();
    }, [loadedBook]);

    // Handle recent books in localStorage
    useEffect(() => {
        const handleRecentBooks = () => {
            const recentViewed = JSON.parse(localStorage.getItem('recentViewed')) || [];

            const bookData = {
                _id: book?._id,
                bookName: book?.bookName,
                image: book?.image,
                sold: book?.sold,
                writerName: book?.writerName,
                price: book?.price,
                discounts: book?.discounts,
                viewCount: book?.viewCount,
                viewedIn: Date.now()
            };

            // Check if the book is already in the recentBooks array
            const isBookInRecent = recentViewed.some(b => b._id === book._id);

            if (!isBookInRecent) {
                // If the array has 6 books, remove the first book
                if (recentViewed.length === 6) {
                    recentViewed.shift();
                }

                // Add the new book to the array
                recentViewed.push(bookData);

                // Save the updated array to localStorage
                localStorage.setItem('recentViewed', JSON.stringify(recentViewed));
            }
        };

        if (book._id) {
            handleRecentBooks();
        }
    }, [book]);

    const { bookName, image, sold, writerName, price, discounts, descriptions, category } = book;
    const discountPrice = price - price * (discounts / 100);
    const roundPrice = Math.ceil(discountPrice);

    if (loading || !book) {
        return <CustomLoader />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Display error message
    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    return (
        <div className="w-full flex lg:flex-row flex-col py-4 relative min-h-[101vh]">
            <div className="lg:w-4/6 mx-auto flex flex-col">
                {/* Book details section */}
                <div className="mx-auto flex flex-col md:flex-row">
                    {/* Book image */}
                    <div className="w-96 h-fit md:w-full mx-auto relative">
                        <img className="max-w-sm w-72 h-[420px] mx-auto" src={image} alt={bookName} />
                        {book?.discounts > 0 && (
                            <div className="absolute z-10 bg-green-600 w-20 h-20 rounded-es-badge flex items-center justify-center -bottom-0 -right-0 text-white text-2xl font-bold">
                                <p className="leading-none">
                                    <span className="m-0 leading-none">{book?.discounts}%</span>
                                    <br />
                                    <span className="leading-none">Off</span>
                                </p>
                            </div>
                        )}
                    </div>
                    {/* Book details */}
                    <div className="lg:pt-20 w-full p-4">
                        <p className="text-2xl font-medium text-[#757575]">{bookName}</p>
                        <p>By: <Link to={`/writers/${writerName}`} className="text-blue-500 cursor-pointer hover:underline">{writerName}</Link></p>
                        <p>Category: <Link to={`/categories/${category}`} className="cursor-pointer hover:underline">{category}</Link></p>
                        <div className="flex gap-2 text-xl font-medium items-center">
                            {book?.discounts > 0 && <p className="line-through text-red-500">TK.{book?.price}</p>}
                            <p className="text-green-500">TK.{roundPrice}</p>
                            {discounts > 0 && <p className="text-xs">You save {discounts}%</p>}
                        </div>
                        {sold > 0 && <p className="text-xs text-warning font-medium">Sold: {sold}</p>}
                        {viewCount > 0 && <p className="text-xs text-gray-500 flex items-center gap-2 pt-2 font-medium"><FaEye></FaEye> {viewCount}</p>}
                        <div>
                            {book.quantity > 0 ? (
                                <button
                                    onClick={handleAddCart}
                                    className="w-fit px-4 py-1 my-4 bg-green-600 hover:bg-green-700 z-40 text-white opacity-100 rounded-sm"
                                >
                                    Add to cart
                                </button>
                            ) : (
                                <p className="py-4 text-red-500">Out of stock</p>
                            )}
                        </div>
                        <p className="text-xs py-8 text-[#757575]">{descriptions}</p>
                    </div>
                </div>

                {/* Reviews section */}
                <div>
                    <p className="px-4 text-xl text-warning py-5 font-medium underline">Reviews: {reviews.length}</p>
                    {reviews.map(r => <ReviewCard key={r._id} review={r} />)}
                </div>
            </div>

            <hr className="m-4 lg:hidden" />

            {/* Related books section */}
            <div className="lg:w-2/6 w-full">
                <h1 className="text-center text-green-600 py-4">From Same Category</h1>
                <div className="grid lg:absolute bg-white top-12 md:grid-cols-4 lg:border-l grid-cols-2 md:gap-6 lg:grid-cols-2 gap-4 py-6 px-4 mx-auto w-fit">
                    {books.map(b => (
                        <Bookcard book={b} key={b._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
