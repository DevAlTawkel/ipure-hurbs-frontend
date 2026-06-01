import React from 'react'
import './HomeMainBanner.css'
import Link from 'next/link'

const HomeMainBanner = () => {
  return (
    <div className='position-relative HomeMainBanner-main-container'>
      <picture>
        <source media="(max-width: 550px)" srcSet="/assets/home-main-banner-mobile.webp" />
        <img src="/assets/home-main-banner.webp" alt="" />
      </picture>
      <div className='position-absolute HomeMainBanner-content-container'>
        <Link href={'/products'} className='position-relative background-deep-forest-green color-white text-align-center HomeMainBanner-button'>
          <span className='position-relative text-align-center width-100 manrope font-600 size-24' style={{ zIndex: 1 }}>Explore More</span>
          <div className='position-absolute HomeMainBanner-button-sub-container'></div>
        </Link>
      </div>
    </div>
  )
}

export default HomeMainBanner