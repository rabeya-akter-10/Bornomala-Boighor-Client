import React, { useEffect, useState } from "react";
import UseBooks from "../../Hooks/UseBooks";
import Bookcard from "../../Components/BookCard/Bookcard";
import Pagination from "../../Components/Pagination/Pagination";
import CustomLoader from "../../Components/CustomLoader/CustomLoader";
import { data } from "autoprefixer";
import { settings } from "firebase/analytics";

const Books = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);



    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetch(`https://bornomala-boighor-server.vercel.app/books?page=${currentPage}`).then(res => res.json()).then(data => {
            setBooks(data.books)
            setTotalPages(data.totalPages)
            setLoading(false)
        })
    }, [currentPage])

    if (loading) {
        return <CustomLoader />;
    }

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    return (
        <div>
            <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 md:gap-6 gap-4 pt-4 mx-auto w-fit mb-8">
                {books?.map((book) => (
                    <Bookcard key={book._id} book={book}></Bookcard>
                ))}
            </div>

            <div className="w-full flex justify-end md:px-20 py-5 px-6">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default Books;
