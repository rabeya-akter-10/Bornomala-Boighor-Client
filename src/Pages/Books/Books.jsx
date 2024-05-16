import React from "react";
import UseBooks from "../../Hooks/UseBooks";
import Bookcard from "../../Components/BookCard/Bookcard";

const Books = () => {
    const { books } = UseBooks();

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
    return (
        <div>
            <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 md:gap-6 gap-4 pt-4 mx-auto w-fit mb-8">
                {books.map((book) => (
                    <Bookcard key={book._id} book={book}></Bookcard>
                ))}
            </div>
        </div>
    );
};

export default Books;
