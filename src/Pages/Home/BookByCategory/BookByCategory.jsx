import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Bookcard from "../../../Components/BookCard/Bookcard";
import CustomLoader from "../../../Components/CustomLoader/CustomLoader";
import UseBooks from "../../../Hooks/UseBooks";

const BookByCategory = () => {
    const [axiosSecure] = UseAxiosSecure();
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null); // State to keep track of the selected category
    const [filteredBooksByCat, setFilteredBooksByCat] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

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
    const { books } = UseBooks();

    // Function to filter books based on the selected category
    const filterBooksByCategory = (category) => {
        setSelectedCategory(category);
        const filtered = books.filter((book) => book?.category == category);
        setFilteredBooksByCat(filtered);
        setLoadingBooks(false)
    };

    useEffect(() => {
        // Set filtered books for the first category when component mounts
        if (cats.length > 0) {
            filterBooksByCategory(cats[selectedTab].cat);
        }
    }, [cats, selectedTab]); // Added selectedTab as a dependency

    useEffect(() => {
        // Update filtered books when books or selected category changes
        if (selectedCategory && books.length > 0) {
            filterBooksByCategory(selectedCategory);
        }
    }, [selectedCategory, books]); // Added selectedCategory and books as dependencies

    // Effect to save the selected tab index to local storage
    useEffect(() => {
        localStorage.setItem("selectedTab", selectedTab.toString());
    }, [selectedTab]);

    // Effect to load the selected tab index from local storage
    useEffect(() => {
        const storedTab = localStorage.getItem("selectedTab");
        if (storedTab !== null) {
            setSelectedTab(parseInt(storedTab));
        }
    }, []);

    return (
        <div className="py-8">
            {loadingCategories || loadingBooks ? (
                <CustomLoader></CustomLoader>
            ) : (
                <Tabs className={"text-center"}>
                    <TabList className={"text-xs "}>
                        {cats.map((c, index) => (
                            <Tab
                                key={c._id}
                                onClick={() => {
                                    filterBooksByCategory(c.cat);
                                    setSelectedTab(index);
                                }}
                            >
                                {c.cat}
                            </Tab>
                        ))}
                    </TabList>

                    <hr />

                    {cats.map((c) => (
                        <TabPanel
                            className={
                                "flex items-center justify-center w-full "
                            }
                            key={c._id}
                        >
                            <h2 className="underline text-sm font-medium text-green-600 py-4">
                                {c.cat}
                            </h2>
                            <div className="grid md:grid-cols-4 lg:grid-cols-6 grid-cols-2 md:gap-6 gap-4 py-6 mx-auto w-fit">
                                {filteredBooksByCat.map((book) => (
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
