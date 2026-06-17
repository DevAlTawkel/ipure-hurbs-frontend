import React from 'react'
import CartContent from './CartContent'
import TopSlider from '@/components/TopSlider'

const CartHome = () => {
    return (
        <div className='webpage-container'>
            <TopSlider
                slides={[
                    'Great choices deserve a smooth checkout!',
                    'You’re one step closer to better well-being!'
                ]}
            />
            <CartContent />
        </div>
    )
}

export default CartHome