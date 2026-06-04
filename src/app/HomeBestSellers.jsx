"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "@/components/ProductCard";
import './HomeBestSellers.css'
import Link from "next/link";

function getBestSellers(allProducts = []) {
    return [...allProducts]
        .filter((p) => {
            const isBestSeller =
                p.category?.toLowerCase() === "best seller" ||
                p.tab?.toLowerCase() === "best seller" ||
                p.tags?.some((t) => t.toLowerCase() === "best seller");

            return isBestSeller || (!isBestSeller && p.rating >= 4.5);
        })
        .sort((a, b) => {
            const ratingDiff = (b.rating ?? 0) - (a.rating ?? 0);
            if (ratingDiff !== 0) return ratingDiff;
            return (b.reviews ?? b.sold ?? 0) - (a.reviews ?? a.sold ?? 0);
        })
        .slice(0, 4);
}

const HomeBestSellers = () => {
    const { products, isLoading, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    const bestSellers = getBestSellers(products);

    return (
        <div className='overflow-hidden'>
            <p className='playfair_display font-600 size-32 color-deep-forest-green text-align-center user-select-none HomeBestSellers-title'>Best Sellers</p>
            <p className='manrope font-400 size-18 color-dfg-200 text-align-center margin-left-auto margin-right-auto HomeBestSellers--sub-title'>
                Our community's most loved wellness products — trusted, reviewed, and restocked daily.
            </p>

            <div className="HomeBestSellers-cards-main-container">
                <div className='display-flex align-items-flex-end justify-content-flex-end'>
                    <Link href={'/products'} className="manrope font-600 size-24 color-white-200 display-flex align-items-center gap-10 justify-content-flex-end HomeBestSellers-cards-viewmore">
                        View more
                        <div className="display-flex align-items-center justify-content-center border-radius-100 HomeBestSellers-arrow-container">
                            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.36356 8.00006L0 1.77776L1.81817 8.742e-07L10 8.00006L1.81817 16L0 14.2222L6.36356 8.00006Z" fill="white" />
                            </svg>
                        </div>
                    </Link>
                </div>
                <div className='display-grid HomeBestSellers-cards-container'>

                    {isLoading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="Products-skeleton">
                                <div className="Products-skeleton-img" />
                                <div className="Products-skeleton-body">
                                    <div className="Products-skeleton-line short" />
                                    <div className="Products-skeleton-line medium" />
                                    <div className="Products-skeleton-line long" />
                                </div>
                            </div>
                        ))
                        : bestSellers.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default HomeBestSellers;