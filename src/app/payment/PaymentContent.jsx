"use client"

import React, { useState } from 'react'
import './PaymentContent.css'
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useCartStore } from "@/store/useCartStore";

// ── Helpers ───────────────────────────────────────────────────────────────────

// Format "4111111111111111" → "4111 1111 1111 1111"
const formatCardNumber = (value) => {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
};

// Mask all but last 4 digits for display: "•••• •••• •••• 1111"
const maskCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '•••• •••• •••• ••••';
    const last4 = digits.slice(-4).padStart(digits.length, '•');
    const padded = last4.padEnd(16, '•');
    return padded.replace(/(.{4})/g, '$1 ').trim();
};

const getCardBrand = (number) => {
    const n = number.replace(/\s/g, '');
    if (/^4/.test(n)) return 'VISA';
    if (/^5[1-5]/.test(n)) return 'MC';
    if (/^3[47]/.test(n)) return 'AMEX';
    if (/^6/.test(n)) return 'DISCOVER';
    return 'CARD';
};

// ── Card Preview Widget ───────────────────────────────────────────────────────

const CardPreview = ({ cardNumber, nameOnCard, expiryMonth, expiryYear }) => {
    const brand = getCardBrand(cardNumber);
    const displayNumber = maskCardNumber(cardNumber);
    const displayName = nameOnCard || 'FULL NAME';
    const displayExpiry = `${expiryMonth || 'MM'}/${expiryYear || 'YY'}`;

    return (
        <div className="card-preview">
            <div className="card-preview-top">
                <div className="card-chip">
                    <svg width="32" height="24" viewBox="0 0 32 24">
                        <rect width="32" height="24" rx="4" fill="#d4a843" />
                        <rect x="11" y="0" width="10" height="24" fill="#c49830" opacity="0.5" />
                        <rect x="0" y="8" width="32" height="8" fill="#c49830" opacity="0.5" />
                    </svg>
                </div>
                <span className="card-brand">{brand}</span>
            </div>
            <div className="card-number-display">{displayNumber}</div>
            <div className="card-preview-bottom">
                <div>
                    <p className="card-label">Card Holder</p>
                    <p className="card-value">{displayName.toUpperCase()}</p>
                </div>
                <div>
                    <p className="card-label">Expires</p>
                    <p className="card-value">{displayExpiry}</p>
                </div>
            </div>
        </div>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────

const PaymentContent = () => {
    const shippingInfo = useCheckoutStore((state) => state.shippingInfo);
    const paymentInfo = useCheckoutStore((state) => state.paymentInfo);
    const setPaymentInfo = useCheckoutStore((state) => state.setPaymentInfo);
    const { checkoutItem } = useCheckoutStore();
    const { cart } = useCartStore();
    const router = useRouter();

    const [form, setForm] = useState(paymentInfo); // initialize from store

    const shippingAddress = {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        line1: shippingInfo.address1,
        line2: shippingInfo.address2,
        country: shippingInfo.country,
        email: shippingInfo.email,
        phone: shippingInfo.contact,
    };

    const displayItems = checkoutItem
        ? [{
            id: checkoutItem.productId,
            name: checkoutItem.productName,
            desc: "",
            quantity: checkoutItem.qty,
            size: checkoutItem.variantName ?? "N/A",
            price: `$${(checkoutItem.price * checkoutItem.qty).toFixed(2)}`,
            unitPrice: checkoutItem.price,
            image: checkoutItem.productImage,
        }]
        : cart.map((item) => ({
            id: item.id,
            name: item.name,
            desc: item.description ?? "",
            quantity: item.quantity,
            size: item.size ?? "N/A",
            price: `$${(item.price * item.quantity).toFixed(2)}`,
            unitPrice: item.price,
            image: item.image,
        }));

    const subtotal = displayItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const deliveryFee = subtotal >= 100 ? 0 : 30;
    const total = subtotal + deliveryFee;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Auto-format card number as user types
        if (name === 'cardNumber') {
            setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));
            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleContinue = () => {
        // Save card details to store so ReviewOrder can access them
        setPaymentInfo(form);
        router.push('/review-order');
    };

    return (
        <div className="PaymentContent-main-container">
            <h1 className="manrope font-600 size-20 color-black-black PaymentContent-page-title">Checkout</h1>

            <div className="PaymentContent-layout">
                {/* ── Left Panel ── */}
                <div className="PaymentContent-left-container">

                    {/* Delivery Section */}
                    <div className="payment-section">
                        <div className="payment-section-header">
                            <div className="payment-section-title">
                                <span className="check-circle">✓</span>
                                <span className="manrope font-600 size-14 color-black-black">Delivery</span>
                            </div>
                            <button className="manrope font-500 size-12 edit-btn" onClick={() => router.push("/shipping-info")}>
                                Edit
                            </button>
                        </div>
                        <div className="collapsed-address">
                            <p className="manrope font-600 size-11 color-muted address-label">Ship To</p>
                            <p className="manrope font-400 size-13 color-muted">
                                {shippingAddress.name}<br />
                                {shippingAddress.line1}<br />
                                {shippingAddress.line2 && <>{shippingAddress.line2}<br /></>}
                                {shippingAddress.country}<br />
                                {shippingAddress.email}<br />
                                {shippingAddress.phone}
                            </p>
                            <div className="delivery-badge-row">
                                <h6 className="manrope font-600 size-20 delivery-badge">
                                    {shippingInfo.shippingMethod === "express" ? "Express delivery" : "Standard delivery"}
                                </h6>
                                <span className="manrope font-400 size-16 color-muted">
                                    {shippingInfo.shippingMethod === "express"
                                        ? "Estimated Delivery Date: 3 to 4 working days."
                                        : "Estimated Delivery Date: 5 to 7 working days."}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="payment-section">
                        <div className="payment-section-header">
                            <div className="payment-section-title">
                                <span className="check-circle">✓</span>
                                <span className="manrope font-600 size-14 color-black-black">Payment</span>
                            </div>
                        </div>

                        <div className="card-method-row">
                            <div className="card-method-icon">
                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                                    <rect width="18" height="14" rx="2" fill="white" fillOpacity="0.3" />
                                    <rect x="0" y="4" width="18" height="3" fill="white" fillOpacity="0.6" />
                                </svg>
                            </div>
                            <span className="manrope font-500 size-13 color-black-black">Credit or Debit Card</span>
                        </div>

                        {/* ── Live Card Preview ── */}
                        {/* <CardPreview
                            cardNumber={form.cardNumber}
                            nameOnCard={form.nameOnCard}
                            expiryMonth={form.expiryMonth}
                            expiryYear={form.expiryYear}
                        /> */}

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
                                placeholder="1234 5678 9012 3456"
                                value={form.cardNumber}
                                onChange={handleChange}
                                className="manrope"
                                maxLength={19}
                                inputMode="numeric"
                            />
                            <div className="form-row">
                                <select name="expiryMonth" value={form.expiryMonth} onChange={handleChange} className="manrope">
                                    <option value="" disabled>MM</option>
                                    {Array.from({ length: 12 }, (_, i) => {
                                        const m = String(i + 1).padStart(2, '0');
                                        return <option key={m} value={m}>{m}</option>;
                                    })}
                                </select>
                                <select name="expiryYear" value={form.expiryYear} onChange={handleChange} className="manrope">
                                    <option value="" disabled>YY</option>
                                    {[25, 26, 27, 28, 29, 30, 31, 32, 33, 34].map(y => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                                <input
                                    type="password"
                                    name="cvv"
                                    placeholder="CVV*"
                                    value={form.cvv}
                                    onChange={handleChange}
                                    className="manrope"
                                    maxLength={4}
                                    inputMode="numeric"
                                />
                            </div>

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
                                    {shippingAddress.line2 && <>{shippingAddress.line2}<br /></>}
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

                    <div className="section-step">
                        <h2 className="manrope font-500 size-14 color-muted">Review Order</h2>
                    </div>
                </div>

                {/* ── Right Panel ── */}
                <div className="PaymentContent-right-container">
                    <div className="summary-box">
                        <h2 className='manrope font-700 color-deep-forest-green size-24'>Summary</h2>
                        <div className="summary-row">
                            <span className="label size-16">Subtotal ({displayItems.length} {displayItems.length === 1 ? "item" : "items"})</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span className="label">{shippingInfo.shippingMethod === "express" ? "Express delivery" : "Standard delivery"}</span>
                            <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Free"}</span>
                        </div>
                        <div className="summary-divider" />
                        <div className="summary-total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <p className="summary-tax">Including taxes</p>
                    </div>

                    <div className="cart-items-box">
                        <div className="cart-items-header"><a href="#">View more</a></div>
                        {displayItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-img-placeholder">
                                    <img src={item.image} alt={item.name}
                                        onError={(e) => { e.target.src = "https://placehold.co/80x80/f3f4f6/9ca3af?text=Img"; }} />
                                </div>
                                <div className="cart-item-info">
                                    <span className="cart-item-name">{item.name}</span>
                                    {item.desc && <span className="cart-item-desc">{item.desc}</span>}
                                    <span className="cart-item-meta">Quantity: {item.quantity}</span>
                                    <span className="cart-item-meta">Size: {item.size}</span>
                                    <span className="cart-item-price">{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentContent;