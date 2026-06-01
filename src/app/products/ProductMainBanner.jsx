import React from 'react'
import './ProductMainBanner.css'
import Link from 'next/link'

const MainBanner = () => {
  return (
    <div className='position-relative ProductMainBanner-main-container'>
      <picture>
        <source media="(max-width: 550px)" srcSet="/assets/product-main-banner-mobile.webp" />
        <img src="/assets/product-main-banner.webp" alt="Complete Herbal Wellness Range" />
      </picture>
      <div className='position-absolute ProductMainBanner-content-container'>
        <Link href={'/products'} className='position-relative background-deep-forest-green color-white text-align-center ProductMainBanner-button'>
          <span className='position-relative text-align-center width-100 manrope font-600 size-24' style={{ zIndex: 1 }}>Explore More</span>
          <div className='position-absolute ProductMainBanner-button-sub-container'></div>
        </Link>
      </div>
    </div>
  )
}

export default MainBanner