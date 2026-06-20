"use client"

import React, { useState } from 'react'
import './OrderConfirmationContent.css'
import { useRouter } from 'next/navigation'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useCheckoutStore } from "@/store/useCheckoutStore"
import { useCartStore } from "@/store/useCartStore"

/* ─── Invoice generator (PDF) ───
   Builds a real vector PDF with jsPDF + jspdf-autotable.
   Requires: npm install jspdf jspdf-autotable
*/
function generateInvoicePDF(order) {
    const doc = new jsPDF({ unit: "pt", format: "a4" })
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 40
    const brand = [47, 58, 47] // matches rgba(47,58,47,1) from the old HTML template

    /* Header */
    doc.setFont("helvetica", "bold")
    doc.setFontSize(18)
    doc.setTextColor(...brand)
    doc.text("iPure Herbs", margin, 50)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(136)
    doc.text("Wellness & Herbal Products", margin, 64)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(22)
    doc.setTextColor(26)
    doc.text("INVOICE", pageWidth - margin, 50, { align: "right" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(136)
    doc.text(`#${order.id}`, pageWidth - margin, 64, { align: "right" })
    const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    doc.text(`Date: ${dateStr}`, pageWidth - margin, 76, { align: "right" })

    doc.setDrawColor(230)
    doc.line(margin, 90, pageWidth - margin, 90)

    /* Order details block */
    let y = 115
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(136)
    doc.text("ORDER DETAILS", margin, y)
    y += 16

    const details = [
        ["Order ID:", order.id],
        ["Payment:", order.paymentMethod],
        ["Shipping:", order.shippingMethod === "express" ? "Express delivery" : "Standard delivery"],
        ["Ship To:", `${order.shippingName}, ${order.shippingAddress}`],
    ]

    details.forEach(([label, value]) => {
        doc.setFont("helvetica", "bold")
        doc.setFontSize(10)
        doc.setTextColor(26)
        doc.text(label, margin, y)
        doc.setFont("helvetica", "normal")
        const labelWidth = doc.getTextWidth(label) + 4
        const wrapped = doc.splitTextToSize(value, pageWidth - margin * 2 - labelWidth)
        doc.text(wrapped, margin + labelWidth, y)
        y += 14 * wrapped.length
    })

    y += 10

    /* Line items table */
    const rows = order.items.map((item) => [
        item.desc ? `${item.name}\n${item.desc}` : item.name,
        String(item.quantity),
        item.size,
        `$${item.unitPrice.toFixed(2)}`,
    ])

    autoTable(doc, {
        startY: y,
        head: [["Product", "Qty", "Size", "Price"]],
        body: rows,
        margin: { left: margin, right: margin },
        styles: { font: "helvetica", fontSize: 9, cellPadding: 8, textColor: [26, 26, 26] },
        headStyles: { fillColor: brand, textColor: 255, fontStyle: "bold" },
        columnStyles: {
            1: { halign: "center" },
            2: { halign: "center" },
            3: { halign: "right" },
        },
    })

    let finalY = doc.lastAutoTable.finalY + 24

    /* Totals */
    const totalsX = pageWidth - margin - 220

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(26)
    doc.text(`Subtotal (${order.items.length} items)`, totalsX, finalY)
    doc.text(`$${order.subtotal.toFixed(2)}`, pageWidth - margin, finalY, { align: "right" })
    finalY += 16

    doc.text("Delivery", totalsX, finalY)
    doc.text(order.deliveryFee > 0 ? `$${order.deliveryFee.toFixed(2)}` : "Free", pageWidth - margin, finalY, { align: "right" })
    finalY += 12

    doc.setDrawColor(26)
    doc.line(totalsX, finalY, pageWidth - margin, finalY)
    finalY += 18

    doc.setFont("helvetica", "bold")
    doc.setFontSize(13)
    doc.text("Total", totalsX, finalY)
    doc.text(`$${order.total.toFixed(2)}`, pageWidth - margin, finalY, { align: "right" })
    finalY += 14

    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(136)
    doc.text("Including taxes", pageWidth - margin, finalY, { align: "right" })

    /* Footer */
    doc.setFontSize(8)
    doc.setTextColor(180)
    doc.text(
        "Thank you for your purchase! For any queries contact support@ipureherbs.com",
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 30,
        { align: "center" }
    )

    doc.save(`Invoice-${order.id}.pdf`)
}

/* ─── SVG Icons — unchanged ─── */
const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
)
const TruckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
)
const CardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
)
const SupportIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
)

