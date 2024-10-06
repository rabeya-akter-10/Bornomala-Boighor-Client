import { Link } from "react-router-dom";
import Bookcard from "../../../Components/BookCard/Bookcard";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MostViewed = () => {

    const [axiosSecure] = UseAxiosSecure();
    // get most viewed books
    const { data: MostViewedBooks = [], refetch: MostViewedBooksRefetch } = useQuery({
        queryKey: ["MostViewedBooks"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/most-viewed`);
            return res.data;
        },
    });

    return (
        <div>
            <h1 className="text-center text-green-600 text-xl py-8">
                সর্বাধিক দেখা বই
            </h1>

            <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 md:gap-6 gap-4 py-6 mx-auto w-fit">
                {MostViewedBooks.map((book) => (
                    <Bookcard key={book._id} book={book}></Bookcard>
                ))}
            </div>

        </div>
    );
};

export default MostViewed;
