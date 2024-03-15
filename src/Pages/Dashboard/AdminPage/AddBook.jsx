import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/UseAuth";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddBook = () => {
    const { user } = useAuth();

    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/categories")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((error) =>
                console.error("Error fetching categories:", error)
            );
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const {
            bookName,
            category,
            writerName,
            publications,
            price,
            discounts,
            image,
        } = data;
        console.log(data);
    };

    const handleAddNewCategory = (event) => {
        event.preventDefault();

        const newCategoryValue = event.target.newCategory.value;

        fetch("http://localhost:5000/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cat: newCategoryValue }), // Corrected the object key here
        });

        toast.success("Successfully Added");

        setShowModal(false); // Close modal after adding category
    };

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    return (
        <div className="flex flex-col w-full items-center">
            <h1 className="text-center py-8 text-2xl">
                Add a Book to your shop
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-fit  rounded-lg shadow-md flex flex-col justify-center items-center p-8 mb-8 text-xs"
            >
                <div className="flex md:flex-row md:gap-4 flex-col">
                    <div className="form-control">
                        <label className="label">
                            <span className="text-xs text-[#757575dc] font-medium">
                                Book name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="book name"
                            {...register("bookName", { required: true })}
                            className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="text-xs text-[#757575dc] font-medium">
                                Category
                            </span>
                        </label>
                        {loading ? (
                            <p>Loading categories...</p>
                        ) : (
                            <div className="relative">
                                <select
                                    {...register("category", {
                                        required: true,
                                    })}
                                    className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
                                >
                                    <option>Select a category</option>
                                    {categories.map((c) => (
                                        <option key={c._id} value={c.cat}>
                                            {c.cat}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="absolute inset-y-0 right-0 px-4 py-1  bg-blue-500 text-white "
                                >
                                    New
                                </button>
                            </div>
                        )}
                        {errors.c && (
                            <span className="text-red-500">
                                Category is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex md:flex-row md:gap-4 flex-col">
                    <div className="form-control">
                        <label className="label">
                            <span className="text-xs text-[#757575] font-medium ">
                                Book name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="writer name"
                            {...register("writerName", { required: true })}
                            className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="text-xs text-[#757575] font-medium ">
                                Publications Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="publication name"
                            {...register("publications", { required: true })}
                            className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
                        />
                    </div>
                </div>

                <div className="flex md:flex-row md:gap-4 flex-col">
                    <div className="form-control">
                        <label className="label">
                            <span className="text-xs text-[#757575] font-medium ">
                                Price
                            </span>
                        </label>
                        <input
                            type="number"
                            placeholder="price"
                            {...register("price", { required: true })}
                            className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-xs text-[#757575] font-medium ">
                                Discounts
                            </span>
                        </label>
                        <input
                            type="number"
                            placeholder="discounts"
                            {...register("discounts", { required: true })}
                            className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
                        />
                    </div>
                </div>
                <div className="flex md:flex-row md:gap-4 flex-col">
                    <div className="form-control">
                        <label className="label">
                            <span className="text-xs text-[#757575] font-medium ">
                                Photo
                            </span>
                        </label>
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-xs text-[#757575] font-medium ">
                                Descriptions
                            </span>
                        </label>
                        <textarea
                            type="text"
                            placeholder="descriptions"
                            {...register("descriptions")}
                            className="border border-success rounded-sm p-1 focus:outline-none lg:w-[350px] w-[300px]"
                        />
                    </div>
                </div>

                <input
                    type="submit"
                    value={"Save"}
                    className="border border-success py-1 px-3 mt-4 rounded-xl cursor-pointer hover:scale-110 duration-300 hover:bg-success hover:text-white hover:border-warning"
                />
            </form>

            {/* Modal */}
            {showModal && (
                <form
                    onSubmit={handleAddNewCategory}
                    className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
                >
                    <div className="bg-white p-4 rounded-md flex gap-3 flex-col items-center justify-center">
                        <h2 className="text-xl font-semibold mb-2">
                            Add New Category
                        </h2>
                        <input
                            type="text"
                            name="newCategory"
                            className="border border-gray-300 rounded-md p-2 mb-2  w-72"
                            placeholder="Enter category name"
                        />
                        <div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
            <Toaster></Toaster>
        </div>
    );
};

export default AddBook;
