import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Publications.css";
import { Link } from "react-router-dom";

const Publications = () => {
    const [axiosSecure] = UseAxiosSecure();
    // get all publications
    const { data: publications = [], refetch: publicationsRefetch } = useQuery({
        queryKey: ["publications"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/publications`);
            return res.data;
        },
    });
    // console.log(publications);
    return (
        <div className="">
            <h1 className="text-center pb-10 text-green-600 text-lg ">
                প্রকাশনী
            </h1>

            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    "@0.00": {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    "@0.75": {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    "@1.00": {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    "@1.50": {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {publications.map((p) => (
                    <div key={p._id}>
                        <SwiperSlide className="w-full px-4">
                            <Link
                                to={`/publications/${p.pub}`}
                                className="h-36 rounded-md shadow-lg shadow-cyan-600 mb-16 flex items-center  w-full justify-center"
                            >
                                <h1 className="text-sm">{p.pub}</h1>
                            </Link>
                        </SwiperSlide>
                    </div>
                ))}
            </Swiper>
        </div>
    );
};

export default Publications;
