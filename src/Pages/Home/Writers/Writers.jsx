import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Writers.css";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Writers = () => {
    const [axiosSecure] = UseAxiosSecure();
    // get all writers
    const { data: writers = [], refetch: writersRefetch } = useQuery({
        queryKey: ["writers"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/writers`);
            return res.data;
        },
    });
    return (
        <div className="py-8">
            <h1 className="text-center pb-10 text-green-600 text-lg">
                লেখক/লেখিকা
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
                {writers.map((p, index) => (
                    <SwiperSlide key={index} className="w-full px-4">
                        <Link
                            to={`/writers/${p.writerName}`}
                            className="h-44  rounded-md shadow-sm shadow-green-400 mb-16 flex flex-col gap-4 items-center  w-full justify-center "
                        >
                            <div>
                                <FaUserAlt className="text-7xl w-20 h-20 text-gray-400 p-3 bg-slate-100 rounded-full"></FaUserAlt>
                            </div>
                            <h1 className="text-sm">{p.writerName}</h1>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Writers;
