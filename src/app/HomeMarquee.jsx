"use client";

import "./HomeMarquee.css";
import Marquee from "react-fast-marquee";

const cards = [
    { id: 1, label: "Card 01" },
    { id: 2, label: "Card 02" },
    { id: 3, label: "Card 03" },
    { id: 4, label: "Card 04" },
    { id: 5, label: "Card 05" },
    { id: 1, label: "Card 01" },
    { id: 2, label: "Card 02" },
    { id: 3, label: "Card 03" },
    { id: 4, label: "Card 04" },
    { id: 5, label: "Card 05" },
];

export default function HomeMarquee() {

    return (
        <div className="HomeMarquee-wrapper">
            <Marquee>
                {
                    cards.map((item, i)=>(
                        <div key={i} className="HomeMarquee-card">
                            {/* {item.label} */}
                        </div>
                    ))
                }
            </Marquee>
        </div>
    );
}