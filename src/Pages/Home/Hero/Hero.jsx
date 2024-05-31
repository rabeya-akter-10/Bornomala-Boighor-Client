import React, { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Hero.css";
import UseAllBooks from "../../../Hooks/UseAllBooks";
const Hero = () => {

    const { books } = UseAllBooks()
    const getRandomBooks = (books, count) => {
        const shuffledBooks = [...books].sort(() => Math.random() - 0.5);
        return shuffledBooks?.slice(0, count);
    };
    const random = getRandomBooks(books, 8)

    const Hero0 = random[0]?.image
    const Hero1 = random[1]?.image
    const Hero2 = random[2]?.image
    const Hero3 = random[3]?.image
    const Hero4 = random[4]?.image
    const Hero5 = random[5]?.image
    const Hero6 = random[6]?.image
    const Hero7 = random[7]?.image


    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        selector: ".carousel__cell",
        renderMode: "custom",
        mode: "free-snap",
    }, [(slider) => {
        const z = 300;
        const rotate = () => {
            const deg = 360 * slider.track.details.progress;
            slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
        };

        slider.on("created", () => {
            const deg = 360 / slider.slides.length;
            slider.slides.forEach((element, idx) => {
                element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
            });
            rotate();
        });

        slider.on("detailsChanged", rotate);
    }]);

    useEffect(() => {
        if (slider) {
            const interval = setInterval(() => {
                slider.current.next();
            }, 1000); // Change slide every 3 seconds

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [slider]);



    return (
        <div className=" my-20 w-[60%]  md:w-[25%] lg:w-[19%] md:mx-auto pb-12 mx-auto">
            <div className="scene ">
                <div
                    className="carousel keen-slider w-[50%] mx-auto"
                    ref={sliderRef}
                >
                    <div className="carousel__cell w-[50%] number-slide5">
                        <img className="w-[216px] h-[310px]" src={Hero0} alt="" />
                    </div>
                    <div className="carousel__cell w-[50%] number-slide1">
                        <img className="w-[216px] h-[310px]" src={Hero1} alt="" />
                    </div>
                    <div className="carousel__cell w-[50%] number-slide2">
                        <img className="w-[216px] h-[310px]" src={Hero2} alt="" />
                    </div>
                    <div className="carousel__cell w-[50%] number-slide3">
                        <img className="w-[216px] h-[310px]" src={Hero3} alt="" />
                    </div>
                    <div className="carousel__cell w-[50%] number-slide4">
                        <img className="w-[216px] h-[310px]" src={Hero4} alt="" />
                    </div>
                    <div className="carousel__cell w-[50%] number-slide5">
                        <img className="w-[216px] h-[310px]" src={Hero5} alt="" />
                    </div>
                    <div className="carousel__cell w-[50%] number-slide6">
                        <img className="w-[216px] h-[310px]" src={Hero6} alt="" />
                    </div>
                    <div className="carousel__cell w-[50%] number-slide6">
                        <img className="w-[216px] h-[310px]" src={Hero7} alt="" />
                    </div>



                </div>
            </div>
        </div >
    );
};

export default Hero;
