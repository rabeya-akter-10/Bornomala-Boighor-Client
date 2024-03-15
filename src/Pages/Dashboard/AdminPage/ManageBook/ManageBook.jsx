import React from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageBook = () => {
    const [axiosSecure] = UseAxiosSecure();
    // get all Books
    const { data: books = [], refetch: booksRefetch } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            return res.data;
        },
    });

    // Function to handle book deletion
    const handleDeleteBook = async (bookId) => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        // If user confirms deletion
        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/books/${bookId}`);
                // If deletion is successful, refetch the books data
                await booksRefetch();
                // Show success message
                Swal.fire("Deleted!", "Your book has been deleted.", "success");
                booksRefetch();
            } catch (error) {
                console.error("Error deleting book:", error);
                // Show error message
                Swal.fire("Error!", "Failed to delete book.", "error");
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-center font-medium text-lg underline text-green-900">
                All books : {books?.length}
            </h1>

            <div>
                <div className="overflow-x-auto py-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>
                                    Name <br />
                                    Category
                                </th>
                                <th>
                                    Price <br />
                                    Discounts
                                </th>
                                <th>
                                    Writer
                                    <br />
                                    Publications
                                </th>
                                <th>
                                    Quantity <br />
                                    Sold
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((b, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className=" w-10 h-12 rounded-sm hover:scale-[3] hover:z-20">
                                                    <img
                                                        src={b?.image}
                                                        alt="b.bookName"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-xs">
                                                    {b?.bookName}
                                                </div>
                                                <div className="text-xs opacity-50">
                                                    {b?.category}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-xs">
                                        TK.{b?.price}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">
                                            {b?.discounts}%
                                        </span>
                                    </td>
                                    <td className="text-xs">
                                        {b?.writerName}
                                        <br />
                                        <span className="opacity-60">
                                            {" "}
                                            {b?.publications}
                                        </span>
                                    </td>
                                    <td>
                                        <p className="text-xs">
                                            <span className="text-green-600">
                                                {b?.quantity}
                                            </span>
                                            <br />
                                            <span className="text-gray-400">
                                                {b?.sold}
                                            </span>
                                        </p>
                                    </td>
                                    <td>
                                        <div className="flex gap-1 flex-col">
                                            <button
                                                className="cursor-pointer bg-red-500 text-xs font-medium rounded hover:bg-red-700 text-white"
                                                onClick={() =>
                                                    handleDeleteBook(b?._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button className="cursor-pointer bg-sky-500 text-xs font-medium rounded hover:bg-sky-700 text-white">
                                                Edit
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBook;
