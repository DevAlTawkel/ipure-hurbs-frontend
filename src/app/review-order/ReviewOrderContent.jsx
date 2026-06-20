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
                                    {/* <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="18" height="14" rx="2" fill="white" fillOpacity="0.3" />
                                        <rect x="0" y="4" width="18" height="3" fill="white" fillOpacity="0.6" />
                                    </svg> */}

                                    <svg
                                        version="1.1"
                                        id="Layer_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 512 512"
                                        xmlSpace="preserve"
                                    >
                                        <path style={{ fill: "#D5DCED" }} d="M503.172,432.552H8.828c-4.875,0-8.828-3.953-8.828-8.828V185.379h512v238.345 C512,428.599,508.047,432.552,503.172,432.552z" />
                                        <path style={{ fill: "#F1F4FB" }} d="M503.172,326.621H8.828c-4.875,0-8.828-3.953-8.828-8.828V88.276c0-4.875,3.953-8.828,8.828-8.828 h494.345c4.875,0,8.828,3.953,8.828,8.828v229.517C512,322.668,508.047,326.621,503.172,326.621z" />
                                        <path style={{ fill: "#B4E66E" }} d="M476.69,141.241c-14.603,0-26.483-11.88-26.483-26.483c0-4.875-3.948-8.828-8.828-8.828H70.621 c-4.879,0-8.828,3.953-8.828,8.828c0,14.603-11.88,26.483-26.483,26.483c-4.879,0-8.828,3.953-8.828,8.828V256 c0,4.875,3.948,8.828,8.828,8.828c14.603,0,26.483,11.88,26.483,26.483c0,4.875,3.948,8.828,8.828,8.828h370.759 c4.879,0,8.828-3.953,8.828-8.828c0-14.603,11.88-26.483,26.483-26.483c4.879,0,8.828-3.953,8.828-8.828V150.069 C485.517,145.194,481.569,141.241,476.69,141.241z M44.138,248.061v-90.051c17.267-3.518,30.905-17.155,34.422-34.422h84.972 c3.697,0,5.748,4.265,3.414,7.133c-16.058,19.733-25.705,44.888-25.705,72.314s9.646,52.582,25.705,72.316 c2.334,2.867,0.282,7.133-3.414,7.133H78.56C75.043,265.216,61.405,251.577,44.138,248.061z M467.862,248.061 c-17.267,3.518-30.905,17.155-34.422,34.422h-84.972c-3.697,0-5.748-4.265-3.414-7.133c16.058-19.734,25.705-44.889,25.705-72.316 s-9.646-52.582-25.705-72.316c-2.334-2.868-0.283-7.133,3.414-7.133h84.972c3.518,17.267,17.155,30.905,34.422,34.422V248.061z" />
                                        <circle style={{ fill: "#A0D755" }} cx="256" cy="203.034" r="97.103" />
                                        <path style={{ fill: "#F1F4FB" }} d="M264.828,196.255V168.49c11.081,1.836,17.655,6.748,17.655,9.717c0,4.875,3.948,8.828,8.828,8.828 c4.879,0,8.828-3.953,8.828-8.828c0-14.102-14.671-25.137-35.31-27.605v-0.533c0-4.875-3.948-8.828-8.828-8.828 c-4.879,0-8.828,3.953-8.828,8.828v0.533c-20.639,2.467-35.31,13.502-35.31,27.605c0,19.646,19.304,27.132,35.31,31.607v27.765 c-11.081-1.836-17.655-6.748-17.655-9.717c0-4.875-3.948-8.828-8.828-8.828s-8.828,3.953-8.828,8.828 c0,14.102,14.671,25.137,35.31,27.605V256c0,4.875,3.948,8.828,8.828,8.828c4.879,0,8.828-3.953,8.828-8.828v-0.533 c20.639-2.467,35.31-13.502,35.31-27.605C300.138,208.216,280.834,200.73,264.828,196.255z M229.517,178.207 c0-2.969,6.574-7.881,17.655-9.717v22.798C234.446,187.172,229.517,183.402,229.517,178.207z M264.828,237.579v-22.798 c12.726,4.116,17.655,7.887,17.655,13.081C282.483,230.831,275.908,235.743,264.828,237.579z" />
                                        <g>
                                            <circle style={{ fill: "#B4E66E" }} cx="35.31" cy="114.759" r="8.828" />
                                            <circle style={{ fill: "#B4E66E" }} cx="476.69" cy="114.759" r="8.828" />
                                            <circle style={{ fill: "#B4E66E" }} cx="35.31" cy="291.31" r="8.828" />
                                            <circle style={{ fill: "#B4E66E" }} cx="476.69" cy="291.31" r="8.828" />
                                        </g>
                                        <g>
                                            <rect y="344.276" style={{ fill: "#C7CFE2" }} width="512" height="17.655" />
                                            <rect y="379.586" style={{ fill: "#C7CFE2" }} width="512" height="17.655" />
                                            <path style={{ fill: "#C7CFE2" }} d="M503.172,432.552H8.828c-4.875,0-8.828-3.953-8.828-8.828v-8.828h512v8.828 C512,428.599,508.047,432.552,503.172,432.552z" />
                                        </g>
                                    </svg>
                                </div>
                                <span className="manrope font-500 size-13 color-black-black">
                                    {shippingInfo.upiId
                                        ? `UPI — ${shippingInfo.upiId}`
                                        : shippingInfo.cardNumber
                                            ? `Card ending ••••${String(shippingInfo.cardNumber).replace(/\s/g, '').slice(-4)}`
                                            : "Cash on Delivery (COD)"}
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