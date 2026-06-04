"use client";

import { DUMMY_PRODUCTS } from '@/store/useProductStore'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/useProductStore";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "@/components/ProductCard";
import "./ProductDetails.css";
import toast from "react-hot-toast";

const TABS = ["Description", "Reviews"];

export default function ProductDetailss() {
  const { slug } = useParams();
  const { products } = useProductStore();
  const { addToCart, updateQuantity, removeFromCart, cart } = useCartStore();
  const { toggleWishlist, wishlistIds } = useWishlistStore();

  const [activeTab, setActiveTab] = useState("Description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('125 gm');
  const [deliveryType, setDeliveryType] = useState("standard");
  const [selectedQty, setSelectedQty] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // ─── Find product by slug ─────────────────────────────────────────────────
  // When API is ready: fetch from /api/products/{slug} instead
  const product = DUMMY_PRODUCTS.find((p) => p.slug === slug) ?? products[0];

  const cartItem = cart.find((i) => i.id === product?.id);
  const isWishlisted = mounted && wishlistIds.includes(product?.id);

  useEffect(() => {
    if (cartItem) {
      setSelectedQty(cartItem.quantity);
    }
  }, [cartItem]);

  const isInCart = !!cartItem;

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

  // ─── Recommended: other products ─────────────────────────────────────────
  const recommended = products.filter((p) => p.id !== product?.id).slice(0, 4);
  const moreToExplore = products.filter((p) => p.id !== product?.id).slice(4, 9);

  const handleShare = async () => {
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Product link copied!");
      }
    } catch (error) {
      console.error("Share failed:", error);
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

  const handleSocialShare = (platform) => {
    const shareUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(product.name);

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,

      x: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`,

      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,

      instagram: null,
      youtube: null,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=600");
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied! Share it on the app.");
    }
  };

  if (!product) return null;

  return (
    <div className="ProductDetails-wrapper">

      {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
      {/* <nav className="ProductDetails-breadcrumb">
        <Link href="/" className="ProductDetails-breadcrumb-link">Home</Link>
        <span>/</span>
        <Link href="/products" className="ProductDetails-breadcrumb-link">Shop</Link>
        <span>/</span>
        <span className="ProductDetails-breadcrumb-current">{product.name}</span>
      </nav> */}

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
          <div className="display-flex align-items-center ProductDetails-gallery-images-container">
            <div className="display-flex flex-direction-column ProductDetails-thumbs">
              {product?.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
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

            <div>
              <div className="width-100 display-flex align-items-center justify-content-center flex-direction-column overflow-hidden ProductDetails-main-image">
                <img
                  src={product.images[selectedImage]?.url}
                  alt={product.name}
                  className="object-fit-contain"
                  onError={(e) => { e.target.src = "https://placehold.co/500x500/f3f4f6/9ca3af?text=Product"; }}
                />
              </div>
              <p className='text-align-center color-black-black manrope font-400 size-14'>Click to see full view</p>
            </div>
          </div>
        </div>


        <div className="display-flex flex-direction-column ProductDetails-info">
          <h1 className="playfair_display font-600 size-36 ProductDetails-name">{product.name}</h1>
          <div className='display-flex align-items-center ProductDetails-by-container'>
            <p className='manrope font-400 size-24 ProductDetails-by'>By:</p>
            <a href="#" className='ProductDetails-by-a'>
              <p className='manrope font-400 size-18 '>Bioqem</p>
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
            <span className="manrope font-600 size-24 ProductDetails-price">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="manrope font-600 size-24 color-dfg-800 ProductDetails-original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="manrope font-400 size-14 color-black-black ProductDetails-short-desc">Bioqem Pharma Happy Knights Prash for Men is a natural, plant-based blend with ingredients like Korean Red Ginseng, Royal Jelly, and Safed Musali to support energy, stamina, vitality, and men’s wellness naturally.</p>
          <p className='manrope font-600 size-20 ProductDetails-choose'>Choose <span className='manrope font-600 size-16 color-white ProductDetails-choose-express'>Express delivery</span> <span className='manrope font-500 size-14 color-earthy-olive-color'>Get your Order earliest.</span></p>
          <p className="manrope font-600 size-20 color-deep-forest-green ProductDetails-size">Size</p>
          <div className="display-flex ProductDetails-sizes-container">
            {
              ['125 gm', '250 gm', '500 gm', '1 Kg'].map((item, i) => (
                <div key={i} onClick={() => setSelectedSize(item)} className={`cursor-pointer manrope font-400 size-18 color-deep-forest-green transition text-align-center ProductDetails-size-box ${selectedSize === item && 'active'}`}>
                  {item}
                </div>
              ))
            }
          </div>

          <div className="display-flex flex-direction-column gap-10">
            <p className="manrope font-400 size-14 color-black-black">SKU: N/A</p>
            <p className="manrope font-400 size-14 color-black-black">Categories: Best selling, Men’s health enhancer</p>
            <p className="manrope font-400 size-14 color-black-black">Tags: Erectile dysfunction, loss of libido, Men’s wellness, Premature ejaculation</p>
            <div className="gap-10 display-flex align-items-center ProductDetails-share-details-container">
              <p className="manrope font-400 size-14 color-black-black">Share:</p>
              <div className="display-flex align-items-center ProductDetails-share-icons-container">
                <button
                  onClick={() => handleSocialShare("instagram")}
                  className="display-flex align-items-center justify-content-center cursor-pointer background-transparent border-none"
                  type="button"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.35141 0C8.10168 0.00124 8.48188 0.00521335 8.81041 0.0149934L8.93981 0.01922C9.08928 0.0245334 9.23675 0.0312 9.41455 0.0395333C10.1239 0.0723133 10.6079 0.184533 11.0329 0.349533C11.4723 0.51898 11.8434 0.747867 12.2139 1.11843C12.5839 1.48898 12.8129 1.8612 12.9829 2.29953C13.1473 2.72398 13.2595 3.20843 13.2929 3.91787C13.3008 4.09565 13.3072 4.24311 13.3125 4.39261L13.3167 4.522C13.3264 4.85049 13.3309 5.23075 13.3323 5.98105L13.3328 6.47811C13.3329 6.53885 13.3329 6.60151 13.3329 6.66618L13.3328 6.85425L13.3324 7.35138C13.3311 8.10165 13.3272 8.48191 13.3174 8.81038L13.3131 8.93978C13.3079 9.08931 13.3012 9.23678 13.2929 9.41451C13.2601 10.124 13.1473 10.6078 12.9829 11.0328C12.8134 11.4723 12.5839 11.8434 12.2139 12.214C11.8434 12.584 11.4706 12.8128 11.0329 12.9828C10.6079 13.1473 10.1239 13.2595 9.41455 13.2928C9.23675 13.3008 9.08928 13.3072 8.93981 13.3124L8.81041 13.3166C8.48188 13.3264 8.10168 13.3308 7.35141 13.3323L6.85428 13.3328C6.79355 13.3328 6.73088 13.3328 6.66621 13.3328H6.47815L5.98101 13.3324C5.23075 13.3312 4.85049 13.3272 4.52199 13.3174L4.39261 13.3132C4.24311 13.3078 4.09564 13.3012 3.91787 13.2928C3.20842 13.2601 2.72509 13.1473 2.29953 12.9828C1.86064 12.8134 1.48897 12.584 1.11842 12.214C0.747867 11.8434 0.519533 11.4706 0.349533 11.0328C0.184533 10.6078 0.0728668 10.124 0.0395335 9.41451C0.0316135 9.23678 0.0251534 9.08931 0.01992 8.93978L0.0157267 8.81038C0.00597339 8.48191 0.00152678 8.10165 8.67844e-05 7.35138L0 5.98105C0.00124 5.23075 0.00520667 4.85049 0.0149867 4.522L0.01922 4.39261C0.0245334 4.24311 0.0312001 4.09565 0.0395335 3.91787C0.0723068 3.20787 0.184533 2.72453 0.349533 2.29953C0.518973 1.86065 0.747867 1.48898 1.11842 1.11843C1.48897 0.747867 1.8612 0.519533 2.29953 0.349533C2.72453 0.184533 3.20787 0.0728666 3.91787 0.0395333C4.09564 0.03162 4.24311 0.02516 4.39261 0.0199267L4.52199 0.0157332C4.85049 0.00597324 5.23075 0.00152663 5.98101 8.66254e-05L7.35141 0ZM6.66621 3.33287C4.82427 3.33287 3.33287 4.82589 3.33287 6.66618C3.33287 8.50811 4.82589 9.99951 6.66621 9.99951C8.50815 9.99951 9.99955 8.50651 9.99955 6.66618C9.99955 4.82427 8.50648 3.33287 6.66621 3.33287ZM6.66621 4.6662C7.77081 4.6662 8.66621 5.56131 8.66621 6.66618C8.66621 7.77078 7.77108 8.66618 6.66621 8.66618C5.56161 8.66618 4.6662 7.77111 4.6662 6.66618C4.6662 5.56158 5.56128 4.6662 6.66621 4.6662ZM10.1662 2.33287C9.70668 2.33287 9.33288 2.70614 9.33288 3.16563C9.33288 3.62513 9.70615 3.99898 10.1662 3.99898C10.6257 3.99898 10.9995 3.62571 10.9995 3.16563C10.9995 2.70614 10.6251 2.33229 10.1662 2.33287Z" fill="#B1B1B1" />
                  </svg>
                </button>
                <button
                  onClick={() => handleSocialShare("linkedin")}
                  className="display-flex align-items-center justify-content-center cursor-pointer background-transparent border-none"
                  type="button"
                >
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.6667 1.33394C2.66645 1.87681 2.3371 2.36533 1.83394 2.56914C1.33078 2.77295 0.754293 2.65135 0.376313 2.26168C-0.0016667 1.87201 -0.105653 1.29208 0.11338 0.795364C0.33242 0.298644 0.83074 -0.0156827 1.37337 0.000603968C2.09408 0.0222373 2.66703 0.612897 2.6667 1.33394ZM2.7067 3.65394H0.0400333V12.0006H2.7067V3.65394ZM6.92005 3.65394H4.2667V12.0006H6.89338V7.62058C6.89338 5.18058 10.0734 4.95392 10.0734 7.62058V12.0006H12.7067V6.71392C12.7067 2.6006 8.00005 2.75394 6.89338 4.77392L6.92005 3.65394Z" fill="#B1B1B1" />
                  </svg>
                </button>
                <button
                  onClick={() => handleSocialShare("x")}
                  className="display-flex align-items-center justify-content-center cursor-pointer background-transparent border-none"
                  type="button"
                >
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3827 0L7.05161 3.80783L4.17145 0H0L4.98422 6.51747L0.260333 11.9167H2.28311L5.92901 7.75073L9.11535 11.9167H13.1835L7.98781 5.0478L12.4043 0H10.3827ZM9.67328 10.7067L2.36072 1.14645H3.56278L10.7934 10.7067H9.67328Z" fill="#B1B1B1" />
                  </svg>
                </button>
                <button
                  onClick={() => handleSocialShare("facebook")}
                  className="display-flex align-items-center justify-content-center cursor-pointer background-transparent border-none"
                  type="button"
                >
                  <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.66667 7.66667H6.33333L7 5H4.66667V3.66667C4.66667 2.98041 4.66667 2.33333 6 2.33333H7V0.0934C6.78287 0.0645667 5.962 0 5.09527 0C3.2856 0 2 1.10457 2 3.13314V5H0V7.66667H2V13.3333H4.66667V7.66667Z" fill="#B1B1B1" />
                  </svg>
                </button>
                <button
                  onClick={() => handleSocialShare("youtube")}
                  className="display-flex align-items-center justify-content-center cursor-pointer background-transparent border-none"
                  type="button"
                >
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.82927 0C7.18533 0.00196 8.0762 0.0105734 9.02273 0.0484867L9.35833 0.0631199C10.3113 0.10824 11.2635 0.18532 11.7358 0.317C12.3657 0.493967 12.8609 1.01033 13.0282 1.66488C13.2947 2.70427 13.328 4.73293 13.3321 5.22387L13.3327 5.3256V5.33273C13.3327 5.33273 13.3327 5.3352 13.3327 5.33993L13.3321 5.44167C13.328 5.9326 13.2947 7.96127 13.0282 9.00067C12.8585 9.6576 12.3634 10.174 11.7358 10.3485C11.2635 10.4802 10.3113 10.5573 9.35833 10.6024L9.02273 10.617C8.0762 10.6549 7.18533 10.6635 6.82927 10.6655L6.673 10.6661H6.66607C6.66607 10.6661 6.66373 10.6661 6.65913 10.6661L6.503 10.6655C5.7494 10.6614 2.59848 10.6273 1.59634 10.3485C0.9664 10.1715 0.47128 9.6552 0.303913 9.00067C0.0374666 7.96127 0.00416 5.9326 0 5.44167V5.22387C0.00416 4.73293 0.0374666 2.70427 0.303913 1.66488C0.4736 1.00791 0.96872 0.491547 1.59634 0.317C2.59848 0.0381534 5.7494 0.00414667 6.503 0H6.82927ZM5.33274 2.99943V7.66607L9.33273 5.33273L5.33274 2.99943Z" fill="#B1B1B1" />
                  </svg>
                </button>
              </div>
            </div>

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
          <div className="display-flex align-items-baseline gap-8 margin-bottom-10">
            <span className="manrope font-600 size-24 ProductDetails-price">${product.price.toFixed(2)}</span>
            <span className="manrope font-400 size-16 color-deep-forest-green">($ 200.21 / Kg)</span>
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

          <p className={`manrope font-600 size-28 ProductDetails-stock ${product.inStock ? "in-stock" : "out-of-stock"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <div className="display-flex flex-direction-column gap-12 ProductDetails-actions">
            <div className="display-flex align-items-center overflow-hidden ProductDetails-qty-control">
              <button onClick={handleIncrease} className="display-flex align-items-center justify-content-center border-none background-transparent cursor-pointer transition height-100 width-100 ProductDetails-qty-btn" aria-label="Increase">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.99998 7.00002L16 7.00004L16 9.00002L8.99998 9L9.00005 16L7.00007 16L7 9L3.56772e-05 8.99997L2.11787e-05 6.99998L7 7.00002L7 -2.64733e-06L9 4.77051e-06L8.99998 7.00002Z" fill="#58585A" />
                </svg>
              </button>
              <span className="manrope font-400 size-16 color-black-black text-align-center ProductDetails-qty-count">{selectedQty}</span>
              <button onClick={handleDecrease} className="display-flex align-items-center justify-content-center border-none background-transparent cursor-pointer transition height-100 width-100 ProductDetails-qty-btn" aria-label="Decrease">
                <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0V2H14V0H0Z" fill="#58585A" />
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
              className={`manrope font-400 size-24 ProductDetails-tab ${activeTab === tab ? "active" : ""}`}
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
                <p className="manrope font-400 size-16 color-black-black ProductDetails-description-p">Happy Knights for Men is a herbal wellness supplement specially formulated to support men’s vitality, stamina, and overall reproductive wellness. Crafted with a blend of carefully selected traditional herbs and natural ingredients, this supplement is designed to promote daily energy, physical endurance, and overall male well-being. It works by helping men maintain an active lifestyle while supporting strength, performance, and long-term wellness.</p>
                <p className="manrope font-400 size-16 color-black-black ProductDetails-description-p">The herbal formulation is developed to assist in maintaining energy levels, improving stamina, and enhancing overall vitality, making it suitable for men looking to support their physical performance and everyday confidence. By combining natural botanical ingredients known for their traditional wellness benefits, Happy Knights for Men aims to promote balance, endurance, and overall health without relying on harsh synthetic components.</p>
                <p className="manrope font-400 size-16 color-black-black ProductDetails-description-p">Regular use as part of a healthy lifestyle may help support men’s wellness goals by contributing to physical resilience, active performance, and general vitality. Designed for modern lifestyles, Happy Knights for Men provides a natural wellness approach for men seeking to maintain their strength, stamina, and overall reproductive health.</p>
              </div>

              <div className="ProductDetails-description-second-row">
                <div>
                  <h6 className="manrope font-600 size-20 color-deep-forest-green">Key benefits</h6>
                  <ul>
                    <li className="manrope font-400 size-16 color-black-black">Supports libido and male vitality</li>
                    <li className="manrope font-400 size-16 color-black-black">Helps maintain healthy blood circulation </li>
                    <li className="manrope font-400 size-16 color-black-black">Promotes overall sexual wellness</li>
                    <li className="manrope font-400 size-16 color-black-black">Supports energy and stamina</li>
                    <li className="manrope font-400 size-16 color-black-black">Helps reduce fatigue and general weakness</li>
                    <li className="manrope font-400 size-16 color-black-black">Supports reproductive health</li>
                    <li className="manrope font-400 size-16 color-black-black">Helps maintain physical endurance</li>
                    <li className="manrope font-400 size-16 color-black-black">Supports overall immunity and wellness</li>
                    <li className="manrope font-400 size-16 color-black-black">Promotes vigor and vitality</li>
                    <li className="manrope font-400 size-16 color-black-black">Helps support healthy sperm quality</li>
                  </ul>
                </div>

                <div>
                  <h6 className="manrope font-600 size-20 color-deep-forest-green">Key Herbal Ingredients</h6>
                  <p className="manrope font-400 size-16 color-black-black">Korean Red Ginseng <br />
                    Ashwagandha (Withania somnifera) <br />
                    Royal Jelly<br />
                    Safed Musali (Chlorophytum borivilianum) <br />
                    Siyah Musali (Curculigo orchioides) <br />
                    Gokhru (Tribulus terrestris) <br />
                    Vidarikand (Pueraria tuberosa) <br />
                    Satawar (Asparagus racemosus) <br />
                    Giloy (Tinospora cordifolia) <br />
                    Shilajit <br />
                    Zafran (Crocus sativus) <br />
                    Ginger (Zingiber officinalis) <br />
                    Kamarkas (Butea monosperma) <br />
                    Kaunch Beej <br />
                    Elaichi <br />
                    Maghz-E-Chilgoza <br />
                    Mastagi</p>
                </div>


                <div>
                  <h6 className="manrope font-600 size-20 color-deep-forest-green">Herbal Ingredient Benefits</h6>
                  <p className="manrope font-600 size-16 color-black-black">Korean Red Ginseng <br /> <span className="manrope size-16 color-black-black font-400">Supports energy, stamina, circulation, and vitality.</span></p>
                  <p className="manrope font-600 size-16 color-black-black">Ashwagandha <br /> <span className="manrope size-16 color-black-black font-400">Traditionally used to support stress management and endurance.</span></p>
                  <p className="manrope font-600 size-16 color-black-black">Royal Jelly <br /> <span className="manrope size-16 color-black-black font-400">Supports vitality and overall wellness.</span></p>
                  <p className="manrope font-600 size-16 color-black-black">Safed Musali <br /> <span className="manrope size-16 color-black-black font-400">Traditionally used for stamina and physical strength.</span></p>
                  <p className="manrope font-600 size-16 color-black-black">Gokhru <br /> <span className="manrope size-16 color-black-black font-400">Helps support men's vitality and performance.</span></p>
                  <p className="manrope font-600 size-16 color-black-black">Shilajit <br /> <span className="manrope size-16 color-black-black font-400">Supports energy and overall wellness.</span></p>
                  <p className="manrope font-600 size-16 color-black-black">Giloy <br /> <span className="manrope size-16 color-black-black font-400">Traditionally used to support immunity.</span></p>
                  <p className="manrope font-600 size-16 color-black-black">Ginger <br /> <span className="manrope size-16 color-black-black font-400">Supports circulation and digestive wellness.</span></p>
                </div>
              </div>

              <hr className="ProductDetails-description-hr" />

              <div className="display-grid ProductDetails-description-third-row">
                <div>
                  <h6 className="manrope font-600 size-20 color-deep-forest-green">Specifications</h6>
                  <p className="manrope font-400 size-16 color-black-black">Form: Herbal Powder</p>
                  <p className="manrope font-400 size-16 color-black-black">Category: Men's Wellness Supplement</p>
                  <p className="manrope font-400 size-16 color-black-black">Suitable For: Adult Men</p>
                  <p className="manrope font-400 size-16 color-black-black">Serving Size: 5 gm</p>
                  <p className="manrope font-400 size-16 color-black-black">Storage: Store in a cool, dry place</p>
                  <p className="manrope font-400 size-16 color-black-black">Usage Type: Oral Consumption</p>
                </div>

                <div>
                  <h6 className="manrope font-600 size-20 color-deep-forest-green">Other Ingredients</h6>
                  <p className="manrope font-400 size-16 color-black-black">Natural herbal extracts, botanical ingredients, and approved excipients.</p>
                  <p className="manrope font-600 size-16 color-black-black">Allergen Information:</p>
                  <p className="manrope font-400 size-16 color-black-black">Manufactured in a facility that may process nuts, dairy, soy, wheat, sesame, or gluten-containing ingredients</p>
                </div>

                <div>
                  <h6 className="manrope font-600 size-20 color-deep-forest-green">Suggested Use</h6>
                  <ul>
                    <li className="manrope font-400 size-16 color-black-black">Mix 1 teaspoon (5 gm) with cold milk and chew as directed.</li>
                    <ul>
                      <li className="manrope font-400 size-16 color-black-black">Consume before food or at least 2 hours after meals.</li>
                      <li className="manrope font-400 size-16 color-black-black">Use regularly for best results.</li>
                      <li className="manrope font-400 size-16 color-black-black">Follow physician guidance where applicable.</li>
                    </ul>
                  </ul>
                </div>

              </div>

              <hr className="ProductDetails-description-hr" />

              <div className="ProductDetails-description-fourth-row">
                <div>
                  <h6 className="manrope font-600 size-20 color-deep-forest-green">Key Herbal Ingredients</h6>
                  <p className="manrope font-400 size-16 color-black-black">Serving Size: 5 gm (1 Teaspoon) <br />
                    Serving Size: 5 gm (1 Servings Per Container: As mentioned on pack)</p>
                </div>

                <div>
                  <h6 className="manrope font-600 size-20 color-deep-forest-green">Indications</h6>
                  <p className="manrope font-400 size-16 color-black-black">Traditionally used to support:</p>
                  <ul>
                    <ul>
                      <li className="manrope font-400 size-16 color-black-black">Male vitality</li>
                      <li className="manrope font-400 size-16 color-black-black">Physical stamina</li>
                      <li className="manrope font-400 size-16 color-black-black">Energy levels</li>
                      <li className="manrope font-400 size-16 color-black-black">General wellness</li>
                      <li className="manrope font-400 size-16 color-black-black">Reproductive wellness</li>
                      <li className="manrope font-400 size-16 color-black-black">Immune health</li>
                    </ul>
                  </ul>
                </div>

                <div>
                  <h6 className="manrope font-600 size-20 color-deep-forest-green">Warnings</h6>
                  <ul>
                    <li className="manrope font-400 size-16 color-black-black">Read the label carefully before use.</li>
                    <li className="manrope font-400 size-16 color-black-black">Do not exceed recommended usage.</li>
                    <li className="manrope font-400 size-16 color-black-black">Keep out of reach of children.</li>
                    <li className="manrope font-400 size-16 color-black-black">Store in a cool and dry place.</li>
                    <li className="manrope font-400 size-16 color-black-black">If you are under medical supervision, consult a healthcare professional before use.</li>
                  </ul>
                  <p className="manrope font-600 size-16 color-black-black">Do not use if safety seal is broken or missing.</p>
                </div>
              </div>


              <div className="ProductDetails-description-disclaimer">
                <h6 className="manrope font-600 size-20 color-deep-forest-green">Disclaimer</h6>
                <p className="manrope font-400 size-16 color-black-black">This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary. Herbal supplements should be used as part of a balanced lifestyle and healthy diet.</p>
              </div>

              <hr className="ProductDetails-description-hr" />
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="ProductDetails-reviews">
              <div className="ProductDetails-reviews-sub">
                <p className="manrope font-500 size-20 color-deep-forest-green ProductDetails-reviews-empty">
                  No reviews yet. Be the first to review this product.
                </p>
              </div>

              <hr className="ProductDetails-description-hr" />
            </div>
          )}
        </div>
      </div >


      {
        recommended.length > 0 && (
          <section className="ProductDetails-section">
            <h2 className="playfair_display font-600 size-48 ProductDetails-section-title">Recommended Products</h2>
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
          <section className="ProductDetails-section">
            <h2 className="playfair_display font-600 size-48 ProductDetails-section-title">More to Explore</h2>
            <div className="ProductDetails-grid">
              {moreToExplore.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )
      }

    </div >
  );
}