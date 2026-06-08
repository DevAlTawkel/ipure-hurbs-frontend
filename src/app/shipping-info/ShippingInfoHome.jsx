import TopSlider from '@/components/TopSlider'
import React from 'react'
import ShippingInfoContent from './ShippingInfoContent'

const ShippingInfoHome = () => {
    return (
        <>
            <TopSlider
                slides={[
                    'Your wellness journey is on its way-tell us where to deliver it!',
                    'Order delivery is usually 4 to 5 working days!'
                ]}
            />
            <ShippingInfoContent />
        </>
    )
}

export default ShippingInfoHome