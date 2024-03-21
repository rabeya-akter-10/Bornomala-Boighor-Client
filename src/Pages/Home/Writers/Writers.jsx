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
                {writers.map((p) => (
                    <div key={p._id}>
                        <SwiperSlide>
                            <Link
                                to={`/writers/${p._id}`}
                                className="h-28 w-fit"
                            >
                                <h1>{p.writerName}</h1>
                            </Link>
                        </SwiperSlide>
                    </div>
                ))}
            </Swiper>
        </div>
    );
};

export default Writers;
