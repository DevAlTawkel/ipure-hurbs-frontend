import React from 'react'
import './HomeBestSeller.css'

const HomeBestSeller = () => {

    return (
        <div className='general-container HomeBestSeller-main-container'>
            <div className='HomeBestSeller-title-container'>
                <p className='HomeBestSeller-title'>Best Seller</p>
                <div className='HomeBestSeller-button'>

                </div>
            </div>

            <div className='HomeBestSeller-cards-container'>
                <div className='HomeBestSeller-card'>
                    <div className='HomeBestSeller-contents'>
                        <div className='HomeBestSeller-top-image'></div>
                        <div className='HomeBestSeller-description-container'>
                            <div className='HomeBestSeller-description'></div>
                        </div>
                    </div>
                </div>

                <div className='HomeBestSeller-card'>
                    <div className='HomeBestSeller-contents'>
                        <div className='HomeBestSeller-top-image'></div>
                        <div className='HomeBestSeller-description-container'>
                            <div className='HomeBestSeller-description'></div>
                        </div>
                    </div>
                </div>

                <div className='HomeBestSeller-card'>
                    <div className='HomeBestSeller-contents'>
                        <div className='HomeBestSeller-top-image'></div>
                        <div className='HomeBestSeller-description-container'>
                            <div className='HomeBestSeller-description'></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomeBestSeller