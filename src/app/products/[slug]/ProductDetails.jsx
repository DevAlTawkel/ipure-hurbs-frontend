"use client";

import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import ProductCard from "@/components/ProductCard";
import "./ProductDetails.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TABS = ["Description", "Additional information", "Reviews"];

export default function ProductDetails({ slug }) {

  const router = useRouter();
  const { fetchBySlug, products } = useProductStore();
  const { addToCart, updateQuantity, cart } = useCartStore();
  const { toggleWishlist, wishlistIds } = useWishlistStore();
  const { setCheckoutItem } = useCheckoutStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("Description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [deliveryType, setDeliveryType] = useState("standard");
  const [selectedQty, setSelectedQty] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [visibleReviews, setVisibleReviews] = useState(3);
  const [zoom, setZoom] = useState({ active: false, x: 0, y: 0 });

  useEffect(() => {
    if (!slug) return;
    console.log('test')
    setLoading(true);
    setError(null);

    fetchBySlug(slug)
      .then((fetched) => {
        if (fetched) {
          setProduct(fetched);
        } else {
          setError("Product not found");
        }
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [slug]);


  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (product?.size?.length) {
      const cheapest = [...product.size].sort((a, b) => a.effective_price - b.effective_price)[0];
      setSelectedSize(cheapest);
    }
  }, [product]);

  const displayPrice = selectedSize?.effective_price ?? product?.price ?? 0;

  const perKgPrice = useMemo(() => {
    if (!product?.size?.length) return null;

    // Parse weight in grams from variant name (e.g. "500g" → 500, "1kg" → 1000)
    const parseGrams = (name) => {
      const lower = name.toLowerCase();
      const kgMatch = lower.match(/([\d.]+)\s*kg/);
      if (kgMatch) return parseFloat(kgMatch[1]) * 1000;
      const gMatch = lower.match(/([\d.]+)\s*g/);
      if (gMatch) return parseFloat(gMatch[1]);
      return 0;
    };

    // Find the largest variant
    const largest = [...product.size].sort((a, b) => parseGrams(b.name) - parseGrams(a.name))[0];
    const grams = parseGrams(largest.name);
    if (!grams) return null;

    const pricePerKg = (largest.effective_price / grams) * 1000;
    return pricePerKg.toFixed(2);
  }, [product?.size]);
  // ─── Find product by slug ─────────────────────────────────────────────────
  // When API is ready: fetch from /api/products/{slug} instead
  // const product = DUMMY_PRODUCTS.find((p) => p.slug === slug) ?? products[0];

  const cartItem = cart.find((i) => i.id === product?.id);
  const isWishlisted = mounted && wishlistIds.includes(product?.id);
  const isInCart = !!cartItem;

  useEffect(() => {
    if (cartItem) setSelectedQty(cartItem.quantity);
  }, [cartItem]);

  const handleIncrease = () => {
    const newQty = selectedQty + 1;

    setSelectedQty(newQty);

    // If item already exists in cart, update cart too
    if (isInCart) {
      updateQuantity(product.id, newQty);
    }
  };

  const handleDecrease = () => {
    if (selectedQty <= 1) return;

    const newQty = selectedQty - 1;

    setSelectedQty(newQty);

    // If item already exists in cart, update cart too
    if (isInCart) {
      updateQuantity(product.id, newQty);
    }
  };

  const handleCartAction = () => {
    if (isInCart) {
      toast(`Item already added to cart`);
      return;
    }

    addToCart(product);

    // Adjust quantity if selectedQty > 1
    if (selectedQty > 1) {
      updateQuantity(product.id, selectedQty);
    }
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;

    setCheckoutItem({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0]?.url ?? "",
      productSlug: product.slug,
      variantId: selectedSize?.variant_id ?? null,
      variantName: selectedSize?.name ?? null,
      price: displayPrice,
      qty: selectedQty,
      shippingMethod: deliveryType,
    });

    router.push("/shipping-info");
  };

  const recommended = products.filter((p) => p.id !== product?.id).slice(0, 4);
  const moreToExplore = products.filter((p) => p.id !== product?.id).slice(4, 9);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const Star = ({ fill }) => (
    <div
      style={{
        position: "relative",
        width: 16,
        height: 16,
        flexShrink: 0,
      }}
    >
      {/* Empty star */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 14 14"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M6.27659 0.413597C6.45722 -0.138859 7.23926 -0.137424 7.41786 0.415691L8.61409 4.12043C8.69396 4.36779 8.92403 4.53559 9.18396 4.53606L13.077 4.54321C13.6583 4.54427 13.8986 5.28848 13.4277 5.62926L10.274 7.91177C10.0634 8.06417 9.97489 8.33483 10.0548 8.58219L11.251 12.2869C11.4296 12.84 10.7961 13.2986 10.3265 12.9561L7.1811 10.662C6.97109 10.5088 6.68633 10.5083 6.47576 10.6607L3.322 12.9432C2.85115 13.284 2.2193 12.8231 2.39993 12.2707L3.60974 8.57037C3.69052 8.3233 3.60302 8.05232 3.39301 7.89915L0.247652 5.60508C-0.221949 5.26258 0.0210806 4.51925 0.602314 4.52032L4.49538 4.52746C4.75532 4.52794 4.986 4.36099 5.06678 4.11392L6.27659 0.413597Z"
          fill="#E5E7EB"
        />
      </svg>

      {/* Filled part */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${fill}%`,
          overflow: "hidden",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 14 14">
          <path
            d="M6.27659 0.413597C6.45722 -0.138859 7.23926 -0.137424 7.41786 0.415691L8.61409 4.12043C8.69396 4.36779 8.92403 4.53559 9.18396 4.53606L13.077 4.54321C13.6583 4.54427 13.8986 5.28848 13.4277 5.62926L10.274 7.91177C10.0634 8.06417 9.97489 8.33483 10.0548 8.58219L11.251 12.2869C11.4296 12.84 10.7961 13.2986 10.3265 12.9561L7.1811 10.662C6.97109 10.5088 6.68633 10.5083 6.47576 10.6607L3.322 12.9432C2.85115 13.284 2.2193 12.8231 2.39993 12.2707L3.60974 8.57037C3.69052 8.3233 3.60302 8.05232 3.39301 7.89915L0.247652 5.60508C-0.221949 5.26258 0.0210806 4.51925 0.602314 4.52032L4.49538 4.52746C4.75532 4.52794 4.986 4.36099 5.06678 4.11392L6.27659 0.413597Z"
            fill="#FFD60C"
          />
        </svg>
      </div>
    </div>
  );

  // ─── Loading / error states ───────────────────────────────────────────────
  if (loading) return (
    <div className="ProductDetails-wrapper">
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <p className="manrope font-400 size-16 color-deep-forest-green">Loading product...</p>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="ProductDetails-wrapper">
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <p className="manrope font-400 size-16 color-deep-forest-green">{error ?? "Product not found"}</p>
      </div>
    </div>
  );

  if (!product) return null;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ active: true, x, y });
  };

  const handleMouseLeave = () => {
    setZoom({ active: false, x: 0, y: 0 });
  };


  return (
    <div className="ProductDetails-wrapper">

      <div className="display-flex align-items-flex-start justify-content-space-between ProductDetails-top">
        <div className="ProductDetails-gallery">
          <div className="display-flex align-items-center justify-content-space-between">
            <button
              onClick={() => toggleWishlist(product)}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`background-white-400 border-none cursor-pointer transition border-radius-100 background-eoc-200 ProductDetails-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(235, 229, 221, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>
            </button>


            <button
              onClick={handleShare}
              className="background-white-400 border-none cursor-pointer transition border-radius-100 background-eoc-200 ProductDetails-share-btn"
              aria-label="Share product"
            >
              <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11.5H8C4.54202 11.5 1.53953 13.4502 0.0323901 16.3107C0.0109301 16.0433 0 15.7729 0 15.5C0 9.9772 4.47715 5.5 10 5.5V0L20.5 8.5L10 17V11.5ZM8 9.5H12V12.8078L17.3214 8.5L12 4.19224V7.5H10C7.5795 7.5 5.41011 8.5749 3.94312 10.2735C5.20873 9.7714 6.58041 9.5 8 9.5Z" fill="rgba(235, 229, 221, 1)" />
              </svg>
            </button>

          </div>
          <div className="display-flex align-items-center gap-10 ProductDetails-gallery-images-container">
            <div className="display-flex flex-direction-column ProductDetails-thumbs">
              {product?.images.map((img, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setSelectedImage(i)}
                  className={`overflow-hidden cursor-pointer background-transparent ProductDetails-thumb ${selectedImage === i ? "active" : ""}`}
                >
                  <img
                    src={img?.url} alt={`${product.name} view ${i + 1}`}
                    className="object-fit-contain"
                    onError={(e) => { e.target.src = "https://placehold.co/80x80/f3f4f6/9ca3af?text=Img"; }}
                  />
                </button>
              ))}
            </div>

            <div
              className="width-100 display-flex align-items-center justify-content-center flex-direction-column overflow-hidden ProductDetails-main-image"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product.images[selectedImage]?.url}
                alt={product.name}
                className="object-fit-contain ProductDetails-main-img"
                style={{
                  transformOrigin: `${zoom.x}% ${zoom.y}%`,
                  transform: zoom.active ? 'scale(2.5)' : 'scale(1)',
                  transition: zoom.active ? 'transform 0.1s ease-out' : 'transform 0.3s ease',
                  cursor: zoom.active ? 'crosshair' : 'zoom-in',
                }}
                onError={(e) => { e.target.src = "https://placehold.co/500x500/f3f4f6/9ca3af?text=Product"; }}
              />

              {zoom.active && (
                <div className="ProductDetails-zoom-navigator">
                  <img
                    src={product.images[selectedImage]?.url}
                    alt="navigator"
                    className="ProductDetails-zoom-nav-img"
                  />
                  <div
                    className="ProductDetails-zoom-nav-box"
                    style={{
                      left: `${zoom.x}%`,
                      top: `${zoom.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="display-flex flex-direction-column ProductDetails-info">
          <h1 className="manrope font-600 size-28 color-deep-forest-green ProductDetails-name">{product.name}</h1>
          <div className='display-flex align-items-center ProductDetails-by-container'>
            <p className='manrope font-400 size-20 ProductDetails-by'>By:</p>
            <a href="#" className='ProductDetails-by-a'>
              <p className='manrope font-400 size-18 '>{product.brand}</p>
              <div className='display-flex align-items-center justify-content-center ProductDetails-by-arrow'>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.94972 6.36412L-4.94538e-07 1.41432L1.41421 0.000118194L7.77822 6.36412L1.41421 12.728L-6.18171e-08 11.3138L4.94972 6.36412Z" fill="#0048FF" />
                </svg>
              </div>
            </a>
          </div>
          <div className="display-flex align-items-center gap-10 ProductDetails-rating-row">
            <h6 className="manrope font-600 size-20 color-deep-forest-green">{product.rating}</h6>
            <div className="display-flex align-items-center ProductDetails-stars">
              {[...Array(5)].map((_, index) => {
                const fill = Math.max(
                  0,
                  Math.min(100, (product.rating - index) * 100)
                );

                return (
                  <Star
                    key={index}
                    fill={fill}
                  />
                );
              })}
            </div>
            <span className="manrope font-400 size-14 color-dfg-800 ProductDetails-rating-text">
              ({product.reviewCount} Reviews)
            </span>
          </div>

          <div className="display-flex ProductDetails-price-row">
            <span className="manrope font-600 size-24 ProductDetails-price">${displayPrice.toFixed(2)}</span>
            {selectedSize && selectedSize.price > selectedSize.effective_price && (
              <span className="manrope font-600 size-24 color-dfg-800 ProductDetails-original-price">
                ${parseFloat(selectedSize.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="manrope font-400 size-14 color-black-black ProductDetails-short-desc">{product.description}</p>
          <p className='manrope font-600 size-20 ProductDetails-choose'>Choose <span className='manrope font-600 size-16 color-white ProductDetails-choose-express'>Express delivery</span> <span className='manrope font-500 size-14 color-earthy-olive-color'>Get your Order earliest.</span></p>
          <p className="manrope font-600 size-20 color-deep-forest-green ProductDetails-size">Size</p>
          <div className="display-flex ProductDetails-sizes-container">
            {[...(product.size || [])].sort((a, b) => a.effective_price - b.effective_price).map((item, i) => (
              <div
                key={item.variant_id}
                onClick={() => setSelectedSize(item)}
                className={`cursor-pointer manrope font-400 size-18 color-deep-forest-green transition text-align-center ProductDetails-size-box ${selectedSize?.variant_id === item.variant_id ? 'active' : ''}`}
              >
                {item.name}
              </div>
            ))}
          </div>

          <div className="display-flex flex-direction-column">
            <p className="manrope font-400 size-14 color-black-black">SKU: {product.sku}</p>
            <p className="manrope font-400 size-14 color-black-black">Categories: {product.category}</p>
            <p className="manrope font-400 size-14 color-black-black">Tags: {product.tags.map((item) => item)}</p>

            <div className="display-grid gap-12 ProductDetails-delivery-details-container">
              <div className="display-flex align-items-center gap-8">
                <div className="border-radius-100 background-white-400 display-flex align-items-center justify-content-center ProductDetails-delivery-details-svg-container">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 20C4.47716 20 0 15.5229 0 9.99995C0 4.47715 4.47716 0 10 0C15.5228 0 20 4.47715 20 9.99995C20 15.5229 15.5228 20 10 20ZM10 18C14.4183 18 18 14.4183 18 9.99995C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 9.99995C2 14.4183 5.58172 18 10 18ZM6.5 12H12C12.2761 12 12.5 11.7762 12.5 11.5C12.5 11.2239 12.2761 11 12 11H8.00002C6.61929 11 5.5 9.88075 5.5 8.49995C5.5 7.11928 6.61929 6 8.00002 6H9.00002V4H11V6H13.5V7.99995H8.00002C7.72386 7.99995 7.5 8.22385 7.5 8.49995C7.5 8.77615 7.72386 8.99995 8.00002 8.99995H12C13.3807 8.99995 14.5 10.1193 14.5 11.5C14.5 12.8808 13.3807 14 12 14H11V16H9.00002V14H6.5V12Z" fill="#D3BA89" />
                  </svg>
                </div>
                <p className="manrope font-500 size-12 color-earthy-olive-color">Cash on delivery</p>
              </div>
              <div className="display-flex align-items-center gap-8">
                <div className="border-radius-100 background-white-400 display-flex align-items-center justify-content-center ProductDetails-delivery-details-svg-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z" fill="#D3BA89" />
                    <path d="M5 11.9388V9H6.71792V9.36327H5.36404V10.2878H6.4725V10.651H5.36404V11.9388H5Z" fill="#C8A96B" />
                    <path d="M7.10145 11.9388V9.73469H7.42663V10.2673L7.37345 10.198C7.39936 10.1299 7.43276 10.0673 7.47367 10.0102C7.51593 9.95306 7.56297 9.90612 7.61478 9.86939C7.67205 9.82313 7.73681 9.78775 7.80907 9.76327C7.88133 9.73878 7.95496 9.72449 8.02995 9.72041C8.10493 9.71497 8.17515 9.71973 8.2406 9.73469V10.0755C8.16424 10.0551 8.08039 10.0497 7.98904 10.0592C7.89769 10.0687 7.81316 10.102 7.73544 10.1592C7.66455 10.2095 7.60933 10.2707 7.56979 10.3429C7.53161 10.415 7.50502 10.4932 7.49003 10.5776C7.47503 10.6605 7.46753 10.7456 7.46753 10.8327V11.9388H7.10145Z" fill="#C8A96B" />
                    <path d="M9.56086 12C9.34408 12 9.15456 11.9524 8.99231 11.8571C8.83143 11.7605 8.70599 11.6265 8.61601 11.4551C8.52602 11.2823 8.48103 11.081 8.48103 10.851C8.48103 10.6102 8.52534 10.402 8.61396 10.2265C8.70258 10.0497 8.82598 9.91361 8.98413 9.81837C9.14365 9.72177 9.33044 9.67347 9.5445 9.67347C9.76674 9.67347 9.95558 9.72449 10.111 9.82653C10.2678 9.92857 10.3851 10.0741 10.4628 10.2633C10.5419 10.4524 10.5759 10.6776 10.565 10.9388H10.1969V10.8082C10.1928 10.5374 10.1376 10.3354 10.0312 10.202C9.9249 10.0673 9.76674 10 9.55677 10C9.33181 10 9.1607 10.0721 9.04344 10.2163C8.92619 10.3605 8.86756 10.5673 8.86756 10.8367C8.86756 11.0966 8.92619 11.298 9.04344 11.4408C9.1607 11.5837 9.32772 11.6551 9.5445 11.6551C9.69039 11.6551 9.81719 11.6218 9.9249 11.5551C10.0326 11.4884 10.1171 11.3925 10.1785 11.2673L10.5282 11.3878C10.4423 11.5823 10.3128 11.7333 10.1396 11.8408C9.96785 11.9469 9.77492 12 9.56086 12ZM8.74485 10.9388V10.6469H10.3769V10.9388H8.74485Z" fill="#C8A96B" />
                    <path d="M11.9939 12C11.7771 12 11.5875 11.9524 11.4253 11.8571C11.2644 11.7605 11.139 11.6265 11.049 11.4551C10.959 11.2823 10.914 11.081 10.914 10.851C10.914 10.6102 10.9583 10.402 11.0469 10.2265C11.1356 10.0497 11.259 9.91361 11.4171 9.81837C11.5766 9.72177 11.7634 9.67347 11.9775 9.67347C12.1997 9.67347 12.3886 9.72449 12.544 9.82653C12.7008 9.92857 12.818 10.0741 12.8958 10.2633C12.9748 10.4524 13.0089 10.6776 12.998 10.9388H12.6299V10.8082C12.6258 10.5374 12.5706 10.3354 12.4642 10.202C12.3579 10.0673 12.1997 10 11.9898 10C11.7648 10 11.5937 10.0721 11.4764 10.2163C11.3592 10.3605 11.3005 10.5673 11.3005 10.8367C11.3005 11.0966 11.3592 11.298 11.4764 11.4408C11.5937 11.5837 11.7607 11.6551 11.9775 11.6551C12.1234 11.6551 12.2502 11.6218 12.3579 11.5551C12.4656 11.4884 12.5501 11.3925 12.6115 11.2673L12.9612 11.3878C12.8753 11.5823 12.7458 11.7333 12.5726 11.8408C12.4008 11.9469 12.2079 12 11.9939 12ZM11.1778 10.9388V10.6469H12.8099V10.9388H11.1778Z" fill="#C8A96B" />
                  </svg>
                </div>
                <p className="manrope font-500 size-12 color-earthy-olive-color">Free delivery</p>
              </div>
              <div className="display-flex align-items-center gap-8">
                <div className="border-radius-100 background-white-400 display-flex align-items-center justify-content-center ProductDetails-delivery-details-svg-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z" fill="#D3BA89" />
                    <mask id="mask0_322_2467" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="7" y="9" width="6" height="6">
                      <path d="M7.14112 12.0982C6.91518 12.4874 7.20185 12.9739 7.65173 12.9657L7.68492 12.9651C7.83323 12.9622 7.97812 12.9192 8.10353 12.8399L9.08419 12.2198C9.08794 12.2174 9.0911 12.2142 9.09478 12.2117C9.0924 12.2157 9.08951 12.2196 9.08719 12.2236L9.0134 12.35L8.50544 13.227C8.4311 13.3552 8.3925 13.5018 8.39524 13.65L8.39587 13.6832C8.40443 14.133 8.90162 14.4006 9.28199 14.1607C9.29142 14.1548 9.30233 14.15 9.31197 14.1445C9.61744 13.9322 9.99026 13.8723 10.4261 13.9203C10.2377 13.924 10.07 13.9946 9.93284 14.0752C9.98957 14.0925 10.0456 14.1148 10.0983 14.1453C10.4875 14.3713 10.9742 14.0847 10.9657 13.6347L10.9651 13.6015C10.9622 13.4532 10.9192 13.3083 10.84 13.1829L10.2208 12.2022C10.2187 12.1988 10.2159 12.1959 10.2138 12.1926C10.2172 12.1946 10.2202 12.1972 10.2237 12.1992L11.227 12.781C11.3553 12.8554 11.5018 12.8929 11.65 12.8902L11.6832 12.8896C12.1332 12.881 12.4012 12.3839 12.1607 12.0035C12.1283 11.952 12.1039 11.8968 12.0844 11.8408C12.009 11.9809 11.9448 12.1511 11.9483 12.3396C11.8833 11.9024 11.9293 11.5246 12.134 11.2099C12.1379 11.2026 12.1412 11.1943 12.1453 11.1872C12.3708 10.798 12.0845 10.3113 11.6347 10.3197L11.6015 10.3203C11.4533 10.3232 11.3083 10.3673 11.1829 10.4464L10.3258 10.9871L10.2023 11.0656C10.1983 11.0681 10.1946 11.0711 10.1907 11.0737C10.193 11.0699 10.1961 11.0666 10.1983 11.0628L10.781 10.0594C10.8554 9.93114 10.893 9.78465 10.8902 9.63639L10.8896 9.60319C10.8811 9.15318 10.384 8.88526 10.0035 9.12569C9.95212 9.15812 9.8968 9.18254 9.84085 9.20201C9.9809 9.27735 10.1513 9.34157 10.3396 9.33813C9.90458 9.40282 9.52867 9.35645 9.21483 9.15425C9.20595 9.14959 9.19596 9.14616 9.18724 9.1411C8.79801 8.91545 8.31127 9.20178 8.31977 9.6517L8.32039 9.6849C8.32327 9.8331 8.36637 9.97816 8.4455 10.1035L8.98717 10.9606L9.06568 11.0842C9.06778 11.0875 9.07057 11.0905 9.0727 11.0938C9.06943 11.0918 9.06613 11.0891 9.06281 11.0872L8.9364 11.0134L8.05945 10.5044C7.93122 10.4301 7.78457 10.3925 7.63641 10.3952L7.60321 10.3958C7.15356 10.4045 6.88583 10.9016 7.12571 11.282C7.13106 11.2904 7.13495 11.3004 7.1399 11.309C7.3539 11.6151 7.41435 11.9888 7.3661 12.4261C7.36245 12.2376 7.29187 12.07 7.21125 11.9328C7.19388 11.9896 7.17167 12.0455 7.14112 12.0982ZM7.98483 11.674C8.86731 11.5886 9.5564 10.8738 9.60858 9.98876C9.69414 10.8712 10.4096 11.5596 11.2948 11.6115C10.4122 11.6969 9.72324 12.4127 9.67105 13.2977C9.5855 12.4153 8.86994 11.726 7.98483 11.674Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_322_2467)">
                      <g clipPath="url(#paint0_angular_322_2467_clip_path)" data-figma-skip-parse="true"><g transform="matrix(-9.91326e-05 -0.00525141 -0.0212372 0.000400901 9.64825 11.5498)"><foreignObject x="-1190.39" y="-1190.39" width="2380.78" height="2380.78"><div xmlns="http://www.w3.org/1999/xhtml" style={{ background: "conic-gradient(from 90deg,rgba(196, 157, 91, 1) 0deg,rgba(206, 164, 96, 1) 36.3462deg,rgba(188, 151, 88, 1) 77.8846deg,rgba(237, 206, 154, 1) 157.5deg,rgba(183, 140, 65, 1) 221.538deg,rgba(230, 191, 125, 1) 273.462deg,rgba(188, 151, 88, 1) 328.846deg,rgba(196, 157, 91, 1) 360deg)", height: "100%", width: "100%", opacity: "1" }}></div></foreignObject></g></g><rect width="10.5047" height="12.1053" rx="5.25235" transform="matrix(0.018874 0.999822 0.999822 -0.018874 3.49756 6.4126)" data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.80784314870834351,&#34;g&#34;:0.64313727617263794,&#34;b&#34;:0.37647059559822083,&#34;a&#34;:1.0},&#34;position&#34;:0.10096153616905212},{&#34;color&#34;:{&#34;r&#34;:0.73725491762161255,&#34;g&#34;:0.59215688705444336,&#34;b&#34;:0.34509804844856262,&#34;a&#34;:1.0},&#34;position&#34;:0.21634615957736969},{&#34;color&#34;:{&#34;r&#34;:0.93269228935241699,&#34;g&#34;:0.81157684326171875,&#34;b&#34;:0.60535317659378052,&#34;a&#34;:1.0},&#34;position&#34;:0.43750},{&#34;color&#34;:{&#34;r&#34;:0.72115385532379150,&#34;g&#34;:0.54925572872161865,&#34;b&#34;:0.25656434893608093,&#34;a&#34;:1.0},&#34;position&#34;:0.61538463830947876},{&#34;color&#34;:{&#34;r&#34;:0.90384614467620850,&#34;g&#34;:0.75110483169555664,&#34;b&#34;:0.49103179574012756,&#34;a&#34;:1.0},&#34;position&#34;:0.75961536169052124},{&#34;color&#34;:{&#34;r&#34;:0.73725491762161255,&#34;g&#34;:0.59215688705444336,&#34;b&#34;:0.34509804844856262,&#34;a&#34;:1.0},&#34;position&#34;:0.91346156597137451}],&#34;stopsVar&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.80784314870834351,&#34;g&#34;:0.64313727617263794,&#34;b&#34;:0.37647059559822083,&#34;a&#34;:1.0},&#34;position&#34;:0.10096153616905212},{&#34;color&#34;:{&#34;r&#34;:0.73725491762161255,&#34;g&#34;:0.59215688705444336,&#34;b&#34;:0.34509804844856262,&#34;a&#34;:1.0},&#34;position&#34;:0.21634615957736969},{&#34;color&#34;:{&#34;r&#34;:0.93269228935241699,&#34;g&#34;:0.81157684326171875,&#34;b&#34;:0.60535317659378052,&#34;a&#34;:1.0},&#34;position&#34;:0.43750},{&#34;color&#34;:{&#34;r&#34;:0.72115385532379150,&#34;g&#34;:0.54925572872161865,&#34;b&#34;:0.25656434893608093,&#34;a&#34;:1.0},&#34;position&#34;:0.61538463830947876},{&#34;color&#34;:{&#34;r&#34;:0.90384614467620850,&#34;g&#34;:0.75110483169555664,&#34;b&#34;:0.49103179574012756,&#34;a&#34;:1.0},&#34;position&#34;:0.75961536169052124},{&#34;color&#34;:{&#34;r&#34;:0.73725491762161255,&#34;g&#34;:0.59215688705444336,&#34;b&#34;:0.34509804844856262,&#34;a&#34;:1.0},&#34;position&#34;:0.91346156597137451}],&#34;transform&#34;:{&#34;m00&#34;:-0.19826519489288330,&#34;m01&#34;:-42.474376678466797,&#34;m02&#34;:30.984565734863281,&#34;m10&#34;:-10.502823829650879,&#34;m11&#34;:0.80180245637893677,&#34;m12&#34;:16.400283813476562},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}" />
                    </g>
                    <defs>
                      <clipPath id="paint0_angular_322_2467_clip_path"><rect width="10.5047" height="12.1053" rx="5.25235" transform="matrix(0.018874 0.999822 0.999822 -0.018874 3.49756 6.4126)" /></clipPath></defs>
                  </svg>
                </div>
                <p className="manrope font-500 size-12 color-earthy-olive-color">Delivered by iPure herbs</p>
              </div>
              <div className="display-flex align-items-center gap-8">
                <div className="border-radius-100 background-white-400 display-flex align-items-center justify-content-center ProductDetails-delivery-details-svg-container">
                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7V6C3 2.68629 5.68629 0 9 0C12.3137 0 15 2.68629 15 6V7H17C17.5523 7 18 7.44772 18 8V20C18 20.5523 17.5523 21 17 21H1C0.44772 21 0 20.5523 0 20V8C0 7.44772 0.44772 7 1 7H3ZM16 9H2V19H16V9ZM8 14.7324C7.4022 14.3866 7 13.7403 7 13C7 11.8954 7.8954 11 9 11C10.1046 11 11 11.8954 11 13C11 13.7403 10.5978 14.3866 10 14.7324V17H8V14.7324ZM5 7H13V6C13 3.79086 11.2091 2 9 2C6.79086 2 5 3.79086 5 6V7Z" fill="#D3BA89" />
                  </svg>
                </div>
                <p className="manrope font-500 size-12 color-earthy-olive-color">Secure transaction</p>
              </div>
            </div>
          </div>
        </div>


        <div className="ProductDetails-checkout-container">
          <div className="display-flex align-items-baseline gap-8">
            <span className="manrope font-600 size-24 ProductDetails-price">
              ${(displayPrice * selectedQty).toFixed(2)}
            </span>
            
          </div>

          <div className="display-flex flex-direction-column gap-8 ProductDetails-delivery-options">
            <label className="cursor-pointer display-flex align-items-center gap-8 manrope font-400 size-16 color-black-black ProductDetails-delivery-option">
              <input
                type="radio"
                name="delivery"
                value="standard"
                checked={deliveryType === "standard"}
                onChange={(e) => setDeliveryType(e.target.value)}
              />
              <span className="ProductDetails-custom-radio"></span>
              Standard delivery
            </label>

            <label className="cursor-pointer display-flex align-items-center gap-8 manrope font-400 size-16 color-black-black ProductDetails-delivery-option">
              <input
                type="radio"
                name="delivery"
                value="express"
                checked={deliveryType === "express"}
                onChange={(e) => setDeliveryType(e.target.value)}
              />
              <span className="ProductDetails-custom-radio"></span>
              <span className='manrope font-400 size-16 color-white ProductDetails-choose-express-checkout'>Express delivery</span>
            </label>
          </div>

          <div className="ProductDetails-location"></div>

          <p className={`manrope font-600 size-20 ProductDetails-stock ${product.inStock ? "in-stock" : "out-of-stock"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <div className="display-flex flex-direction-column gap-12 ProductDetails-actions">
            <div className="display-flex align-items-center overflow-hidden ProductDetails-qty-control">
              <button onClick={handleDecrease} className="display-flex align-items-center justify-content-center border-none background-transparent cursor-pointer transition height-100 width-100 ProductDetails-qty-btn" aria-label="Decrease">
                <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0V2H14V0H0Z" fill="#58585A" />
                </svg>
              </button>
              <span className="manrope font-400 size-16 color-black-black text-align-center ProductDetails-qty-count">{selectedQty} {selectedQty <= 1 && "Quantity"}</span>
              <button onClick={handleIncrease} className="display-flex align-items-center justify-content-center border-none background-transparent cursor-pointer transition height-100 width-100 ProductDetails-qty-btn" aria-label="Increase">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.99998 7.00002L16 7.00004L16 9.00002L8.99998 9L9.00005 16L7.00007 16L7 9L3.56772e-05 8.99997L2.11787e-05 6.99998L7 7.00002L7 -2.64733e-06L9 4.77051e-06L8.99998 7.00002Z" fill="#58585A" />
                </svg>
              </button>
            </div>

            <button
              onClick={handleCartAction}
              disabled={!product.inStock}
              className="width-100 manrope size-16 font-400 background-transparent color-dfg-200 transition cursor-pointer ProductDetails-btn-cart"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="width-100 size-16 manrope font-400 transition cursor-pointer color-white ProductDetails-btn-buy"
            >
              Buy Now
            </button>
          </div>

          <div className='ProductDetails-coupon-container'>
            <p className='manrope font-600 size-24 color-deep-forest-green ProductDetails-coupon-container-p'>Apply coupon</p>
            <div className='position-relative ProductDetails-coupon-input-container'>
              <input className='width-100 manrope font-400 size-16 outline-none' placeholder='ipureherb20' type="text" />
              <button className='position-absolute border-none outline-none background-transparent manrope font-500 size-16 cursor-pointer'>Apply</button>
            </div>
          </div>
        </div>
      </div >

      {/* ── Tabs: Description / Reviews ─────────────────────────────────── */}
      <div className="ProductDetails-tabs-section" >
        <div className="display-flex ProductDetails-tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`manrope font-600 size-20 color-black-black cursor-pointer ProductDetails-tab ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ProductDetails-tab-content">
          {activeTab === "Description" && (
            <div className="ProductDetails-description">
              <div className="ProductDetails-description-first-row">
                <p className="manrope font-600 size-20 color-deep-forest-green ProductDetails-description-title">Overview</p>
                {product.overview
                  ? product.overview.split('\n').map((line, i) => {
                    if (!line.trim()) return null;
                    if (line.trim().startsWith('•')) {
                      return (
                        <p key={i} className="manrope font-400 size-16 color-black-black ProductDetails-description-p" style={{ paddingLeft: '1em' }}>
                          {line.trim()}
                        </p>
                      );
                    }
                    return (
                      <p key={i} className="manrope font-400 size-16 color-black-black ProductDetails-description-p">
                        {line.trim()}
                      </p>
                    );
                  })
                  : null
                }
              </div>
            </div>
          )}

          {activeTab === "Additional information" && (
            <div className="ProductDetails-description">
              <div className="ProductDetails-description-second-row">

                {/* Key Herbal Ingredients & Key Benefits */}
                {(product.additionalInfo?.key_herbal_ingredients?.length > 0 ||
                  product.additionalInfo?.key_benefits?.length > 0) && (
                    <div>
                      <table>
                        <thead>
                          <tr>
                            {product.additionalInfo?.key_herbal_ingredients?.length > 0 && (
                              <th className="manrope size-16 font-600 color-deep-forest-green">
                                Key Herbal Ingredients
                              </th>
                            )}
                            {product.additionalInfo?.key_benefits?.length > 0 && (
                              <th className="manrope size-16 font-600 color-deep-forest-green">
                                Key Benefits
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({
                            length: Math.max(
                              product.additionalInfo?.key_herbal_ingredients?.length ?? 0,
                              product.additionalInfo?.key_benefits?.length ?? 0
                            ),
                          }).map((_, i) => (
                            <tr key={i}>
                              {product.additionalInfo?.key_herbal_ingredients?.length > 0 && (
                                <td className="manrope size-14 font-400 color-black-black">
                                  {product.additionalInfo.key_herbal_ingredients[i] ?? ""}
                                </td>
                              )}
                              {product.additionalInfo?.key_benefits?.length > 0 && (
                                <td className="manrope size-14 font-400 color-black-black">
                                  {product.additionalInfo.key_benefits[i] ?? ""}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                <div className="display-flex flex-direction-column gap-15">

                  {/* Other Ingredients */}
                  {product.additionalInfo?.other_ingredients && (
                    <div className="background-white-200 ProductDetails-description-second-row-rght-sub">
                      <h6 className="manrope font-700 size-18 color-deep-forest-green">Other Ingredients</h6>
                      {product.additionalInfo.other_ingredients.split("\n").map((line, i) =>
                        line.trim() ? (
                          <p key={i} className="manrope font-400 size-16 color-black-black">{line.trim()}</p>
                        ) : null
                      )}
                    </div>
                  )}

                  {/* Specifications */}
                  {product.additionalInfo?.specifications?.length > 0 && (
                    <div className="background-white-200 ProductDetails-description-second-row-rght-sub">
                      <h6 className="manrope font-700 size-18 color-deep-forest-green">Specifications</h6>
                      <div className="display-grid ProductDetails-description-second-row-rght-sub-grid">
                        {product.additionalInfo.specifications.map((spec, i) => (
                          <p key={i} className="manrope font-400 size-16 color-black-black">
                            <strong>{spec.label}:</strong> {spec.value}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Indications */}
                  {product.additionalInfo?.indications?.length > 0 && (
                    <div className="background-white-200 ProductDetails-description-second-row-rght-sub">
                      <h6 className="manrope font-700 size-18 color-deep-forest-green">Indications</h6>
                      {product.additionalInfo.indications.map((line, i) => {
                        const parts = line.split('•');
                        const heading = parts[0].trim(); // "Traditionally Used To Support:"
                        const bullets = parts.slice(1).filter(p => p.trim()); // the actual bullet items

                        return (
                          <div key={i}>
                            {heading && (
                              <p className="manrope font-600 size-16 color-black-black" style={{ marginBottom: '10px' }}>
                                {heading}
                              </p>
                            )}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
                              {bullets.map((part, j) => (
                                <p key={j} className="manrope font-400 size-16 color-black-black" style={{ paddingLeft: '1em' }}>
                                  • {part.trim()}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}


                </div>
              </div>

              <div className="display-grid ProductDetails-description-third-row">
                {/* Supplement Facts */}
                {product.additionalInfo?.supplement_facts?.length > 0 && (
                  <div className="background-white-200 ProductDetails-description-second-row-rght-sub">
                    <h6 className="manrope font-700 size-18 color-deep-forest-green">Supplement Facts</h6>
                    {product.additionalInfo.supplement_facts.map((line, i) =>
                      line.split('•').map((part, j) => {
                        if (!part.trim()) return null;
                        return (
                          <p key={`${i}-${j}`} className="manrope font-400 size-16 color-black-black" style={{ paddingLeft: '1em' }}>
                            • {part.trim()}
                          </p>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Suggested Use */}
                {product.additionalInfo?.suggested_use?.length > 0 && (
                  <div className="background-white-200 ProductDetails-description-second-row-rght-sub">
                    <h6 className="manrope font-700 size-18 color-deep-forest-green">Suggested Use</h6>
                    {product.additionalInfo.suggested_use.map((line, i) =>
                      line.split('•').map((part, j) => {
                        if (!part.trim()) return null;
                        return (
                          <p key={`${i}-${j}`} className="manrope font-400 size-16 color-black-black" style={{ paddingLeft: '1em' }}>
                            • {part.trim()}
                          </p>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Warnings */}
                {product.additionalInfo?.warnings?.length > 0 && (
                  <div className="background-white-200 ProductDetails-description-second-row-rght-sub">
                    <h6 className="manrope font-700 size-18 color-deep-forest-green">Warnings</h6>
                    {product.additionalInfo.warnings.map((line, i) =>
                      line.split('•').map((part, j) => {
                        if (!part.trim()) return null;
                        return (
                          <p key={`${i}-${j}`} className="manrope font-400 size-16 color-black-black" style={{ paddingLeft: '1em' }}>
                            • {part.trim()}
                          </p>
                        );
                      })
                    )}

                    <p className="manrope font-600 size-16 color-black-black text-align-center ProductDetails-description-third-row-sub-warning">
                      Do not use if safety seal is broken or missing.
                    </p>
                  </div>
                )}
              </div>

              <div className="ProductDetails-description-disclaimer">
                <h6 className="manrope font-600 size-20 color-deep-forest-green">Disclaimer</h6>
                <p className="manrope font-400 size-16 color-black-black">
                  Our herbal wellness products are thoughtfully crafted to support your everyday well-being
                  and healthy lifestyle. Results may vary from person to person based on individual needs
                  and routines. These products are not intended to diagnose, treat, cure, or prevent any disease.
                </p>
              </div>
            </div>
          )}

          < hr className="ProductDetails-description-hr" />

          {activeTab === "Reviews" && (
            <div className="ProductDetails-reviews">
              <div className='display-flex align-items-flex-start ProductDetails-reviews-sub'>

                {/* Left: rating summary */}
                <div className='ProductDetails-reviews-count-container'>
                  <h3 className='manrope size-48 color-deep-forest-green'>
                    {product.reviews?.average ?? 0}
                  </h3>
                  <div className="display-flex align-items-center ProductDetails-stars">
                    {[...Array(5)].map((_, index) => {
                      const fill = Math.max(0, Math.min(100, ((product.reviews?.average ?? 0) - index) * 100));
                      return <Star key={index} fill={fill} />;
                    })}
                  </div>
                  <p className='manrope font-400 size-16 color-deep-forest-green ProductDetails-reviews-p'>
                    {product.reviews?.total ?? 0} verified reviews
                  </p>

                  <button className='color-white background-deep-forest-green gap-8 transition manrope font-600 size-16 ProductDetails-write-review-btn'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.24264 15.9706H18V17.9706H0V13.7279L9.8995 3.82842L14.1421 8.07109L6.24264 15.9706ZM11.3137 2.41421L13.435 0.29289C13.8256 -0.09763 14.4587 -0.09763 14.8492 0.29289L17.6777 3.12132C18.0682 3.51184 18.0682 4.14501 17.6777 4.53553L15.5563 6.65685L11.3137 2.41421Z" fill="#F4F4F4" />
                    </svg>
                    Write a Review
                  </button>
                </div>

                {/* Right: review list */}
                <div className='width-100 ProductDetails-all-reviews-container'>
                  <h4 className='manrope font-600 size-28 color-deep-forest-green'>
                    {product.reviews?.total ?? 0} Reviews
                  </h4>

                  <div className='display-flex align-items-center justify-content-space-between width-100 ProductDetails-reviews-toolbar'>
                    <button className="display-flex align-items-center color-deep-forest-green font-400 manrope cursor-pointer transition outline-none size-18 ProductDetails-filter-btn">
                      All reviews
                    </button>
                    <button className="display-flex align-items-center color-deep-forest-green font-400 manrope cursor-pointer transition outline-none size-18 ProductDetails-filter-btn">
                      Filter
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.17071 16C4.58254 14.8348 5.69378 14 7 14C8.3062 14 9.4175 14.8348 9.8293 16H20V18H9.8293C9.4175 19.1652 8.3062 20 7 20C5.69378 20 4.58254 19.1652 4.17071 18H0V16H4.17071ZM10.1707 9C10.5825 7.83481 11.6938 7 13 7C14.3062 7 15.4175 7.83481 15.8293 9H20V11H15.8293C15.4175 12.1652 14.3062 13 13 13C11.6938 13 10.5825 12.1652 10.1707 11H0V9H10.1707ZM4.17071 2C4.58254 0.83481 5.69378 0 7 0C8.3062 0 9.4175 0.83481 9.8293 2H20V4H9.8293C9.4175 5.16519 8.3062 6 7 6C5.69378 6 4.58254 5.16519 4.17071 4H0V2H4.17071ZM7 4C7.55228 4 8 3.55228 8 3C8 2.44772 7.55228 2 7 2C6.44772 2 6 2.44772 6 3C6 3.55228 6.44772 4 7 4ZM13 11C13.5523 11 14 10.5523 14 10C14 9.4477 13.5523 9 13 9C12.4477 9 12 9.4477 12 10C12 10.5523 12.4477 11 13 11ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z" fill="#2F3A2F" />
                      </svg>
                    </button>
                  </div>

                  {product.reviews?.data?.length > 0 ? (
                    <>
                      <div className='ProductDetails-review-list'>
                        {product.reviews.data.slice(0, visibleReviews).map((review) => (
                          <div key={review.id} className='ProductDetails-review-card'>
                            <div className='display-flex align-items-center justify-content-space-between ProductDetails-review-header'>
                              <div className='display-flex align-items-center gap-10'>
                                <div className='ProductDetails-review-avatar'>
                                  <span className='manrope font-600 size-14 color-white'>
                                    {review.name?.charAt(0) ?? "?"}
                                  </span>
                                </div>
                                <div>
                                  <p className='manrope font-700 size-14 color-deep-forest-green'>{review.name}</p>
                                  <p className='manrope font-500 size-14 color-dfg-400'>{review.date}</p>
                                </div>
                              </div>
                              {review.verified && (
                                <div className='display-flex align-items-center justify-content-center gap-8 ProductDetails-verified-badge'>
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <rect x="0.5" y="0.5" width="13" height="13" rx="6.5" stroke="#2F3A2F" />
                                    <path d="M5.625 8.58824L9.41667 4L10 4.70588L5.625 10L3 6.82355L3.58334 6.11767L5.625 8.58824Z" fill="#2F3A2F" />
                                  </svg>
                                  <span className='manrope font-500 size-14' style={{ color: 'rgba(47, 58, 47, 1)', lineHeight: '20px' }}>Verified</span>
                                </div>
                              )}
                            </div>

                            <div className='display-flex align-items-center ProductDetails-stars' style={{ marginTop: 8 }}>
                              {[...Array(5)].map((_, i) => {
                                const fill = Math.max(0, Math.min(100, (review.rating - i) * 100));
                                return <Star key={i} fill={fill} />;
                              })}
                            </div>

                            {review.title && (
                              <p className='manrope font-600 size-14 ProductDetails-review-title'>{review.title}</p>
                            )}
                            <p className='manrope font-400 size-16 color-deep-forest-green ProductDetails-review-body'>{review.body}</p>

                            <div className='display-flex align-items-center justify-content-space-between ProductDetails-review-footer'>
                              <button className='display-flex align-items-center gap-8 manrope font-600 size-20 ProductDetails-helpful-btn'>
                                <svg width="24" height="23" viewBox="0 0 24 23" fill="none">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M7.75 0H6.79989L6.5456 0.915448L4.29989 9H0V22.5H18.1343L18.4287 21.6661L23.0177 8.66609L23.6058 7H13.5V4.85C13.5 2.17142 11.3286 0 8.65 0H7.75ZM6.4544 10.5846L8.69996 2.50052C9.9748 2.52711 11 3.56883 11 4.85V9.5H20.0722L16.3657 20H6.25V11.3204L6.4544 10.5846Z" fill="#2F3A2F" />
                                </svg>
                                Helpful ({review.helpful ?? 0})
                              </button>
                              <button className='manrope font-600 size-20 ProductDetails-report-btn'>Report</button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {visibleReviews < product.reviews.data.length && (
                        <div className='display-flex justify-content-flex-end'>
                          <button
                            onClick={() => setVisibleReviews((prev) => prev + 3)}
                            className='manrope font-500 size-16 color-deep-forest-green ProductDetails-view-more-btn'
                          >
                            View more
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="ProductDetails-reviews-sub">
                      <p className="manrope font-500 size-20 color-deep-forest-green ProductDetails-reviews-empty">
                        No reviews yet. Be the first to review this product.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <hr className="ProductDetails-description-hr" />
            </div>
          )}
        </div>
      </div >


      {
        recommended.length > 0 && (
          <section className="ProductDetails-section">
            <h2 className="manrope font-600 size-24 ProductDetails-section-title">Recommended Products</h2>
            <div className="ProductDetails-grid">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )
      }


      {
        moreToExplore.length > 0 && (
          <section className="ProductDetails-section ProductDetails-section-02">
            <h2 className="manrope font-600 size-24 ProductDetails-section-title">More to Explore</h2>
            <div className="ProductDetails-grid">
              {moreToExplore.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )
      }


      {showShareModal && (
        <div
          onClick={() => setShowShareModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: '16px',
              padding: '28px 32px', width: '360px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="manrope font-600 size-20 color-deep-forest-green" style={{ margin: 0 }}>Share</h3>
              <button
                onClick={() => setShowShareModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#2F3A2F' }}
              >✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <a

                href={`mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(`Check out this product: ${window.location.href}`)}`}
                className="manrope font-400 size-16 color-deep-forest-green"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 8px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f3'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#f0f0ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none"><path d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 4L10 9L2 4V2L10 7L18 2V4Z" fill="#2F3A2F" /></svg>
                </span>
                Email
              </a>

              <a

                href={`https://www.facebook.com/dialog/share?app_id=465632727431967&display=popup&href=${encodeURIComponent(window.location.href)}&redirect_uri=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noopener noreferrer"
                className="manrope font-400 size-16 color-deep-forest-green"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 8px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f3'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#e8edf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" /></svg>
                </span>
                Facebook
              </a>

              <a

                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noopener noreferrer"
                className="manrope font-400 size-16 color-deep-forest-green"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 8px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f3'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </span>
                X
              </a>


              <a
                href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(product.name)}&media=${encodeURIComponent(product.images[0]?.url ?? '')}`}
                target="_blank" rel="noopener noreferrer"
                className="manrope font-400 size-16 color-deep-forest-green"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 8px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f3'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#fcecea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#E60023"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>
                </span>
                Pinterest
              </a>


              <button
                onClick={handleCopyLink}
                className="manrope font-400 size-16 color-deep-forest-green"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 8px', borderRadius: '10px', background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f5f3'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#f0f0ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F3A2F" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                </span>
                Copy link
              </button>
            </div>
          </div>
        </div>
      )}

    </div >
  );
}