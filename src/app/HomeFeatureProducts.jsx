"use client"

import React, { useEffect } from 'react'
import './HomeFeatureProducts.css'
import Link from 'next/link'
import { useHomeStore } from '@/store/useHomeStore'
const PLACEHOLDER_IMAGE = '/assets/placeholder.png'

const HomeFeatureProducts = () => {
    const { featuredProducts, fetchHomeData } = useHomeStore()

    useEffect(() => {
        if (featuredProducts.length === 0) fetchHomeData()
    }, [])

    const featured = featuredProducts.slice(0, 2)
    return (
        <div className='overflow-hidden HomeFeatureProducts-main-container'>
            <p className='playfair_display font-600 size-32 color-deep-forest-green text-align-center user-select-none HomeFeatureProducts-title'>Our Featured Products</p>

            <div className='display-grid HomeFeatureProducts-cards-container'>
                {featured.map((product) => (
                    <div key={product.id} className='display-flex HomeFeatureProducts-card'>
                        <div className='HomeFeatureProducts-card-image-container'>
                            <img
                                src={product.image ?? PLACEHOLDER_IMAGE}
                                alt={product.name}
                                className='object-fit-contain'
                                onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE }}
                            />
                        </div>

                        <div className='user-select-none HomeFeatureProducts-card-description-container'>
                            <p className='manrope font-600 size-20 color-white'>{product.category}</p>
                            <p className='manrope font-600 size-28 color-white'>{product.name}</p>
                            <p className='manrope font-400 size-18 color-white'>{product.description}</p>
                            <div className="HomeFeatureProducts-button-wrap">
                                <Link
                                    href={`/products/${product.slug}`}
                                    prefetch={false}
                                    className="background-deep-forest-green color-white text-align-center HomeFeatureProducts-button"
                                >
                                    <span className='position-relative text-align-center width-100 manrope font-600 size-24 color-white'>
                                        Shop More
                                    </span>
                                </Link>
                                <div className="HomeFeatureProducts-button-glow" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeFeatureProducts