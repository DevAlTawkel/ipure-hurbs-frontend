import React from 'react'
import './HomeShop.css'

const HomeShop = () => {

    return (
        <div className='general-container HomeShop-main-container'>
            <p style={{ marginBottom: '10px' }}>Shop by Goal</p>
            <p className='HomeShop-title'>Pick what your body needs today</p>

            <div className='HomeShop-cards-container'>
                <div className='HomeShop-card'>

                    <div className='HomeShop-contents'>
                        <div className='HomeShop-top-image'>

                        </div>
                        <div className='HomeShop-description-container'>
                            <div className='HomeShop-description'></div>
                            <div className='HomeShop-description'></div>
                        </div>
                    </div>
                </div>

                <div className='HomeShop-card'>

                    <div className='HomeShop-contents'>
                        <div className='HomeShop-top-image'>

                        </div>
                        <div className='HomeShop-description-container'>
                            <div className='HomeShop-description'></div>
                            <div className='HomeShop-description'></div>
                        </div>
                    </div>
                </div>

                <div className='HomeShop-card'>

                    <div className='HomeShop-contents'>
                        <div className='HomeShop-top-image'>

                        </div>
                        <div className='HomeShop-description-container'>
                            <div className='HomeShop-description'></div>
                            <div className='HomeShop-description'></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomeShop