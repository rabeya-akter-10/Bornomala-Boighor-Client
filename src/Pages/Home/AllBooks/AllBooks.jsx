import { Link } from "react-router-dom";
import Bookcard from "../../../Components/BookCard/Bookcard";
import UseAllBooks from "../../../Hooks/UseAllBooks";

const AllBooks = () => {
    const { books } = UseAllBooks();
    const slices = books.slice(0, 12);

    return (
        <div>
            <h1 className="text-center text-green-600 text-xl py-8">
                সমস্ত বই সমুহ
            </h1>

            <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 md:gap-6 gap-4 py-6 mx-auto w-fit">
                {slices.map((book) => (
                    <Bookcard key={book._id} book={book}></Bookcard>
                ))}
            </div>

            <div className="w-fit mx-auto pb-8 text-warning hover:underline cursor-pointer font-medium text-xs">
                <Link to="/books">See More</Link>
            </div>
        </div>
    );
};

export default AllBooks;
