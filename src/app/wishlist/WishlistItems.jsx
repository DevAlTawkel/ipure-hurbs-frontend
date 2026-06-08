"use client"

import React from 'react'
import './WishlistItems.css'
import ProductCardWishlist from '@/components/ProductCardWishlist'
import { useWishlistStore } from '@/store/useWishlistStore'
import { useCartStore } from '@/store/useCartStore'
import ProductCard from '@/components/ProductCard'
import { useProductStore } from '@/store/useProductStore'

const WishlistItems = () => {

    const wishlist = useWishlistStore((state) => state.wishlist)
    const wishlistIds = useWishlistStore((state) => state.wishlistIds)
    const { products } = useProductStore()
    const { addToCart, updateQuantity } = useCartStore();

    const suggestedProducts = products
        .filter((p) => !wishlistIds.includes(p.id))
        .slice(0, 8)

    const handleAddAllToCart = () => {
        if (wishlist.length === 0) return;

        wishlist.forEach((product) => {
            addToCart(product);
        });
    };
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

            <div style={{padding:'20px 26px 0'}}>
                {wishlist.length === 0 && (<p className='manrope font-500 size-16'>No products found</p>)}
            </div>

            <div className='display-grid WishlistItems-grid'>
                {wishlist.map((product) => (
                    <ProductCardWishlist product={product} id={product.id} />
                ))}
            </div>



            <div className='WishlistItems-warning-container'>
                <div className='WishlistItems-i-main-container'>
                    <div className='WishlistItems-i-container'>
                        <svg width="6" height="17" viewBox="0 0 6 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3C3.8284 3 4.5 2.32843 4.5 1.5C4.5 0.67157 3.8284 0 3 0C2.1716 0 1.5 0.67157 1.5 1.5C1.5 2.32843 2.1716 3 3 3ZM0 7H2V15H0V17H6V15H4V5H0V7Z" fill="#E70C0C" />
                        </svg>
                    </div>
                    <p className='manrope font-400 size-16'>
                        Move everything at once. Add all {wishlist.length !== 1 && wishlist.length} favorite{wishlist.length !== 1 ? 's' : ''} to your bag in one tap.
                    </p>
                </div>

                <div className="display-flex ProductCardWishlist-actions ProductCardWishlist-actions-2">
                    <button
                        onClick={handleAddAllToCart}
                        disabled={wishlist.length === 0}
                        className="size-16 font-400 background-transparent color-dfg-200 transition cursor-pointer ProductCardWishlist-btn-cart"
                    >
                        Add to cart
                    </button>
                </div>
            </div>

            <div className='ProductCardWishlist-last-section'>
                <h6 className='manrope font-600 size-24'>Find your next favorites</h6>

                <div className='display-grid ProductCardWishlist-last-section-grid'>
                    {suggestedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WishlistItems