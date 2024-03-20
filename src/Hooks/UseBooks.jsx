import UseAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseBooks = () => {
    const [axiosSecure] = UseAxiosSecure();
    // Get books
    const { data: books = [], refetch: booksRefetch } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            return res.data;
        },
    });
    console.log(books);
    return { booksRefetch, books };
};

export default UseBooks;
