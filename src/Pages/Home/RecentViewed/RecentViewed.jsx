import React, { useEffect, useState } from 'react';
import Bookcard from '../../../Components/BookCard/Bookcard';

const RecentViewed = () => {
    const [recentBooks, setRecentBooks] = useState([]);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('recentViewed')) || [];
        const sortedBooks = storedBooks.sort((a, b) => b.viewedIn - a.viewedIn);
        setRecentBooks(sortedBooks);
    }, []);


    return (
        <div>
            {recentBooks?.length > 0 && (
                <div>
                    <h1 className="text-center text-green-600 text-xl py-8">
                        সর্বশেষ আপনার দেখা বই
                    </h1>

                    <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 md:gap-6 gap-4 py-6 mx-auto w-fit">
                        {recentBooks.map((book) => (
                            <Bookcard key={book._id} book={book}></Bookcard>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentViewed;
