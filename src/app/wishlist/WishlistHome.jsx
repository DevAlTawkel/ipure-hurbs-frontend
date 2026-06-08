import TopSlider from '@/components/TopSlider'
import React from 'react'
import WishlistItems from './WishlistItems'

const WishlistHome = () => {
    return (
        <>
            <TopSlider
                slides={[
                    'Good news! Some of your saved favorites are now available at a special price.',
                    'Your favorite wellness essentials, all in one place!'
                ]}
            />
            <WishlistItems />
        </>
    )
}

export default WishlistHome