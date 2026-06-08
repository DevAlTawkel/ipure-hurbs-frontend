"use client"

import React, { useState } from 'react'
import './CartContent.css'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/useCartStore'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { useProductStore } from '@/store/useProductStore'

const popularProducts = [
    {
        id: 101,
        name: 'Happy Knights Prash',
        desc: 'Plant-based herbal formula for energy and men\'s wellness',
        price: 66.89,
        rating: 4.7,
        reviews: 'Limited Time Deal',
        image: '/assets/products/product-01.png',
    },
    {
        id: 102,
        name: 'Happy Knights Prash',
        desc: 'Plant-based herbal formula for energy and men\'s wellness',
        price: 66.89,
        rating: 4.7,
        reviews: 'Limited Time Deal',
        image: '/assets/products/product-02.png',
    },
    {
        id: 103,
        name: 'Happy Knights Prash',
        desc: 'Plant-based herbal formula for energy and men\'s wellness',
        price: 66.89,
        rating: 4.7,
        reviews: 'Limited Time Deal',
        image: '/assets/products/product-03.png',
    },
]

const SIZES = ['250 gm', '500 gm', '1 kg']
const SHIPPING = 20.00
const DISCOUNT = 15.00
const DUTIES_TAXES = 15.00
const REWARDS = 0.00

