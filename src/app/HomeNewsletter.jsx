import React from 'react'
import './HomeNewsletter.css'

const HomeNewsletter = () => {
  return (
    <div className='HomeNewsletter-main-container'>
        <h4 className='manrope text-align-center font-600 size-28 color-deep-forest-green'>Wellness Made Better. Unlock Exclusive Offers, Rewards & Herbal Benefits.</h4>
        <div className='display-flex align-items-center justify-content-center HomeNewsletter-icons-container'>
            <div className='HomeNewsletter-line'></div>
            <div className='HomeNewsletter-leaf-image-container'>
                <img src="/assets/HomeNewsletter-leaf.png" alt="" />
            </div>
            <div className='HomeNewsletter-line'></div>
        </div>

        <div className='display-flex align-items-center justify-content-center HomeNewsletter-input-container'>
            <input type="text" placeholder='Enter your email address' className='width-50 manrope font-400 size-16 color-black-800 HomeNewsletter-input' />
            <button className='outline-none manrope font-600 size-28 background-deep-forest-green color-white-200 cursor-pointer transition HomeNewsletter-button'>Sign Up</button>
        </div>
    </div>
  )
}

export default HomeNewsletter