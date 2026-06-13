"use client";

import "./HomeMarquee.css";
import Marquee from "react-fast-marquee";

const cards = [
    { id: 1, image: "/assets/logo_01.png" },
    { id: 2, image: "/assets/logo_02.png" },
    { id: 3, image: "/assets/logo_03.png" },
    { id: 4, image: "/assets/logo_04.png" },
    { id: 5, image: "/assets/logo_05.png" },
    { id: 6, image: "/assets/logo_01.png" },
    { id: 7, image: "/assets/logo_02.png" },
    { id: 8, image: "/assets/logo_03.png" },
    { id: 9, image: "/assets/logo_04.png" },
    { id: 10, image: "/assets/logo_05.png" }
];

export default function HomeMarquee() {

    return (
        <div className="HomeMarquee-wrapper">
            <Marquee direction="right">
                {
                    cards.map((item, i)=>(
                        <div key={i} className="HomeMarquee-card">
                            <img src={item.image} alt="" className="object-fit-contain" />
                        </div>
                    ))
                }
            </Marquee>
        </div>
    );
}