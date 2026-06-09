"use client"

import React from 'react'
import './ReviewOrderContent.css'
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useCartStore } from "@/store/useCartStore";

const ReviewOrderContent = () => {

    const shippingInfo = useCheckoutStore((state) => state.shippingInfo);
    const { checkoutItem } = useCheckoutStore();
    const { cart } = useCartStore();

    const router = useRouter();

    const shippingAddress = {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        line1: shippingInfo.address1,
        line2: shippingInfo.address2,
        country: shippingInfo.country,
        email: shippingInfo.email,
        phone: shippingInfo.contact,
    };

    // ── Same display items logic as PaymentContent ─────────────────────────
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

    // ── Summary calculations ───────────────────────────────────────────────
    const subtotal = displayItems.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity, 0
    );
    const deliveryFee = subtotal >= 100 ? 0 : 30;
    const total = subtotal + deliveryFee;

    const handlePlaceOrder = () => {
        // TODO: trigger order submission logic here
        router.push('/order-confirmation');
    };

    return (
        <div className="ReviewOrderContent-main-container">
            <h1 className="manrope font-600 size-20 color-black-black ReviewOrderContent-page-title">Checkout</h1>

            <div className="ReviewOrderContent-layout">
                {/* ── Left Panel ── */}
                <div className="ReviewOrderContent-left-container">

                    {/* Delivery — collapsed */}
                    <div className="review-section">
                        <div className="review-section-header">
                            <div className="review-section-title">
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
                                {shippingAddress.line2 && <>{shippingAddress.line2}<br /></>}
                                {shippingAddress.country}<br />
                                {shippingAddress.email}<br />
                                {shippingAddress.phone}
                            </p>
                            {/* <div className="delivery-badge-row">
                                <h6 className="manrope font-600 size-20 delivery-badge">
                                    {shippingInfo.shippingMethod === "express" ? "Express delivery" : "Standard delivery"}
                                </h6>
                                <span className="manrope font-400 size-16 color-muted">
                                    {shippingInfo.shippingMethod === "express"
                                        ? "Estimated Delivery Date: 3 to 4 working days."
                                        : "Estimated Delivery Date: 5 to 7 working days."}
                                </span>
                            </div> */}
                        </div>
                    </div>

                    {/* Payment — collapsed */}
                    <div className="review-section">
                        <div className="review-section-header">
                            <div className="review-section-title">
                                <span className="check-circle">✓</span>
                                <span className="manrope font-600 size-14 color-black-black">Payment</span>
                            </div>
                            <button
                                className="manrope font-500 size-12 edit-btn"
                                onClick={() => router.push("/payment")}
                            >
                                Edit
                            </button>
                        </div>
                        <div className="collapsed-payment">
                            <div className="card-method-row">
                                <div className="card-method-icon">
                                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="18" height="14" rx="2" fill="white" fillOpacity="0.3" />
                                        <rect x="0" y="4" width="18" height="3" fill="white" fillOpacity="0.6" />
                                    </svg>
                                </div>
                                <span className="manrope font-500 size-13 color-black-black">
                                    {shippingInfo.upiId
                                        ? `UPI — ${shippingInfo.upiId}`
                                        : shippingInfo.cardNumber
                                            ? `Card ending ••••${String(shippingInfo.cardNumber).replace(/\s/g, '').slice(-4)}`
                                            : "Credit or Debit Card"}
                                </span>
                            </div>
                            {shippingInfo.nameOnCard && (
                                <p className="manrope font-400 size-13 color-muted card-name-preview">
                                    {shippingInfo.nameOnCard}
                                    {shippingInfo.expiryMonth && shippingInfo.expiryYear &&
                                        ` · Expires ${shippingInfo.expiryMonth}/${shippingInfo.expiryYear}`}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Review Order — active */}
                    <div className="review-section review-section--active">
                        {/* <div className="review-section-header">
                            <div className="review-section-title">
                                <span className="step-number manrope font-600 size-13">3</span>
                                <span className="manrope font-600 size-14 color-black-black">Review Order</span>
                            </div>
                        </div> */}

                        {/* Order Items */}
                        {/* <div className="review-order-items">
                            {displayItems.map((item) => (
                                <div className="review-order-item" key={item.id}>
                                    <div className="review-item-img">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            onError={(e) => { e.target.src = "https://placehold.co/80x80/f3f4f6/9ca3af?text=Img"; }}
                                        />
                                    </div>
                                    <div className="review-item-info">
                                        <span className="manrope font-600 size-14 color-black-black review-item-name">{item.name}</span>
                                        {item.desc && <span className="manrope font-400 size-12 color-muted">{item.desc}</span>}
                                        <span className="manrope font-400 size-12 color-muted">Quantity: {item.quantity}</span>
                                        <span className="manrope font-400 size-12 color-muted">Size: {item.size}</span>
                                    </div>
                                    <div className="review-item-price">
                                        <span className="manrope font-600 size-14 color-black-black">{item.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div> */}

                        {/* Delivery & Billing summary inside review */}
                        {/* <div className="review-details-grid">
                            <div className="review-detail-block">
                                <p className="manrope font-600 size-11 color-muted review-detail-label">Deliver To</p>
                                <p className="manrope font-400 size-13 color-black-black">
                                    {shippingAddress.name}<br />
                                    {shippingAddress.line1}<br />
                                    {shippingAddress.line2 && <>{shippingAddress.line2}<br /></>}
                                    {shippingAddress.country}
                                </p>
                            </div>
                            <div className="review-detail-block">
                                <p className="manrope font-600 size-11 color-muted review-detail-label">Billing Address</p>
                                <p className="manrope font-400 size-13 color-black-black">
                                    {shippingInfo.billingSameAsShipping
                                        ? <>Same as shipping address</>
                                        : <>
                                            {shippingAddress.name}<br />
                                            {shippingAddress.line1}
                                        </>}
                                </p>
                            </div>
                            <div className="review-detail-block">
                                <p className="manrope font-600 size-11 color-muted review-detail-label">Shipping Method</p>
                                <p className="manrope font-400 size-13 color-black-black">
                                    {shippingInfo.shippingMethod === "express" ? "Express delivery" : "Standard delivery"}<br />
                                    <span className="color-muted">
                                        {shippingInfo.shippingMethod === "express"
                                            ? "3–4 working days"
                                            : "5–7 working days"}
                                    </span>
                                </p>
                            </div>
                            <div className="review-detail-block">
                                <p className="manrope font-600 size-11 color-muted review-detail-label">Payment</p>
                                <p className="manrope font-400 size-13 color-black-black">
                                    {shippingInfo.upiId
                                        ? `UPI — ${shippingInfo.upiId}`
                                        : shippingInfo.cardNumber
                                            ? `Card ••••${String(shippingInfo.cardNumber).replace(/\s/g, '').slice(-4)}`
                                            : "Credit / Debit Card"}
                                </p>
                            </div>
                        </div> */}

                        <button
                            className="manrope font-600 size-15 color-white ReviewOrderContent-btn-place-order"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>

                {/* ── Right Panel ── */}
                <div className="ReviewOrderContent-right-container">

                    {/* Summary */}
                    <div className="summary-box">
                        <h2 className="manrope font-700 color-deep-forest-green size-24">Summary</h2>

                        <div className="summary-row">
                            <span className="label size-16">
                                Subtotal ({displayItems.length} {displayItems.length === 1 ? "item" : "items"})
                            </span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span className="label">
                                {shippingInfo.shippingMethod === "express" ? "Express delivery" : "Standard delivery"}
                            </span>
                            <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Free"}</span>
                        </div>

                        <div className="summary-divider" />

                        <div className="summary-total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <p className="summary-tax">Including taxes</p>
                    </div>

                    {/* Cart Items */}
                    <div className="cart-items-box">
                        <div className="cart-items-header">
                            <a href="#">View more</a>
                        </div>
                        {displayItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-img-placeholder">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        onError={(e) => { e.target.src = "https://placehold.co/80x80/f3f4f6/9ca3af?text=Img"; }}
                                    />
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

export default ReviewOrderContent;