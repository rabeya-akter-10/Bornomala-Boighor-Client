import React, { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Hero.css";

import Hero1 from "../../../assets/Hero/Hero1.webp";
import Hero2 from "../../../assets/Hero/Hero2.webp";
import Hero3 from "../../../assets/Hero/Hero3.webp";
import Hero4 from "../../../assets/Hero/Hero4.webp";
import Hero5 from "../../../assets/Hero/Hero5.webp";
import Hero6 from "../../../assets/Hero/Hero6.webp";
import Hero7 from "../../../assets/Hero/Hero7.webp";

const carousel = (slider) => {
    const z = 300;
    function rotate() {
        const deg = 360 * slider.track.details.progress;
        slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
    }
    slider.on("created", () => {
        const deg = 360 / slider.slides.length;
        slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${
                deg * idx
            }deg) translateZ(${z}px)`;
        });
        rotate();
    });
    slider.on("detailsChanged", rotate);
};

const Hero = () => {
    const [sliderRef, slider] = useKeenSlider(
        {
            loop: true,
            selector: ".carousel__cell",
            renderMode: "custom",
            mode: "free-snap",
        },
        [carousel]
    );

    return (
        <div className="wrapper py-20 mt-10 px-2">
            <div className="scene">
                <div className="carousel keen-slider" ref={sliderRef}>
                    <div className="carousel__cell number-slide1">
                        <img src={Hero1} alt="" />
                    </div>
                    <div className="carousel__cell number-slide2">
                        <img src={Hero2} alt="" />
                    </div>
                    <div className="carousel__cell number-slide3">
                        <img src={Hero3} alt="" />
                    </div>
                    <div className="carousel__cell number-slide4">
                        <img src={Hero4} alt="" />
                    </div>
                    <div className="carousel__cell number-slide5">
                        <img src={Hero5} alt="" />
                    </div>
                    <div className="carousel__cell number-slide6">
                        <img src={Hero6} alt="" />
                    </div>
                    <div className="carousel__cell number-slide5">
                        <img src={Hero7} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
