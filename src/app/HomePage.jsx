import React from 'react'
import Hero from './Hero'
import HomeMarquee from './HomeMarquee'
import HomeTrustPartners from './HomeTrustPartners'
import HomeShop from './HomeShop'
import HomeBestSeller from './HomeBestSeller'
import HomeSliderBanner from './HomeSliderBanner'
import HomeContent from './HomeContent'
import HomeTestimonial from './HomeTestimonial'

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeMarquee />
      <div className='space-between-section'></div>
      <HomeTrustPartners />
      <div className='space-between-section'></div>
      <HomeShop />
      <div className='space-between-section'></div>
      <HomeBestSeller />
      <HomeContent />
      <HomeSliderBanner />
      <HomeTestimonial />
      <div className='space-between-section'></div>
      <p>Test</p>
    </>
  )
}

export default HomePage