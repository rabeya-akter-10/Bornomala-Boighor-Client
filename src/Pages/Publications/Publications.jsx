import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Publications = () => {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        fetch("https://bornomala-boighor-server.vercel.app/publications")
            .then((res) => res.json())
            .then((data) => {
                setPublications(data);
            });
    }, []);

    // Scroll to top
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });

    return (
        <div className="min-h-[80vh] w-full px-4 ">
            <h1 className="text-center py-5 text-xl text-green-500 underline">
                প্রকাশনী সমুহ
            </h1>

            <ul className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 mx-auto gap-3 pb-16">
                {publications.map((p) => (
                    <li key={p._id} className="px-4 py-2 border border-gray-400 rounded-md hover:bg-slate-100 cursor-pointer shadow-md hover:shadow-success">
                        <Link to={`/publications/${p.pub}`} className="w-full">
                            {p.pub}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Publications;
