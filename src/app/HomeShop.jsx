"use client"
import React, { useState, useEffect } from 'react'
import './HomeShop.css'
import Link from 'next/link'
import { useHomeStore } from '@/store/useHomeStore'

const PLACEHOLDER_IMAGE = '/assets/categories/category_placeholder.png'
const PAGE_SIZE = 2

const HomeShop = () => {
    const { categories, fetchHomeData, isLoading } = useHomeStore()
    const [page, setPage] = useState(0)

    useEffect(() => {
        if (categories.length === 0) fetchHomeData()
    }, [])

    const pages = []
    for (let i = 0; i < categories.length; i += PAGE_SIZE) {
        pages.push(categories.slice(i, i + PAGE_SIZE))
    }

    const next = () => setPage((p) => Math.min(p + 1, pages.length - 1))
    const prev = () => setPage((p) => Math.max(p - 1, 0))

    if (isLoading) {
        return (
            <div className='HomeShop-main-container'>
                <p className='playfair_display font-600 size-32 color-deep-forest-green text-align-center user-select-none HomeShop-title'>
                    Shop By Categories
                </p>
                <div className='display-grid HomeShop-cards-container'>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className='HomeShop-skeleton'>
                            <div className='HomeShop-skeleton-img' />
                            <div className='HomeShop-skeleton-text' />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='HomeShop-main-container'>
            <p className='playfair_display font-600 size-32 color-deep-forest-green text-align-center user-select-none HomeShop-title'>
                Shop By Categories
            </p>

            {/* Desktop grid */}
            <div className='display-grid HomeShop-cards-container'>
                {categories.map((item) => (
                    <Link href={`/products?category=${item.slug}`} key={item.id}>
                        <div className='background-white transition HomeShop-image-container'>
                            <img
                                src={item.image ?? PLACEHOLDER_IMAGE}
                                alt={item.name}
                                className='object-fit-contain'
                                onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE }}
                            />
                        </div>
                        <p className='manrope font-600 size-18 text-align-center color-deep-forest-green transition HomeShop-category'>
                            {item.name}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Mobile slider */}
            <div className='HomeShop-slider'>
                <div
                    className='HomeShop-slider-track'
                    style={{ transform: `translateX(-${page * 100}%)` }}
                >
                    {pages.map((group, index) => (
                        <div className='HomeShop-slide' key={index}>
                            {group.map((item) => (
                                <Link href={`/products?category=${item.slug}`} key={item.id}>
                                    <div className='background-white transition HomeShop-image-container'>
                                        <img
                                            src={item.image ?? PLACEHOLDER_IMAGE}
                                            alt={item.name}
                                            onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE }}
                                        />
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