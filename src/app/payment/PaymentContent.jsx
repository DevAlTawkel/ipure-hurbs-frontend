"use client"

import React, { useState } from 'react'
import './PaymentContent.css'
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from "@/store/useCheckoutStore";

const cartItems = [
    {
        id: 1,
        name: 'Happy Knights Prash',
        desc: "Plant-based herbal formula for energy and men's wellness",
        quantity: 1,
        size: '250 gm',
        price: '$66.89',
        image: '/assets/products/product-01.png'
    },
    {
        id: 2,
        name: 'Happy Knights Prash',
        desc: "Plant-based herbal formula for energy and men's wellness",
        quantity: 1,
        size: '250 gm',
        price: '$66.89',
        image: '/assets/products/product-02.png'
    },
    {
        id: 3,
        name: 'Happy Knights Prash',
        desc: "Plant-based herbal formula for energy and men's wellness",
        quantity: 1,
        size: '250 gm',
        price: '$66.89',
        image: '/assets/products/product-03.png'
    },
]

const shippingAddress = {
    name: 'Sarah Jane',
    line1: 'Flat 502 Crimson Tower',
    line2: 'Birmingham, West Midlands',
    country: 'England',
    email: 'sarahj@gmail.com',
    phone: '+44 7914-357212',
}

const PaymentContent = () => {

    const shippingInfo = useCheckoutStore(
        (state) => state.shippingInfo
    );

    const router = useRouter();

    const [form, setForm] = useState(shippingInfo)

    const shippingAddress = {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        line1: shippingInfo.address1,
        line2: shippingInfo.address2,
        country: shippingInfo.country,
        email: shippingInfo.email,
        phone: shippingInfo.contact,
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleContinue = () => {
        router.push('/review-order');
    }

    return (
        <div className="PaymentContent-main-container">
            <h1 className="manrope font-600 size-20 color-black-black PaymentContent-page-title">Checkout</h1>

            <div className="PaymentContent-layout">
                {/* ── Left Panel ── */}
                <div className="PaymentContent-left-container">

                    {/* ── Delivery Section (collapsed) ── */}
                    <div className="payment-section">
                        <div className="payment-section-header">
                            <div className="payment-section-title">
                                <span className="check-circle">✓</span>
                                <span className="manrope font-600 size-14 color-black-black">Delivery</span>
                            </div>
                            <button
                                className="manrope font-500 size-12 edit-btn"
                                onClick={() => router.push("/shipping-info")}
                            >
                                Edit
                            </button>
                        </div>
                        <div className="collapsed-address">
                            <p className="manrope font-600 size-11 color-muted address-label">Ship To</p>
                            <p className="manrope font-400 size-13 color-muted">
                                {shippingAddress.name}<br />
                                {shippingAddress.line1}<br />
                                {shippingAddress.line2}<br />
                                {shippingAddress.country}<br />
                                {shippingAddress.email}<br />
                                {shippingAddress.phone}
                            </p>
                            <div className="delivery-badge-row">
                                <h6 className="manrope font-600 size-20 delivery-badge">Standard delivery</h6>
                                <span className="manrope font-400 size-16 color-muted">Estimated Delivery Date: 5 to 7 working days.</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Payment Section ── */}
                    <div className="payment-section">
                        <div className="payment-section-header">
                            <div className="payment-section-title">
                                <span className="check-circle">✓</span>
                                <span className="manrope font-600 size-14 color-black-black">Payment</span>
                            </div>
                        </div>

                        {/* Card method selector */}
                        <div className="card-method-row">
                            <div className="card-method-icon">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="18" height="14" rx="2" fill="white" fillOpacity="0.3" />
                                    <rect x="0" y="4" width="18" height="3" fill="white" fillOpacity="0.6" />
                                </svg>
                            </div>
                            <span className="manrope font-500 size-13 color-black-black">Credit or Debit Card</span>
                        </div>

                        <p className="manrope font-500 size-13 color-muted payment-detail-label">Enter your payment details:</p>

                        <div className="payment-form">
                            <input
                                type="text"
                                name="nameOnCard"
                                placeholder="Name on Card*"
                                value={form.nameOnCard}
                                onChange={handleChange}
                                className="manrope"
                            />
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number*"
                                value={form.cardNumber}
                                onChange={handleChange}
                                className="manrope"
                                maxLength={19}
                            />
                            <div className="form-row">
                                <select
                                    name="expiryMonth"
                                    value={form.expiryMonth}
                                    onChange={handleChange}
                                    className="manrope"
                                >
                                    <option value="" disabled>MM</option>
                                    {Array.from({ length: 12 }, (_, i) => {
                                        const m = String(i + 1).padStart(2, '0')
                                        return <option key={m} value={m}>{m}</option>
                                    })}
                                </select>
                                <select
                                    name="expiryYear"
                                    value={form.expiryYear}
                                    onChange={handleChange}
                                    className="manrope"
                                >
                                    <option value="" disabled>YY</option>
                                    {[25, 26, 27, 28, 29, 30].map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV*"
                                    value={form.cvv}
                                    onChange={handleChange}
                                    className="manrope"
                                    maxLength={4}
                                />
                            </div>

                            {/* UPI */}
                            <div className="upi-section">
                                <p className="manrope font-500 size-13 color-black-black">UPI Options available:</p>
                                <input
                                    type="text"
                                    name="upiId"
                                    placeholder="Enter UPI ID"
                                    value={form.upiId}
                                    onChange={handleChange}
                                    className="manrope"
                                />
                            </div>
                        </div>

                        {/* Billing address */}
                        <label className="manrope font-400 size-13 color-muted billing-checkbox-label">
                            <input
                                type="checkbox"
                                name="billingSameAsShipping"
                                checked={form.billingSameAsShipping}
                                onChange={handleChange}
                            />
                            Billing address same as Shipping
                        </label>

                        {form.billingSameAsShipping && (
                            <div className="billing-address-block">
                                <p className="manrope font-600 size-11 color-muted address-label">Shipping Address:</p>
                                <p className="manrope font-400 size-13 color-muted">
                                    {shippingAddress.name}<br />
                                    {shippingAddress.line1}<br />
                                    {shippingAddress.line2}<br />
                                    {shippingAddress.country}<br />
                                    {shippingAddress.email}<br />
                                    {shippingAddress.phone}
                                </p>
                            </div>
                        )}

                        <button
                            className="manrope font-600 size-15 color-white PaymentContent-btn-continue"
                            onClick={handleContinue}
                        >
                            Continue to Review Order
                        </button>
                    </div>

                    {/* ── Collapsed Steps ── */}
                    <div className="section-step">
                        <h2 className="manrope font-500 size-14 color-muted">Review Order</h2>
                    </div>
                </div>

                {/* ── Right Panel ── */}
                <div className="PaymentContent-right-container">

                    {/* Summary */}
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

                </div>
            </div>
        </div>
    )
}

export default PaymentContent