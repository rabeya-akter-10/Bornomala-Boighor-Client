import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Bookcard from "../../../Components/BookCard/Bookcard";

const BookByCategory = () => {
    const [axiosSecure] = UseAxiosSecure();
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null); // State to keep track of the selected category
    const [filteredBooks, setFilteredBooks] = useState([]);

    // Get categories
    const { data: cats = [], refetch: categoriesRefetch } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/categories`);
            setLoadingCategories(false);
            return res.data;
        },
    });

    // Get books
    const { data: books = [], refetch: booksRefetch } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/books`);
            setLoadingBooks(false);
            return res.data;
        },
    });

    // Function to filter books based on the selected category
    const filterBooksByCategory = (category) => {
        setSelectedCategory(category);
        const filtered = books.filter((book) => book?.category == category);
        setFilteredBooks(filtered);
    };

    useEffect(() => {
        // Trigger filtering for the first category when component mounts
        if (cats.length > 0) {
            filterBooksByCategory(cats[0].cat);
        }
    }, [cats]); // Trigger only when categories data changes

    return (
        <div className="py-8">
            {loadingCategories || loadingBooks ? (
                <p>Loading...</p>
            ) : (
                <Tabs className={"text-center"}>
                    <TabList>
                        {cats.map((c) => (
                            <Tab
                                key={c._id}
                                onClick={() => filterBooksByCategory(c.cat)}
                            >
                                {c.cat}
                            </Tab>
                        ))}
                    </TabList>

                    {cats.map((c) => (
                        <TabPanel key={c._id}>
                            <h2>Books in {c.cat}</h2>
                            <div className="grid grid-cols-4 gap-2">
                                {filteredBooks.map((book) => (
                                    <Bookcard
                                        key={book._id}
                                        book={book}
                                    ></Bookcard>
                                ))}
                            </div>
                        </TabPanel>
                    ))}
                </Tabs>
            )}
        </div>
    );
};

export default BookByCategory;
