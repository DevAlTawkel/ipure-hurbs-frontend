"use client";

import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import './ProductCardWishlist.css';
import Link from "next/link";

const BADGE_STYLES = {
  "Best Seller": "background-warm-khali size-12",
  Deal: "background-red size-12",
};

export default function ProductCardWishlist({ product }) {

  const { addToCart, updateQuantity, cart } = useCartStore();

  const { toggleWishlist, wishlistIds } = useWishlistStore();
  const isWishlisted = wishlistIds.includes(product.id);

  // Get current quantity of this product in cart
  const cartItem = cart.find((i) => i.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (quantity === 0) {
      addToCart(product);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  return (
    <Link href={`/products/${product.slug}`} key={product.id}>
      <div className="position-relative display-flex flex-direction-column overflow-hidden transition cursor-pointer ProductCardWishlist-container">

        {product.discount > 0 && (
          <span className={`position-absolute display-flex align-items-center justify-content-center text-align-center manrope font-400 color-white ${BADGE_STYLES[product.badge] ?? "background-eoc-200 size-16"} ProductCardWishlist-badge`}>
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`position-absolute border-none cursor-pointer transition border-radius-100 ProductCardWishlist-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.36396 4.94978L11.3138 -5.94215e-09L12.728 1.41421L7.77816 6.36398L12.728 11.3137L11.3138 12.7279L6.36396 7.77818L1.41422 12.7279L0 11.3137L4.94976 6.36398L0 1.41421L1.41422 -7.4277e-10L6.36396 4.94978Z" fill="#C8A96B" />
          </svg>
        </button>

        <div className="position-relative display-flex align-items-center justify-content-center ProductCardWishlist-image-wrapper">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="ProductCardWishlist-image"
            onError={(e) => {
              e.target.src = "https://placehold.co/160x160/f3f4f6/9ca3af?text=Product";
            }}
          />
          {!product.inStock && (
            <div className="position-absolute display-flex align-items-center justify-content-center ProductCardWishlist-out-of-stock">
              <span>Out of stock</span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="display-flex flex-direction-column flex-1 ProductCardWishlist-info">

          <div className="display-flex align-items-center justify-content-space-between ProductCardWishlist-price-row">
            <div>
              <span className="manrope size-24 font-600 ProductCardWishlist-price">$ {product.price.toFixed(2)}</span>
            </div>
            <div className="display-flex align-items-center">
              <div className="display-flex align-items-center ProductCardWishlist-stars">
                <span className="manrope size-18 ProductCardWishlist-star-count">{product.rating}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.27659 0.413597C6.45722 -0.138859 7.23926 -0.137424 7.41786 0.415691L8.61409 4.12043C8.69396 4.36779 8.92403 4.53559 9.18396 4.53606L13.077 4.54321C13.6583 4.54427 13.8986 5.28848 13.4277 5.62926L10.274 7.91177C10.0634 8.06417 9.97489 8.33483 10.0548 8.58219L11.251 12.2869C11.4296 12.84 10.7961 13.2986 10.3265 12.9561L7.1811 10.662C6.97109 10.5088 6.68633 10.5083 6.47576 10.6607L3.322 12.9432C2.85115 13.284 2.2193 12.8231 2.39993 12.2707L3.60974 8.57037C3.69052 8.3233 3.60302 8.05232 3.39301 7.89915L0.247652 5.60508C-0.221949 5.26258 0.0210806 4.51925 0.602314 4.52032L4.49538 4.52746C4.75532 4.52794 4.986 4.36099 5.06678 4.11392L6.27659 0.413597Z" fill="#FFD60C" />
                </svg>
              </div>
            </div>
          </div>

          <p className="manrope size-12 color-deep-forest-green font-500 ProductCardWishlist-brand">{product.brand}</p>
          <p className="manrope size-16 font-700 color-deep-forest-green ProductCardWishlist-name">{product.name}</p>
          <p className="manrope size-14 font-400 color-deep-forest-green overflow-hidden ProductCardWishlist-description">{product.description}</p>

          {/* Action buttons */}
          <div className="display-flex ProductCardWishlist-actions">

            {/* Cart button — toggles between "Add to cart" and qty controls */}
            <button
              onClick={handleIncrease}
              disabled={!product.inStock}
              className="width-100 size-16 font-400 background-transparent color-dfg-200 transition cursor-pointer ProductCardWishlist-btn-cart"
            >
              Add to cart
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
}