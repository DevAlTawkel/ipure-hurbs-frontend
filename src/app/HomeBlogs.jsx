"use client"
import React, { useState } from 'react'
import './HomeBlogs.css'
import Link from "next/link";

const blogs = [
    {
        image: "/assets/HomeBlog_image_01.png",
        date: 'May 20.2026',
        title: "Daily Herbal Support for Energy and Vitality",
        desc: "Explore how Live-Amrit DS helps support natural energy levels, reduces fatigue, and promotes overall vitality for a busy lifestyle after 25.",
        link: '/'
    },
    {
        image: "/assets/HomeBlog_image_02.jpg",
        date: 'May 20.2026',
        title: "Natural Digestive Tonic for a Healthy Gut",
        desc: "Learn how DIGO Amrit supports digestion, reduces bloating, and improves gut comfort using traditional herbal ingredients.",
        link: '/'
    },
    {
        image: "/assets/HomeBlog_image_03.jpg",
        date: 'May 20.2026',
        title: "Herbal Support for Healthy Weight Management",
        desc: "Explore how Slim Qem supports metabolism, appetite control, and natural weight balance as part of a healthy lifestyle routine.",
        link: '/'
    }
]

const HomeBlogs = () => {

    const [page, setPage] = useState(0);

    const next = () => setPage((p) => Math.min(p + 1, blogs.length - 1));
    const prev = () => setPage((p) => Math.max(p - 1, 0));

    return (
        <div className='background-white-200 HomeBlogs-main-container'>
            <p className='playfair_display font-600 size-32 color-deep-forest-green text-align-center user-select-none HomeBlogs-title'>Blog Posts</p>
            <p className='manrope font-400 size-18 color-dfg-200 text-align-center margin-left-auto margin-right-auto HomeBlogs-sub-title'>
                Learn. Heal. Thrive with natural wellness.
            </p>

            <div className='display-flex align-items-flex-end justify-content-flex-end'>
                <Link href={'/blogs'} className="manrope font-500 size-18 color-deep-forest-green display-flex align-items-center gap-10 justify-content-flex-end HomeBlogs-cards-viewmore">
                    See more
                    <div className="display-flex align-items-center justify-content-center border-radius-100 HomeBlogs-arrow-container">
                        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.36356 8.00006L0 1.77776L1.81817 8.742e-07L10 8.00006L1.81817 16L0 14.2222L6.36356 8.00006Z" fill="white" />
                        </svg>
                    </div>
                </Link>
            </div>
            <div className='display-grid HomeBlogs-grid-container'>
                {
                    blogs.map((item, i) => (
                        <div key={i} className='background-white display-flex flex-direction-column overflow-hidden transition user-select-none HomeBlogs-card'>
                            <div className='HomeBlogs-card-image-container'>
                                <img src={item.image} alt="" className='object-fit-cover' />
                            </div>
                            <div className='display-flex flex-direction-column HomeBlogs-card-content-container'>
                                <div className='display-flex align-items-center HomeBlogs-card-icons-container'>
                                    <div className='display-flex align-items-center justify-content-center gap-10'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 0V2H13V0H15V2H19C19.5523 2 20 2.44772 20 3V19C20 19.5523 19.5523 20 19 20H1C0.44772 20 0 19.5523 0 19V3C0 2.44772 0.44772 2 1 2H5V0H7ZM18 10H2V18H18V10ZM5 4H2V8H18V4H15V6H13V4H7V6H5V4Z" fill="#565F56" />
                                        </svg>
                                        <p className='manrope font-400 size-14 color-black-dfg-200'>{item.date}</p>
                                    </div>
                                    <div className='display-flex align-items-center justify-content-center gap-10'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 0H12C16.4183 0 20 3.58172 20 8C20 12.4183 16.4183 16 12 16V19.5C7 17.5 0 14.5 0 8C0 3.58172 3.58172 0 8 0ZM10 14H12C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2H8C4.68629 2 2 4.68629 2 8C2 11.61 4.46208 13.9656 10 16.4798V14Z" fill="#565F56" />
                                        </svg>
                                        <p className='manrope font-400 size-14 color-black-dfg-200'>Comments</p>
                                    </div>
                                    <div className='display-flex align-items-center justify-content-center gap-10'>
                                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 5.81056L11.6352 3.48845C12.2721 2.58412 13.3179 2 14.5 2C16.433 2 18 3.567 18 5.5C18 8.3788 16.0407 11.1215 13.643 13.3358C12.4877 14.4027 11.3237 15.2603 10.4451 15.8521C10.2861 15.9592 10.1371 16.0571 9.9999 16.1456C9.8627 16.0571 9.7137 15.9592 9.5547 15.8521C8.6761 15.2604 7.51216 14.4028 6.35685 13.3358C3.95926 11.1216 2 8.3788 2 5.5C2 3.567 3.567 2 5.5 2C6.68209 2 7.72794 2.58412 8.3648 3.48845L10 5.81056ZM8.5557 0.92626C7.68172 0.3412 6.63071 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 13 9.9999 18.4852 9.9999 18.4852C9.9999 18.4852 20 13 20 5.5C20 2.46243 17.5376 0 14.5 0C13.3693 0 12.3183 0.3412 11.4443 0.92626C10.8805 1.3037 10.3903 1.78263 10 2.33692C9.6097 1.78263 9.1195 1.3037 8.5557 0.92626Z" fill="#565F56" />
                                        </svg>
                                        <p className='manrope font-400 size-14 color-black-dfg-200'>Like</p>
                                    </div>
                                </div>
                                <h5 className='manrope font-600 size-24 color-deep-forest-green'>
                                    {item.title}
                                </h5>

                                <p className='manrope font-400 size-18 color-black-black HomeBlogs-card-description'>
                                    {item.desc}
                                </p>

                                <div className='display-flex align-items-flex-end margin-top-auto HomeBlogs-card-link-container'>
                                    <Link
                                        href={item.link}
                                        className='margin-left-auto manrope size-18 font-400 color-deep-forest-green transition HomeBlogs-card-link'
                                    >
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='HomeBlogs-slider'>
                <div
                    className='HomeBlogs-slider-track'
                    style={{
                        transform: `translateX(-${page * 100}%)`
                    }}
                >
                    {blogs.map((item, i) => (
                        <div
                            key={i}
                            className='background-white display-flex flex-direction-column overflow-hidden transition user-select-none HomeBlogs-card HomeBlogs-slide'
                        >
                            <div className='HomeBlogs-card-image-container'>
                                <img src={item.image} alt="" className='object-fit-cover' />
                            </div>

                            <div className='display-flex flex-direction-column HomeBlogs-card-content-container'>
                                <div className='display-flex align-items-center HomeBlogs-card-icons-container'>
                                    {/* Your icons section here */}
                                </div>

                                <h5 className='manrope font-600 size-24 color-deep-forest-green'>
                                    {item.title}
                                </h5>

                                <p className='manrope font-400 size-18 color-black-black HomeBlogs-card-description'>
                                    {item.desc}
                                </p>

                                <div className='display-flex align-items-flex-end margin-top-auto HomeBlogs-card-link-container'>
                                    <Link
                                        href={item.link}
                                        className='margin-left-auto manrope size-18 font-400 color-deep-forest-green transition HomeBlogs-card-link'
                                    >
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='HomeBlogs-pagination'>
                    <button
                        onClick={prev}
                        disabled={page === 0}
                        className='display-flex align-items-center justify-content-center cursor-pointer border-none border-radius-50 background-white HomeBlogs-pagination-button-left'
                    >
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.94972 6.36412L-4.94538e-07 1.41432L1.41421 0.000118194L7.77822 6.36412L1.41421 12.728L-6.18171e-08 11.3138L4.94972 6.36412Z" fill="rgba(200, 169, 107, 1)" />
                        </svg>
                    </button>

                    <div className='HomeBlogs-dots'>
                        {blogs.map((_, i) => (
                            <span
                                key={i}
                                className={`HomeBlogs-dot ${i === page ? 'active' : ''}`}
                                onClick={() => setPage(i)}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        disabled={page === blogs.length - 1}
                        className='display-flex align-items-center justify-content-center cursor-pointer border-none border-radius-50 background-white'
                    >
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.94972 6.36412L-4.94538e-07 1.41432L1.41421 0.000118194L7.77822 6.36412L1.41421 12.728L-6.18171e-08 11.3138L4.94972 6.36412Z" fill="rgba(200, 169, 107, 1)" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeBlogs