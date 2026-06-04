import React from 'react'
import ProductDetails from './ProductDetails'
import TopSlider from '@/components/TopSlider'

const ProductHomePage = () => {
    return (
        <>
            <TopSlider 
                slides={[
                    'Get 20% OFF on your first order!',
                    'Due to Eid holidays, delivery and return/exchange pickup delivery might be delayed.'
                ]}
            />
            <ProductDetails />
        </>
    )
}

export default ProductHomePage