/* ─── Component ─── */
const OrderConfirmationContent = () => {
    const [tracked, setTracked] = useState(false)
    const router = useRouter()

    const { shippingInfo, checkoutItem, clearCheckoutItem } = useCheckoutStore()
    const { cart, clearCart } = useCartStore()

    // ─── Build display items from store ──────────────────────────────────────
    const displayItems = checkoutItem
        ? [{
            id: checkoutItem.productId,
            name: checkoutItem.productName,
            desc: "",
            quantity: checkoutItem.qty,
            size: checkoutItem.variantName ?? "N/A",
            unitPrice: checkoutItem.price,
            image: checkoutItem.productImage,
        }]
        : cart.map((item) => ({
            id: item.id,
            name: item.name,
            desc: item.description ?? "",
            quantity: item.quantity,
            size: item.size ?? "N/A",
            unitPrice: item.price,
            image: item.image,
        }))

    // ─── Summary ─────────────────────────────────────────────────────────────
    const subtotal = displayItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const deliveryFee = (() => {
        if (subtotal >= 100) return 0
        if (shippingInfo.shippingMethod === 'express') return 40
        return 30
    })()
    const total = subtotal + deliveryFee

    // ─── Order object for invoice ─────────────────────────────────────────────
    const order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,   // simple unique ID
        paymentMethod: "Cash on Delivery",
        shippingMethod: shippingInfo.shippingMethod,
        shippingName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        shippingAddress: `${shippingInfo.address1}, ${shippingInfo.city}, ${shippingInfo.country}`,
        deliveryDate: shippingInfo.shippingMethod === 'express'
            ? '3 to 4 working days'
            : '5 to 7 working days',
        items: displayItems,
        subtotal,
        deliveryFee,
        total,
    }

    const handleContinueShopping = () => {
        clearCheckoutItem()   // clear buy-now item
        clearCart()           // clear cart after successful order
        router.push('/')
    }

    return (
        <div className="oc-page">
            {/* Hero */}
            <div className="oc-hero">
                <div className="oc-check-circle"><CheckIcon /></div>
                <h1>Order Confirmed.</h1>
                <p>Thank you for the purchase! We've received your order.</p>
            </div>

            {/* Meta bar */}
            <div className="oc-meta-bar">
                <div className="oc-meta-item">
                    <div className="meta-label">Order Id</div>
                    <div className="meta-value">{order.id}</div>
                </div>
                <div className="oc-meta-item">
                    <div className="meta-label">Payment method</div>
                    <div className="meta-value">{order.paymentMethod}</div>
                </div>
                <div className="oc-meta-item">
                    <div className="meta-label">Ship To</div>
                    <div className="meta-value">{order.shippingName}</div>
                </div>
                <div className="oc-meta-item">
                    <div className="meta-label">Estimated Delivery</div>
                    <div className="meta-value">{order.deliveryDate}</div>
                </div>
                <button className="oc-download-btn" onClick={() => generateInvoicePDF(order)}>
                    <span className="oc-download-btn-inner">Download Invoice</span>
                </button>
            </div>

            {/* Order Summary */}
            <div className="oc-card">
                <div className="manrope font-600 size-18 color-deep-forest-green oc-card-title">
                    Order Summary <span>▾</span>
                </div>

                {displayItems.map((item) => (
                    <div className="oc-item" key={item.id}>
                        <div className="oc-item-img">
                            <img
                                src={item.image}
                                alt={item.name}
                                onError={e => { e.target.style.display = 'none' }}
                            />
                        </div>
                        <div className="oc-item-info">
                            <span className="manrope oc-item-name">{item.name}</span>
                            <div className='display-flex flex-direction-column margin-top-auto'>
                                <span className="manrope oc-item-meta">Quantity : {item.quantity}</span>
                                <span className="manrope oc-item-meta">Size : {item.size}</span>
                            </div>
                        </div>
                        <span className="manrope oc-item-price">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                    </div>
                ))}

                {/* Totals */}
                <div className="oc-totals">
                    <div className="oc-totals-row">
                        <span>Subtotal ({displayItems.length} {displayItems.length === 1 ? 'item' : 'items'})</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="oc-totals-row">
                        <span>{shippingInfo.shippingMethod === 'express' ? 'Express delivery' : 'Standard delivery'}</span>
                        <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'Free'}</span>
                    </div>
                    <div className="oc-totals-divider" />
                    <div className="oc-totals-row total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="oc-totals-tax">Including taxes</div>
                </div>
            </div>

            {/* Feature badges — unchanged */}
            <div className="oc-features">
                <div className="oc-feature">
                    <div className="oc-feature-icon"><TruckIcon /></div>
                    <div className="oc-feature-text">
                        <div className="ft">Free Shipping</div>
                        <div className="fs">Free shipping on orders above $100</div>
                    </div>
                </div>
                <div className="oc-feature">
                    <div className="oc-feature-icon"><CardIcon /></div>
                    <div className="oc-feature-text">
                        <div className="ft">Flexible Payment</div>
                        <div className="fs">Multiple secure payment options</div>
                    </div>
                </div>
                <div className="oc-feature">
                    <div className="oc-feature-icon"><SupportIcon /></div>
                    <div className="oc-feature-text">
                        <div className="ft">24 × 7 Support</div>
                        <div className="fs">We're available online anytime</div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="oc-cta">
                <button className="oc-btn-primary" onClick={() => setTracked(true)}>
                    {tracked ? '📦 Tracking link sent!' : 'Track Order'}
                </button>
                <button className="oc-btn-secondary" onClick={handleContinueShopping}>
                    Continue Shopping
                </button>
            </div>
        </div>
    )
}

export default OrderConfirmationContent