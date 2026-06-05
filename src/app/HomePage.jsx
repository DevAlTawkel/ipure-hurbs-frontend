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
      <div id="categories">
        <HomeShop />
      </div>
      <div className='space-between-section'></div>
      <HomeFeatureProducts />
      <div className='space-between-section'></div>
      <HomeWhyChooseUs />
      <div className='space-between-section'></div>
      <HomeBestSellers />
      <div className='space-between-section'></div>
      <div id="about">
        <HomeAboutUs />
      </div>
      <div className='space-between-section'></div>
      <div id="learn">
        <HomeBlogs />
      </div>
      <HomeNewsletter />
    </>
  )
}

export default HomePage