"use client"

import React from 'react'
import './WishlistItems.css'

const WishlistItems = () => {
    return (
        <div>
            <div className='display-flex align-items-center justify-content-space-between flex-wrap-wrap WishlistItems-padding'>
                <div>
                    <h1 className='manrope font-600 size-24 color-deep-forest-green'>Your Wishlist</h1>
                    <p className='manrope font-600 size-24 color-dfg-400'>Remedies you've saved. Take your time — we'll hold these for you.</p>
                </div>
                <div>
                    <button className='border-none outline-none cursor-pointer background-transparent display-flex align-items-center gap-8 manrope size-24 color-deep-forest-green'>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.24264 15.9706H18V17.9706H0V13.7279L9.8995 3.82842L14.1421 8.07109L6.24264 15.9706ZM11.3137 2.41421L13.435 0.29289C13.8256 -0.09763 14.4587 -0.09763 14.8492 0.29289L17.6777 3.12132C18.0682 3.51184 18.0682 4.14501 17.6777 4.53553L15.5563 6.65685L11.3137 2.41421Z" fill="#2F3A2F" />
                        </svg>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WishlistItems