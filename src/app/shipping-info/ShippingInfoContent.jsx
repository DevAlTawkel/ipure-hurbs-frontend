"use client"

import React, { useState } from 'react'
import './ShippingInfoContent.css'

const cartItems = [
    {
        id: 1,
        name: 'Happy Knights Prash',
        desc: 'Plant-based herbal formula for energy and men\'s wellness',
        quantity: 1,
        size: '250 gm',
        price: '$66.89',
        image: '/assets/products/product-01.png'
    },
    {
        id: 2,
        name: 'Happy Knights Prash',
        desc: 'Plant-based herbal formula for energy and men\'s wellness',
        quantity: 1,
        size: '250 gm',
        price: '$66.89',
        image: '/assets/products/product-02.png'
    },
    {
        id: 3,
        name: 'Happy Knights Prash',
        desc: 'Plant-based herbal formula for energy and men\'s wellness',
        quantity: 1,
        size: '250 gm',
        price: '$66.89',
        image: '/assets/products/product-03.png'
    },
]

const ShippingInfoContent = () => {
    const [form, setForm] = useState({
        country: '',
        firstName: '',
        lastName: '',
        contact: '',
        email: '',
        address1: '',
        address2: '',
        building: '',
        city: '',
        zip: '',
        defaultAddress: false,
        shippingMethod: 'standard',
        promoCode: '',
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSaveAddress = (e) => {
        e.preventDefault()
        alert('Address saved!')
    }

    const handleContinue = () => {
        alert('Proceeding to payment...')
    }

    return (
        <div className="ShippingInfoContent-main-container">
            {/* ── Left Panel ── */}
            <div className="ShippingInfoContent-left-container">
                <h2 className='manrope font-700 size-24 color-deep-forest-green'>Shipping information</h2>

                <form className="shipping-form" onSubmit={handleSaveAddress}>
                    {/* Country */}
                    <div className="select-wrapper">
                        <select name="country" value={form.country} onChange={handleChange}>
                            <option value="" disabled>Country</option>
                            <option value="uae">UAE</option>
                            <option value="uk">UK</option>
                            {/* <option value="us">United States</option>
                            <option value="sg">Singapore</option>
                            <option value="in">India</option> */}
                        </select>
                    </div>

                    {/* Name Row */}
                    <div className="form-row">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={form.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Contact + Email */}
                    <div className="form-row">
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contact number"
                            value={form.contact}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Id"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Address Line 1 */}
                    <input
                        type="text"
                        name="address1"
                        placeholder="Address (Line 1)"
                        value={form.address1}
                        onChange={handleChange}
                    />

                    {/* Address Line 2 */}
                    <input
                        type="text"
                        name="address2"
                        placeholder="Address (Line 2)"
                        value={form.address2}
                        onChange={handleChange}
                    />

                    {/* Building / City / Zip */}
                    <div className="form-row">
                        <input
                            type="text"
                            name="building"
                            placeholder="Building name"
                            value={form.building}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={form.city}
                            onChange={handleChange}
                            style={{ flex: '0 0 calc(33% - 6px)' }}
                        />
                        <input
                            type="text"
                            name="zip"
                            placeholder="Zip Code"
                            value={form.zip}
                            onChange={handleChange}
                            style={{ flex: '0 0 calc(33% - 6px)' }}
                        />
                    </div>

                    {/* Default Address */}
                    <label className="manrope font-400 size-16 color-black-black checkbox-label">
                        <input
                            type="checkbox"
                            name="defaultAddress"
                            checked={form.defaultAddress}
                            onChange={handleChange}
                        />
                        Set as Default Address
                    </label>

                    {/* Save Address */}
                    <button
                        className="size-16 manrope font-600 transition cursor-pointer color-white ShippingInfoContent-btn-buy"
                        type="submit"
                    >
                        Save Address
                    </button>
                </form>

                {/* ── Shipping Method ── */}
                <div className="shipping-method-section">
                    <h3 className='manrope font-500 size-18 color-black-black size-18'>Shipping Method</h3>
                    <div className="shipping-options">
                        <div className="shipping-option">
                            <label className='manrope size-16 color-black-black'>
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="standard"
                                    checked={form.shippingMethod === 'standard'}
                                    onChange={handleChange}
                                    className='manrope size-16 color-black-black'
                                />
                                Standard delivery
                            </label>
                            <span className='manrope size-16 color-black-black'>Delivery in 5 to 7 working days</span>
                        </div>
                        <div className="shipping-option">
                            <label className='manrope size-16 color-black-black'>
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="express"
                                    checked={form.shippingMethod === 'express'}
                                    onChange={handleChange}
                                    className='manrope size-16 color-black-black'
                                />
                                Express delivery
                            </label>
                            <span className='manrope size-16 color-black-black'>Delivery in 3 to 4 working days</span>
                        </div>
                    </div>
                </div>

                {/* ── Coupon + Continue ── */}
                <div className="section-footer">
                    <div className="coupon-section">
                        <h3 className='manrope color-deep-forest-green'>Apply coupon</h3>
                        <div className="coupon-row">
                            <input
                                type="text"
                                name="promoCode"
                                placeholder="Enter Promo Code"
                                value={form.promoCode}
                                onChange={handleChange}
                                className='manrope'
                            />
                        </div>
                    </div>

                    <button className="size-16 manrope font-600 transition cursor-pointer color-white ShippingInfoContent-btn-continue" onClick={handleContinue}>
                        Continue Payment
                    </button>
                </div>

                {/* ── Collapsed Steps ── */}
                <div className="section-step">
                    <h2>Payment</h2>
                </div>
                <div className="section-step">
                    <h2>Review Order</h2>
                </div>
            </div>

            {/* ── Right Panel ── */}
            <div className="ShippingInfoContent-right-container">
                {/* Summary Box */}
                <div className="summary-box">
                    <h2 className='manrope font-700 color-deep-forest-green size-24'>Summary</h2>

                    <div className="summary-row">
                        <span className="label size-16">Subtotal (3 items)</span>
                        <span>$200.67</span>
                    </div>
                    <div className="summary-row">
                        <span className="label">Express delivery</span>
                        <span>$20.00</span>
                    </div>
                    <div className="summary-row">
                        <span className="discount">Shipping discount</span>
                        <span className="discount">-$10.00</span>
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-total">
                        <span>Total</span>
                        <span>$225.67</span>
                    </div>
                    <p className="summary-tax">Including taxes</p>
                </div>

                {/* Cart Items */}
                <div className="cart-items-box">
                    <div className="cart-items-header">
                        <a href="#">View more</a>
                    </div>
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <div className="cart-item-img-placeholder">
                                <img src={item.image} alt="" />
                            </div>
                            <div className="cart-item-info">
                                <span className="cart-item-name">{item.name}</span>
                                <span className="cart-item-desc">{item.desc}</span>
                                <span className="cart-item-meta">
                                    Quantity : {item.quantity}
                                </span>
                                <span className="cart-item-meta">Size : {item.size}</span>
                                <span className="cart-item-price">{item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment Options */}
                <div className="payment-options-box">
                    <h3>Payment Options</h3>
                    <div className="payment-icons">
                        {['VISA', 'MC', 'AMEX', 'PYPL', 'GPay'].map((label) => (
                            <div className="payment-icon" key={label}>
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShippingInfoContent