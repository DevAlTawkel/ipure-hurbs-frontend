"use client"

import React, { useState } from 'react'
import './OrderConfirmationContent.css'
import { useRouter } from 'next/navigation'

/* ─── Dummy order data ─── */
const ORDER = {
    id: 'HKP-10701',
    paymentMethod: 'Paypal',
    transactionId: 'Xhs-763-dfnsS-49ns',
    deliveryDate: '12 Jun 2025',
    items: [
        { id: 1, name: 'Happy Knights Prash', desc: "Plant-based herbal formula for energy and men's wellness", qty: 1, size: '250 gm', price: 66.89, image: '/assets/products/product-01.png' },
        { id: 2, name: 'Happy Knights Prash', desc: "Plant-based herbal formula for energy and men's wellness", qty: 1, size: '250 gm', price: 66.89, image: '/assets/products/product-02.png' },
        { id: 3, name: 'Happy Knights Prash', desc: "Plant-based herbal formula for energy and men's wellness", qty: 1, size: '250 gm', price: 66.89, image: '/assets/products/product-03.png' },
    ],
    subtotal: 200.67,
    delivery: 20.00,
    discount: -10.00,
    total: 225.67,
}

/* ─── Invoice generator ─── */
function generateInvoiceHTML(order) {
    const rows = order.items.map(item => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;">${item.name}<br/><span style="font-size:11px;color:#888;">${item.desc}</span></td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center;">${item.qty}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:center;">${item.size}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;text-align:right;">$${item.price.toFixed(2)}</td>
    </tr>
  `).join('')

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Invoice ${order.id}</title>
<style>
  body{font-family:'Segoe UI',sans-serif;color:#1a1a1a;margin:0;padding:40px;}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;}
  .brand{font-size:22px;font-weight:800;color:rgba(47,58,47,1);}
  .brand-sub{font-size:12px;color:#888;margin-top:2px;}
  .inv-title{font-size:28px;font-weight:700;color:#1a1a1a;}
  .inv-meta{font-size:12px;color:#888;margin-top:4px;}
  .section-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#888;margin-bottom:12px;}
  .info-grid{display:flex;gap:40px;margin-bottom:36px;}
  .info-col{flex:1;}
  .info-col p{font-size:13px;margin:3px 0;}
  table{width:100%;border-collapse:collapse;margin-bottom:24px;}
  th{background:rgba(47,58,47,1);color:#fff;padding:10px 8px;font-size:12px;text-align:left;}
  th:last-child,td:last-child{text-align:right;}
  th:nth-child(2),td:nth-child(2),th:nth-child(3),td:nth-child(3){text-align:center;}
  .totals{margin-left:auto;width:280px;}
  .totals-row{display:flex;justify-content:space-between;font-size:13px;padding:4px 0;}
  .totals-row.total{font-size:16px;font-weight:700;border-top:2px solid #1a1a1a;padding-top:10px;margin-top:6px;}
  .footer{margin-top:48px;text-align:center;font-size:11px;color:#bbb;}
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">Happy Knights</div>
      <div class="brand-sub">Wellness & Herbal Products</div>
    </div>
    <div style="text-align:right">
      <div class="inv-title">INVOICE</div>
      <div class="inv-meta">#${order.id}</div>
      <div class="inv-meta">Date: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
    </div>
  </div>
  <div class="info-grid">
    <div class="info-col">
      <div class="section-title">Order Details</div>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Payment:</strong> ${order.paymentMethod}</p>
      <p><strong>Transaction:</strong> ${order.transactionId}</p>
      <p><strong>Est. Delivery:</strong> ${order.deliveryDate}</p>
    </div>
  </div>
  <table>
    <thead>
      <tr><th>Product</th><th>Qty</th><th>Size</th><th>Price</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="totals">
    <div class="totals-row"><span>Subtotal (${order.items.length} items)</span><span>$${order.subtotal.toFixed(2)}</span></div>
    <div class="totals-row"><span>Delivery</span><span>$${order.delivery.toFixed(2)}</span></div>
    <div class="totals-row" style="color:rgb(3,153,3)"><span>Shipping Discount</span><span>-$${Math.abs(order.discount).toFixed(2)}</span></div>
    <div class="totals-row total"><span>Total</span><span>$${order.total.toFixed(2)}</span></div>
    <div style="font-size:11px;color:#888;margin-top:4px;text-align:right;">Including taxes</div>
  </div>
  <div class="footer">Thank you for your purchase! For any queries contact support@happyknights.com</div>
</body>
</html>`
}

function downloadInvoice(order) {
    const html = generateInvoiceHTML(order)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Invoice-${order.id}.html`
    a.click()
    URL.revokeObjectURL(url)
}

/* ─── SVG Icons ─── */
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

const DownloadIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
)

/* ─── Component ─── */
const OrderConfirmationContent = () => {
    const [tracked, setTracked] = useState(false)

    const router = useRouter();

    const handleContinueShopping = () => {
        router.push('/products');
    }

    return (
        <div className="oc-page">

            {/* Hero */}
            <div className="oc-hero">
                <div className="oc-check-circle">
                    <CheckIcon />
                </div>
                <h1>Order Confirmed.</h1>
                <p>Thank you for the purchase! We've received your order.</p>
            </div>

            {/* Meta bar */}
            <div className="oc-meta-bar">
                <div className="oc-meta-item">
                    <div className="meta-label">Order Id</div>
                    <div className="meta-value">{ORDER.id}</div>
                </div>
                <div className="oc-meta-item">
                    <div className="meta-label">Payment method</div>
                    <div className="meta-value">{ORDER.paymentMethod}</div>
                </div>
                <div className="oc-meta-item">
                    <div className="meta-label">Transaction Id</div>
                    <div className="meta-value">{ORDER.transactionId}</div>
                </div>
                <div className="oc-meta-item">
                    <div className="meta-label">Estimated Delivery Date</div>
                    <div className="meta-value">{ORDER.deliveryDate}</div>
                </div>
                <button className="oc-download-btn" onClick={() => downloadInvoice(ORDER)}>
                    <span className="oc-download-btn-inner">
                        Download Invoice
                    </span>
                </button>
            </div>

            {/* Order Summary */}
            <div className="oc-card">
                <div className="manrope font-600 size-18 color-deep-forest-green oc-card-title">
                    Order Summary <span>▾</span>
                </div>

                {ORDER.items.map(item => (
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
                            {/* <span className="manrope oc-item-desc">{item.desc}</span> */}
                            <div className='display-flex flex-direction-column margin-top-auto'>
                                <span className="manrope oc-item-meta">Quantity : {item.qty}</span>
                                <span className="manrope oc-item-meta">Size : {item.size}</span>
                            </div>
                        </div>
                        <span className="manrope oc-item-price">${item.price.toFixed(2)}</span>
                    </div>
                ))}

                {/* Totals */}
                <div className="oc-totals">
                    <div className="oc-totals-row">
                        <span>Subtotal ({ORDER.items.length} items)</span>
                        <span>${ORDER.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="oc-totals-row">
                        <span>Express delivery</span>
                        <span>${ORDER.delivery.toFixed(2)}</span>
                    </div>
                    <div className="oc-totals-row discount">
                        <span>Shipping discount</span>
                        <span>-${Math.abs(ORDER.discount).toFixed(2)}</span>
                    </div>
                    <div className="oc-totals-divider" />
                    <div className="oc-totals-row total">
                        <span>Total</span>
                        <span>${ORDER.total.toFixed(2)}</span>
                    </div>
                    <div className="oc-totals-tax">Including taxes</div>
                </div>
            </div>

            {/* Feature badges */}
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
                <button
                    className="oc-btn-primary"
                    onClick={() => setTracked(true)}
                >
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