import React from "react";
import { useParams } from "react-router-dom";
import Bookcard from "../../Components/BookCard/Bookcard";
import UseAllBooks from "../../Hooks/UseAllBooks";

const Writers = () => {
    const { writer } = useParams();
    const { books } = UseAllBooks();
    const filteredBooks = books.filter((book) => book.writerName == writer);

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    return (
        <div>
            <h1 className="text-green-600 text-center text-xl py-4">
                {writer}
            </h1>
            <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 md:gap-6 gap-4 py-6 mx-auto w-fit">
                {filteredBooks.map((book) => (
                    <Bookcard key={book._id} book={book}></Bookcard>
                ))}
            </div>
        </div>
    );
};

export default Writers;