const CartContent = () => {
    const router = useRouter()
    const { cart, updateQuantity, removeFromCart, addToCart } = useCartStore()

    const { products } = useProductStore()
    const cartIds = cart.map((item) => item.id)
    const suggestedProducts = products
        .filter((p) => !cartIds.includes(p.id))
        .slice(0, 4)

    const [sizes, setSizes] = useState(() =>
        Object.fromEntries(cart.map((item) => [item.id, item.size || '250 gm']))
    )
    const [coupon, setCoupon] = useState('')
    const [couponApplied, setCouponApplied] = useState(false)

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const total = subtotal + SHIPPING - DISCOUNT + DUTIES_TAXES - REWARDS

    const handleSizeChange = (id, size) => {
        setSizes((prev) => ({ ...prev, [id]: size }))
    }

    const handleApplyCoupon = () => {
        if (coupon.trim()) setCouponApplied(true)
    }

    const handleCheckout = () => {
        router.push('/checkout')
    }

    return (
        <div>
            <div className="CartContent-wrapper">
                {/* ── Left: Cart Items ── */}
                <div className="CartContent-left">
                    {cart.length === 0 ? (
                        <div className="CartContent-empty">
                            <span className="CartContent-empty-icon">🛒</span>
                            <p className="manrope font-600 size-18 color-deep-forest-green">Your cart is empty</p>
                            <p className="manrope font-400 size-14 color-muted">Add some products to get started.</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div className="CartContent-item" key={item.id}>
                                {/* Image */}
                                <div className="CartContent-item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>

                                {/* Details */}
                                <div className="CartContent-item-details">
                                    <div className="CartContent-item-top">
                                        <div>
                                            <p className="CartContent-item-name manrope font-600">{item.name}</p>
                                            <p className="CartContent-item-desc size-14 manrope font-400">{item.description}</p>
                                        </div>
                                        <p className="CartContent-item-price manrope font-700">${item.price.toFixed(2)}</p>
                                    </div>

                                    <p className="CartContent-item-stock manrope font-500">In stock</p>
                                    <p className="CartContent-item-delivery manrope font-400">
                                        Free Delivery on <strong>8 Jun.</strong> on your first order
                                    </p>

                                    {/* Controls row */}
                                    <div className="CartContent-item-controls">
                                        {/* Size selector */}
                                        <div className="CartContent-select-wrap">
                                            <select
                                                value={sizes[item.id] || '250 gm'}
                                                onChange={(e) => handleSizeChange(item.id, e.target.value)}
                                                className="manrope"
                                            >
                                                {SIZES.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            <span className="CartContent-select-arrow">▾</span>
                                        </div>

                                        {/* Quantity stepper */}
                                        <div className="CartContent-qty">
                                            <button
                                                className="CartContent-qty-btn manrope"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >−</button>
                                            <span className="CartContent-qty-val manrope font-600">{item.quantity}</span>
                                            <button
                                                className="CartContent-qty-btn manrope"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >+</button>
                                        </div>

                                        {/* Save for later */}
                                        <button className="CartContent-action-btn manrope font-400">
                                            Save for later
                                        </button>

                                        {/* Remove */}
                                        <button
                                            className="CartContent-action-btn manrope font-400"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ── Right: Summary + Popular ── */}
                <div className="CartContent-right">
                    {/* Order Summary */}
                    <div className="CartContent-summary">
                        <h2 className="manrope font-700 size-18 color-deep-forest-green">Order Summary</h2>

                        <div className="CartContent-summary-row">
                            <span className="manrope font-400 color-muted">Total Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                            <span className="manrope font-500">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="CartContent-summary-row">
                            <span className="manrope font-400 color-muted">Total Weight: 400gm</span>
                            <span className="manrope font-500">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="CartContent-summary-row">
                            <span className="manrope font-600 color-gray">Discount</span>
                            <span className="manrope font-500 color-green">-${DISCOUNT.toFixed(2)}</span>
                        </div>
                        <div className="CartContent-summary-row">
                            <span className="manrope font-600 color-muted">Subtotal</span>
                            <span className="manrope font-500">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="CartContent-summary-row">
                            <span className="manrope font-400 color-muted">Shipping ⓘ</span>
                            <span className="manrope font-500">${SHIPPING.toFixed(2)}</span>
                        </div>
                        <div className="CartContent-summary-row">
                            <span className="manrope font-400 color-muted">Duties & Taxes ⓘ</span>
                            <span className="manrope font-500">${DUTIES_TAXES.toFixed(2)}</span>
                        </div>
                        <div className="CartContent-summary-row">
                            <span className="manrope font-400 color-muted">Rewards & Credits ⓘ</span>
                            <span className="manrope font-500 color-green">-${REWARDS.toFixed(2)}</span>
                        </div>

                        <div className="CartContent-summary-divider" />

                        <div className="CartContent-summary-total">
                            <span className="manrope font-700 size-16">Total</span>
                            <span className="manrope font-700 size-16">${total.toFixed(2)}</span>
                        </div>

                        {/* Coupon */}
                        <div className="CartContent-coupon-label manrope font-600 size-20 color-deep-forest-green">
                            Apply coupon
                        </div>
                        <div className="CartContent-coupon-row">
                            <input
                                type="text"
                                placeholder="EXAMPLE200"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                className="CartContent-coupon-input manrope"
                            />
                            <button
                                className="CartContent-coupon-btn manrope font-600"
                                onClick={handleApplyCoupon}
                            >
                                Apply
                            </button>
                        </div>
                        {couponApplied && (
                            <p className="CartContent-coupon-success manrope font-400">Coupon applied!</p>
                        )}

                        {/* Checkout Button */}
                        <button
                            className="CartContent-checkout-btn manrope font-600"
                            onClick={handleCheckout}
                            disabled={cart.length === 0}
                        >
                            Checkout
                        </button>
                    </div>

                    {/* Popular Products */}
                    <div className="CartContent-popular">
                        <h3 className="manrope font-600 size-14 CartContent-popular-title">
                            Popular Among Wellness Enthusiasts
                        </h3>
                        {popularProducts.map((product) => (
                            <div className="CartContent-popular-item" key={product.id}>
                                <div className="CartContent-popular-img">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="CartContent-popular-info">
                                    <span className="CartContent-popular-deal manrope font-400">{product.reviews}</span>
                                    <div className="CartContent-popular-rating">
                                        <span className="CartContent-popular-star">★</span>
                                        <span className="manrope font-600">{product.rating}</span>
                                    </div>
                                    <p className="CartContent-popular-name manrope font-600">{product.name}</p>
                                    <p className="CartContent-popular-desc manrope font-400">{product.desc}</p>
                                    <div className="CartContent-popular-bottom">
                                        <span className="CartContent-popular-price manrope font-700">${product.price.toFixed(2)}</span>
                                        <button
                                            className="CartContent-popular-add-btn manrope font-600"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <div>
                    {/* ── Promo Banner ── */}
                    <div className="CartContent-promo-banner manrope font-500">
                        <span className="CartContent-promo-logo">
                            <Link href={'/'} className='transition Header-logo-container'>
                                <svg width="209" height="40" viewBox="0 0 209 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M208.017 25.315C208.182 27.5643 206.701 28.8536 205.439 29.5119C205.411 29.5119 205.411 29.5119 205.411 29.5119C204.287 30.1154 202.888 30.3622 201.571 30.3622C200.638 30.3622 199.733 30.2525 199.047 30.0331C195.92 29.073 194.412 26.9883 193.698 25.3973L193.671 25.2876L196.579 24.4647L196.633 24.547C196.633 24.5744 197.374 26.1105 198.828 27.4272C200.309 28.8261 201.955 29.5119 203.738 29.4845C204.945 29.4845 206.097 29.0181 206.865 28.1129C207.332 27.5918 207.661 26.906 207.743 26.0831C207.716 25.2876 207.496 24.1904 206.591 23.4772C205.521 22.6542 204.095 22.956 202.312 23.3674C201.05 23.6417 199.623 23.9435 198.005 23.9435H197.978C195.948 23.9435 194.796 23.2577 194.165 22.572C193.506 21.8862 193.369 21.2004 193.342 21.2004C193.04 20.2129 193.287 18.9511 194.165 17.9636C195.509 16.2904 197.182 15.3577 199.102 15.1383C203.025 14.6994 206.755 17.5796 206.783 17.607L206.893 17.6893L204.726 19.8015L204.643 19.7192C204.588 19.6643 199.925 15.1383 195.481 17.2504C195.042 17.4699 194.658 17.7716 194.357 18.1008C194.329 18.1282 194.302 18.1556 194.302 18.1831H194.274C193.451 19.1706 193.259 20.4049 193.671 21.3102C194.192 22.5171 195.399 22.6268 197.319 22.2154C200.611 21.4747 204.342 20.6244 206.344 21.9685C207.249 22.5994 207.908 23.9161 208.017 25.315Z" fill="white" />
                                    <path d="M184.001 14.9457C188.335 14.9457 191.874 18.4842 191.874 22.7908C191.874 27.1249 188.335 30.636 184.001 30.636H176.348V11.4346H178.981V16.7835C180.38 15.604 182.163 14.9457 184.001 14.9457ZM182.849 30.2794C186.552 29.7582 189.323 26.5214 189.323 22.7908C189.323 20.569 188.335 18.5117 186.744 17.1127C184.522 15.1651 181.176 15.1926 178.981 17.1676V30.3617H181.752C182.136 30.3617 182.493 30.3342 182.849 30.2794Z" fill="white" />
                                    <path d="M174.668 15.9059L174.75 15.9882L173.762 18.6489L173.598 18.4843C173.515 18.4021 172.336 17.1951 170.69 16.8385C169.044 16.5093 167.398 17.3597 166.658 18.8409V30.6361H164.024V14.9458H166.658V18.2649C167.151 17.4146 168.358 15.7413 170.251 15.1652C171.65 14.7264 173.131 15.0007 174.668 15.9059Z" fill="white" />
                                    <path d="M158.923 23.7786L158.951 23.5592L161.666 25.0404L161.611 25.1501C160.487 28.4418 157.222 30.6363 153.464 30.6363C148.746 30.6363 144.933 27.0977 144.933 22.7637C144.933 18.4022 148.746 14.8911 153.464 14.8911C155.604 14.8911 157.661 15.6043 159.252 16.9484C160.816 18.2651 161.803 20.0755 161.995 22.0231V22.1876H149.377V21.9133H158.923C158.621 18.1005 156.235 15.1654 153.464 15.1654C150.447 15.1654 147.978 18.5668 147.978 22.7637C147.978 26.9606 150.447 30.362 153.464 30.362C156.207 30.362 158.567 27.5366 158.923 23.7786Z" fill="white" />
                                    <path d="M139.783 11.4346H142.746V30.636H139.783V20.6512H131.28V30.636H128.345V11.4346H131.28V20.3495H139.783V11.4346Z" fill="white" />
                                    <path d="M113.624 23.7786L113.651 23.5592L116.367 25.0404L116.312 25.1501C115.188 28.4418 111.923 30.6363 108.165 30.6363C103.447 30.6363 99.6342 27.0977 99.6342 22.7637C99.6342 18.4022 103.447 14.8911 108.165 14.8911C110.305 14.8911 112.362 15.6043 113.953 16.9484C115.517 18.2651 116.504 20.0755 116.696 22.0231V22.1876H104.078V21.9133H113.624C113.322 18.1005 110.936 15.1654 108.165 15.1654C105.148 15.1654 102.679 18.5668 102.679 22.7637C102.679 26.9606 105.148 30.362 108.165 30.362C110.908 30.362 113.267 27.5366 113.624 23.7786Z" fill="white" />
                                    <path d="M99.5537 15.9059L99.6359 15.9882L98.6484 18.6489L98.4839 18.4843C98.4016 18.4021 97.222 17.1951 95.5762 16.8385C93.9303 16.5093 92.2845 17.3597 91.5438 18.8409V30.6361H88.9105V14.9458H91.5438V18.2649C92.0376 17.4146 93.2445 15.7413 95.1373 15.1652C96.5363 14.7264 98.0175 15.0007 99.5537 15.9059Z" fill="white" />
                                    <path d="M83.3869 14.9458H86.0203V30.6361H83.3869V27.0975C83.0851 27.6736 82.6462 28.3319 82.0428 28.9354H82.0702C82.0428 28.9354 82.0428 28.9354 82.0153 28.9628C81.1101 29.8955 79.8209 30.6361 78.0927 30.6361C73.21 30.6361 73.1552 25.2871 73.1552 25.2323V14.9458H76.0628V26.2198C76.0628 27.2896 76.5017 28.3045 77.2424 28.9903C78.1476 29.8406 79.2448 30.0052 80.5066 29.484C81.4119 29.1274 82.1799 28.4691 82.7285 27.6736C83.0028 27.2347 83.2223 26.8232 83.3869 26.4941V14.9458Z" fill="white" />
                                    <path d="M68.4462 12.0106C70.4761 12.7787 71.7379 14.6714 71.5733 16.7012C71.491 17.9082 70.8876 19.1151 70.0372 19.746C69.9823 19.8009 69.9 19.8558 69.8452 19.8832C68.7205 20.6787 67.349 21.0353 66.0049 20.953C65.8403 20.9256 65.758 20.9256 65.758 20.9256C61.8628 20.7335 59.7506 22.2148 58.8454 23.0926V30.636H55.9103V11.4346H64.4413C65.1819 11.4346 65.9774 11.462 66.7455 11.5717C67.349 11.654 67.8976 11.7912 68.4462 12.0106ZM69.2966 16.3721C69.4337 14.4794 68.4188 12.7238 66.6632 11.846C65.9226 11.7363 65.1545 11.7363 64.4413 11.7363H58.8454V22.7085C59.394 22.2422 60.1895 21.6662 61.3416 21.2273C61.369 21.2273 61.3965 21.2273 61.4513 21.1999C62.2742 20.9256 63.2618 20.7061 64.4687 20.6512C65.6757 20.5964 66.8552 20.1849 67.8153 19.4169H67.8427C68.6382 18.786 69.2143 17.6065 69.2966 16.3721Z" fill="white" />
                                    <path d="M52.9429 30.636H50.3095V14.8909H52.9429V30.636ZM51.6262 14.0405C51.6262 12.669 50.5015 11.5718 49.1574 11.5718C50.5015 11.5718 51.6262 10.4471 51.6262 9.10303C51.6262 10.4471 52.7234 11.5718 54.095 11.5718C52.7234 11.5718 51.6262 12.669 51.6262 14.0405Z" fill="white" />
                                    <mask id="mask0_117_721" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="41" height="40">
                                        <path d="M23.1468 0.651369C26.114 -1.14664 29.9065 0.990381 29.9065 4.45996V4.71289C29.9065 5.85693 29.5938 6.97936 29.0012 7.95801L24.3684 15.6084C24.3549 15.6308 24.3393 15.6518 24.3255 15.6738C24.3477 15.6599 24.3694 15.6445 24.3919 15.6309L25.3577 15.0459L32.0423 10.999C33.0209 10.4065 34.1433 10.0928 35.2874 10.0928H35.5403C39.0096 10.093 41.1465 13.8855 39.3489 16.8525C39.3282 16.8867 39.3103 16.9235 39.2903 16.958C37.6324 19.366 37.2245 22.2963 37.6663 25.7041C37.6663 24.2557 38.1758 22.9569 38.7747 21.8897C38.9169 22.3235 39.1062 22.7461 39.3489 23.1465C41.1471 26.1137 39.0098 29.907 35.5403 29.9072H35.2874C34.1433 29.9072 33.0209 29.5935 32.0423 29.001L24.3919 24.3682C24.3685 24.354 24.3465 24.3377 24.3235 24.3232C24.3379 24.3463 24.3543 24.3682 24.3684 24.3916L29.0012 32.042C29.5938 33.0206 29.9064 34.1431 29.9065 35.2871V35.54C29.9065 39.0096 26.114 41.1466 23.1468 39.3486C22.7464 39.106 22.3236 38.9166 21.8899 38.7744C22.9572 38.1755 24.2559 37.666 25.7044 37.666C22.2965 37.2243 19.3664 37.6321 16.9583 39.29C16.9236 39.3101 16.8872 39.3278 16.8528 39.3486C13.8855 41.1468 10.0931 39.0097 10.093 35.54V35.2871C10.0931 34.143 10.4058 33.0206 10.9983 32.042L15.0462 25.3574L15.6311 24.3916C15.6448 24.369 15.6602 24.3475 15.6741 24.3252C15.652 24.339 15.631 24.3546 15.6087 24.3682L7.95828 29.001C6.9795 29.5936 5.85641 29.9072 4.71219 29.9072H4.45926C0.989699 29.9071 -1.14667 26.1137 0.651639 23.1465C0.894458 22.7458 1.08365 22.3228 1.22586 21.8887C1.82487 22.9561 2.33421 24.2555 2.33426 25.7041C2.77598 22.2964 2.36808 19.366 0.710233 16.958C0.690217 16.9234 0.672395 16.8868 0.651639 16.8525C-1.14616 13.8854 0.989886 10.0929 4.45926 10.0928H4.71219C5.85637 10.0928 6.97952 10.4064 7.95828 10.999L14.6428 15.0459L15.6087 15.6309C15.6306 15.6441 15.6515 15.6593 15.6731 15.6729C15.6596 15.6512 15.6444 15.6303 15.6311 15.6084L15.0462 14.6426L10.9983 7.95801C10.4058 6.97937 10.0931 5.85693 10.093 4.71289V4.45996C10.0931 0.990376 13.8855 -1.14665 16.8528 0.651369C16.8871 0.672163 16.9237 0.689907 16.9583 0.709963C19.3663 2.36776 22.2966 2.77573 25.7044 2.33399C24.256 2.33397 22.9572 1.82441 21.8899 1.22559C22.3237 1.0834 22.7464 0.894004 23.1468 0.651369ZM20.0003 7.21192C19.4709 14.0273 14.0559 19.4414 7.24051 19.9707C14.0559 20.5 19.4709 25.9151 20.0003 32.7305C20.5296 25.9152 25.9438 20.5001 32.7591 19.9707C25.9439 19.4412 20.5296 14.0272 20.0003 7.21192Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_117_721)">
                                        <rect x="-21.2073" y="-26.6055" width="80.9733" height="93.3109" rx="40" fill="white" />
                                    </g>
                                </svg>
                            </Link>
                        </span>
                        <span className='manrope size-24 font-600'>Unlock the <strong>Rewards</strong></span>
                        <span className='manrope font-600 size-24'>Get free Products and exclusive offers!</span>
                    </div>

                    {/* ── Trust Bar ── */}
                    <div className="CartContent-trust manrope font-500">
                        Pure Herbs. Certified Quality. Unbeatable Value — Guaranteed!
                    </div>

                    {/* ── Disclaimer ── */}
                    <p className="CartContent-disclaimer manrope font-400">
                        Your cart is where your wellness journey comes together. Product availability and pricing are updated regularly to ensure you see the latest information before checkout.
                    </p>
                </div>
            </div>

            <div className='CartContent-last-section'>
                <h6 className='manrope font-600 size-24'>Find your next favorites</h6>

                <div className='display-grid CartContent-last-section-grid'>
                    {suggestedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CartContent