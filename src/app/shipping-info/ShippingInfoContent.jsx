"use client"

import React, { useEffect, useState } from 'react'
import './ShippingInfoContent.css'
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useCartStore } from "@/store/useCartStore";
import toast from 'react-hot-toast';
import orderService from '@/services/orderService';

const ShippingInfoContent = () => {

    const router = useRouter();
    const { shippingInfo, setShippingInfo, checkoutItem } = useCheckoutStore();

    const { cart } = useCartStore();

    const [form, setForm] = useState(shippingInfo);
    const [hydrated, setHydrated] = useState(false);

    const [priceSummary, setPriceSummary] = useState(null);
    const [priceLoading, setPriceLoading] = useState(false);

    // Build the payload from store data
    const buildPayload = (items, shippingMethod) => ({
        items: items.map((item) => ({
            product_id: item.id,
            variant_id: checkoutItem?.variantId ?? null,
            quantity: item.quantity
        })),
        shipping_method: shippingMethod,
        promo_code: form.promoCode || null,
    });

    // Fetch price whenever shipping method or items change
    useEffect(() => {
        if (!hydrated || displayItems.length === 0) return;

        setPriceLoading(true);
        orderService.calculatePrice(buildPayload(displayItems, form.shippingMethod))
            .then((data) => setPriceSummary(data))
            .catch(() => setPriceSummary(null))
            .finally(() => setPriceLoading(false));
    }, [hydrated, form.shippingMethod, form.promoCode]);


    useEffect(() => {
        const unsub = useCheckoutStore.persist.onFinishHydration(() => {
            const { shippingInfo, checkoutItem } = useCheckoutStore.getState();
            const base = { ...shippingInfo };
            if (checkoutItem?.shippingMethod) {
                base.shippingMethod = checkoutItem.shippingMethod;
            }
            setForm(base);
            setHydrated(true);
        });

        // If already hydrated (e.g. navigating between pages, not a refresh)
        if (useCheckoutStore.persist.hasHydrated()) {
            const { shippingInfo, checkoutItem } = useCheckoutStore.getState();
            const base = { ...shippingInfo };
            if (checkoutItem?.shippingMethod) {
                base.shippingMethod = checkoutItem.shippingMethod;
            }
            setForm(base);
            setHydrated(true);
        }

        return () => unsub();
    }, []);

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

    const subtotal = priceSummary?.subtotal ?? displayItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const deliveryFee = priceSummary?.delivery_fee ?? (() => {
        if (subtotal >= 100) return 0;
        if (form.shippingMethod === "express") return 40;
        return 30;
    })();
    const discount = priceSummary?.discount ?? 0;
    const total = priceSummary?.total ?? (subtotal + deliveryFee);

    // ... your existing handleChange, handleSaveAddress, handleContinue unchanged ...
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSaveAddress = (e) => {
        e.preventDefault();

        const requiredFields = ["country", "firstName", "lastName", "contact", "email", "address1", "city", "zip"];
        const emptyFields = requiredFields.filter((field) => !form[field] || form[field].trim() === "");

        if (emptyFields.length > 0) {
            toast.error(`Please fill in: ${emptyFields.join(", ")}`);
            return;
        }

        setShippingInfo(form);
        toast.success("Address saved!");
    };

    const handleContinue = () => {
        const requiredFields = ["country", "firstName", "lastName", "contact", "email", "address1", "city", "zip"];
        const emptyFields = requiredFields.filter((field) => !form[field] || form[field].trim() === "");
        if (emptyFields.length > 0) {
            toast.error(`Please fill in all required fields: ${emptyFields.join(", ")}`);
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        const phoneRegex = /^\+?\d{7,15}$/;
        if (!phoneRegex.test(form.contact)) {
            toast.error("Please enter a valid contact number.");
            return;
        }
        setShippingInfo(form);
        // toast.success("Shipping info saved!");
        router.push("/payment");
    };

    if (!hydrated) return (
        <div className="ShippingInfoContent-main-container webpage-container">
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
                <p className="manrope font-400 size-16 color-deep-forest-green">Loading...</p>
            </div>
        </div>
    );

    return (
        <div className="ShippingInfoContent-main-container webpage-container">
            {/* ── Left Panel ── */}
            <div className="ShippingInfoContent-left-container">
                <h2 className='manrope font-700 size-24 color-deep-forest-green'>Shipping information</h2>

                <form className="shipping-form" onSubmit={handleSaveAddress}>
                    {/* Country */}
                    <div className="select-wrapper">
                        <select name="country" value={form.country} onChange={handleChange}>
                            <option value="" disabled>Country</option>
                            {/* <option value="uae">UAE</option> */}
                            <option value="uk">UK</option>
                            <option value="uk">USA</option>
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

            <div className="ShippingInfoContent-right-container">
                {/* Summary Box */}
                <div className="summary-box">
                    <h2 className='manrope font-700 color-deep-forest-green size-24'>Summary</h2>

                    {priceLoading ? (
                        <p className="manrope font-400 size-14" style={{ color: '#888' }}>Calculating...</p>
                    ) : (
                        <>
                            <div className="summary-row">
                                <span className="label size-16">
                                    Subtotal ({displayItems.length} {displayItems.length === 1 ? "item" : "items"})
                                </span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span className="label">
                                    {form.shippingMethod === "express" ? "Express delivery" : "Standard delivery"}
                                </span>
                                <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Free"}</span>
                            </div>
                            {discount > 0 && (
                                <div className="summary-row" style={{ color: 'green' }}>
                                    <span className="label">Discount</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="summary-divider" />
                            <div className="summary-total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <p className="summary-tax">Including taxes</p>
                        </>
                    )}
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
                                {item.desc && (
                                    <span className="cart-item-desc">{item.desc}</span>
                                )}
                                <span className="cart-item-meta">Quantity: {item.quantity}</span>
                                <span className="cart-item-meta">Size: {item.size}</span>
                                <span className="cart-item-price">{item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment Options — unchanged */}
                <div className="payment-options-box">
                    <h3>Payment Options</h3>
                    <div className="payment-icons">
                        {/* {['VISA', 'MC', 'AMEX', 'PYPL', 'GPay'].map((label) => (
                            <div className="payment-icon" key={label}>{label}</div>
                        ))} */}
                        {['COD'].map((label) => (
                            <div className="payment-icon" key={label}>{label}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShippingInfoContent