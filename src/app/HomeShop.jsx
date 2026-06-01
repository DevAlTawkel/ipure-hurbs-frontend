import React from 'react'
import './HomeShop.css'
import Link from 'next/link'

const HomeShop = () => {

    const categories = [
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_01.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_02.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_03.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_04.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_05.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_06.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_07.png',
            link: '/'
        },
        {
            name: 'Women’s Health Enhancer',
            image: '/assets/categories/category_08.png',
            link: '/'
        },
    ]

    return (
        <div className='HomeShop-main-container'>
            <p className='playfair_display font-600 size-48 color-deep-forest-green text-align-center user-select-none HomeShop-title'>Shop By Categories</p>

            <div className='display-grid HomeShop-cards-container'>
                {
                    categories.map((item, i) => (
                        <Link href={item.link} key={i}>
                            <div className='background-white transition HomeShop-image-container'>
                                <img src={item.image} alt="" />
                            </div>
                            <p className='manrope font-600 size-18 text-align-center color-deep-forest-green transition HomeShop-category'>{item.name}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default HomeShop