import React from 'react'
import ProductDetails from './ProductDetails'
import TopSlider from '@/components/TopSlider'

const ProductHomePage = ({ slug }) => {
    return (
        <>
            <TopSlider 
                slides={[
                    'Get 20% OFF on your first order!',
                    'Due to Eid holidays, delivery and return/exchange pickup delivery might be delayed.'
                ]}
            />
            <ProductDetails slug={slug}/>
        </>
    )
}

export default ProductHomePage