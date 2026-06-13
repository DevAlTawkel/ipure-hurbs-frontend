import ProductMainBanner from './ProductMainBanner'
import React from 'react'
import Products from './Products'

const ProductsHome = () => {
  return (
    <div className='webpage-container'>
      <ProductMainBanner />
      <Products />
    </div>
  )
}

export default ProductsHome