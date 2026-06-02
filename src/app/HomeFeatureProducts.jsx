import React from 'react'
import './HomeFeatureProducts.css'
import Link from 'next/link'

const HomeFeatureProducts = () => {
    return (
        <div className='overflow-hidden HomeFeatureProducts-main-container'>
            <p className='playfair_display font-600 size-48 color-deep-forest-green text-align-center user-select-none HomeFeatureProducts-title'>Our Featured Products</p>

            <div className='display-grid HomeFeatureProducts-cards-container'>
                <div className='display-flex HomeFeatureProducts-card'>
                    <div className='HomeFeatureProducts-card-image-container'>
                        <img src="/assets/HomeFeatureProducts_01.png" alt="" className='object-fit-contain' />
                    </div>

                    <div className='user-select-none HomeFeatureProducts-card-description-container'>
                        <p className='manrope font-600 size-20 color-white'>Explore Product Store</p>
                        <p className='manrope font-600 size-28 color-white'>Nature’s Goodness Carefully Curated</p>
                        <p className='manrope font-400 size-18 color-white'>Naturally inspired products, rooted in sustainability and care for the Earth.</p>
                        <Link href={'/'} className='position-relative background-deep-forest-green color-white text-align-center transition HomeFeatureProducts-button'>
                            <span className='position-relative text-align-center width-100 manrope font-600 size-24' style={{ zIndex: 1 }}>Shop More</span>
                            <div className='position-absolute HomeFeatureProducts-button-sub-container'></div>
                        </Link>
                    </div>
                </div>

                <div className='display-flex HomeFeatureProducts-card'>
                    <div className='HomeFeatureProducts-card-image-container'>
                        <img src="/assets/HomeFeatureProducts_02.png" alt="" className='object-fit-contain' />
                    </div>

                    <div className='user-select-none HomeFeatureProducts-card-description-container'>
                        <p className='manrope font-600 size-20 color-white'>Welcome to Product Store</p>
                        <p className='manrope font-600 size-28 color-white'>Our Commitment To Sustainability</p>
                        <p className='manrope font-400 size-18 color-white'>Naturally inspired products, rooted in sustainability and care for the Earth.</p>
                        <Link href={'/'} className='position-relative background-deep-forest-green color-white text-align-center transition HomeFeatureProducts-button'>
                            <span className='position-relative text-align-center width-100 manrope font-600 size-24' style={{ zIndex: 1 }}>Shop More</span>
                            <div className='position-absolute HomeFeatureProducts-button-sub-container'></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeFeatureProducts