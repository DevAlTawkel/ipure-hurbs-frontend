import React from 'react'
import HomeMarquee from './HomeMarquee'
import HomeShop from './HomeShop'
import HomeMainBanner from './HomeMainBanner'
import HomeFeatureProducts from './HomeFeatureProducts'
import HomeWhyChooseUs from './HomeWhyChooseUs'
import HomeBestSellers from './HomeBestSellers'
import HomeAboutUs from './HomeAboutUs'
import HomeBlogs from './HomeBlogs'
import HomeNewsletter from './HomeNewsletter'

const HomePage = () => {
  return (
    <>
      <HomeMainBanner />
      <HomeMarquee />
      <HomeShop />
      <div className='space-between-section'></div>
      <HomeFeatureProducts />
      <div className='space-between-section'></div>
      <HomeWhyChooseUs />
      <div className='space-between-section'></div>
      <HomeBestSellers />
      <div className='space-between-section'></div>
      <HomeAboutUs />
      <div className='space-between-section'></div>
      <HomeBlogs />
      <HomeNewsletter />
    </>
  )
}

export default HomePage