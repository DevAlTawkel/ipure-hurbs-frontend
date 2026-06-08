"use client"
import React, { useState } from 'react'
import './HomeShop.css'
import Link from 'next/link'

const HomeShop = () => {

    const categories = [
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_01.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_02.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_03.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_04.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_05.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_06.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_07.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_08.png',
            link: '/'
        },
    ]

    const [page, setPage] = useState(0);
    const PAGE_SIZE = 2;

    const pages = [];
    for (let i = 0; i < categories.length; i += PAGE_SIZE) {
        pages.push(categories.slice(i, i + PAGE_SIZE));
    }

    const next = () => setPage((p) => Math.min(p + 1, pages.length - 1));
    const prev = () => setPage((p) => Math.max(p - 1, 0));

    return (
        <div className='HomeShop-main-container'>
            <p className='playfair_display font-600 size-32 color-deep-forest-green text-align-center user-select-none HomeShop-title'>Shop By Categories</p>

            <div className='display-grid HomeShop-cards-container'>
                {
                    categories.map((item, i) => (
                        <Link href={item.link} key={i}>
                            <div className='background-white transition HomeShop-image-container'>
                                <img src={item.image} alt="" />
                            </div>
                            <p className='manrope font-600 size-18 text-align-center color-deep-forest-green transition HomeShop-category'>{item.name}</p>
                        </Link>
                    ))
                }
            </div>
            <div className='HomeShop-slider'>
                <div
                    className='HomeShop-slider-track'
                    style={{
                        transform: `translateX(-${page * 100}%)`
                    }}
                >
                    {pages.map((group, index) => (
                        <div className='HomeShop-slide' key={index}>
                            {group.map((item, i) => (
                                <Link href={item.link} key={i}>
                                    <div className='background-white transition HomeShop-image-container'>
                                        <img src={item.image} alt={item.name} />
                                    </div>

                                    <p className='manrope font-600 size-18 text-align-center color-deep-forest-green transition HomeShop-category'>
                                        {item.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>

                <div className='HomeShop-pagination'>
                    <button
                        onClick={prev}
                        disabled={page === 0}
                        className='display-flex align-items-center justify-content-center cursor-pointer border-none border-radius-50 background-white HomeShop-pagination-button-left'
                    >
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.94972 6.36412L-4.94538e-07 1.41432L1.41421 0.000118194L7.77822 6.36412L1.41421 12.728L-6.18171e-08 11.3138L4.94972 6.36412Z" fill="rgba(200, 169, 107, 1)" />
                        </svg>
                    </button>

                    <div className='HomeShop-dots'>
                        {pages.map((_, i) => (
                            <span
                                key={i}
                                className={`HomeShop-dot ${i === page ? 'active' : ''}`}
                                onClick={() => setPage(i)}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        disabled={page === pages.length - 1}
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

export default HomeShop