import React from 'react'
import './HomeAboutUs.css'
import Link from 'next/link'

const HomeAboutUs = () => {
    return (
        <div className='display-flex align-items-center justify-content-space-between HomeAboutUs-main-container'>
            <div className='position-relative width-50 HomeAboutUs-sub-container'>
                <div className='HomeAboutUs-left-grid'>
                    <div className='HomeAboutUs-image-01'>
                        <img src="/assets/HomeAboutUs_image_02.webp" alt="" className='object-fit-cover' />
                    </div>
                    <div className='HomeAboutUs-image-02'>
                        <img src="/assets/HomeAboutUs_image_01.webp" alt="" className='object-fit-cover' />
                    </div>
                    <div className='HomeAboutUs-image-03'>
                        <img src="/assets/HomeAboutUs_image_04.webp" alt="" className='object-fit-cover' />
                    </div>
                    <div className='HomeAboutUs-image-04'>
                        <img src="/assets/HomeAboutUs_image_03.webp" alt="" className='object-fit-cover' />
                    </div>
                </div>
                <div className='position-absolute HomeAboutUs-star-left'>
                    <img src="/assets/HomeAboutUs_image_star.png" alt="" />
                </div>
                <div className='position-absolute HomeAboutUs-star-right'>
                    <img src="/assets/HomeAboutUs_image_star.png" alt="" />
                </div>
            </div>
            <div className='width-50 HomeAboutUs-sub-container'>
                <div className='HomeAboutUs-titles-container'>
                    <h6 className='manrope font-600 size-20 color-dfg-200'>Who We Are</h6>
                    <h2 className='playfair_display font-600 size-48 margin-bottom-20 color-deep-forest-green'>About Us</h2>
                    <p className='manrope size-18 font-400 margin-bottom-20 color-black-black'>We are a global health and wellness community born to support you in living your best life, established in 2026. With a team of experienced Ayurvedic experts, herbalists, and scientists, iPure Herbs leads the way in delivering trusted, natural solutions for your well-being — for men and women alike.</p>
                    <p className='manrope size-18 font-400 color-black-black'>Our commitment to quality is upheld through rigorous certifications including ISO 9001, GMP, and FSSAI — ensuring purity and potency in every product.</p>
                </div>

                <div className='display-flex flex-direction-column gap-10 HomeAboutUs-cards'>
                    <div className='display-flex align-items-center gap-10 HomeAboutUs-card'>
                        <div className='border-radius-100 display-flex align-items-center justify-content-center HomeAboutUs-card-image-container'>
                            <img src="/assets/HomeAboutUs_icon_1.webp" alt="" className='object-fit-contain' />
                        </div>
                        <div className='HomeAboutUs-card-text-container'>
                            <h6 className='manrope font-600 size-20 color-deep-forest-green'>Hand Planted</h6>
                            <p className='manrope font-400 size-16 color-black-black'>Every herb is hand-harvested at peak potency from certified organic farms — no synthetics, no shortcuts.</p>
                        </div>
                    </div>
                    <div className='display-flex align-items-center gap-10 HomeAboutUs-card'>
                        <div className='border-radius-100 display-flex align-items-center justify-content-center HomeAboutUs-card-image-container'>
                            <img src="/assets/HomeAboutUs_icon_2.webp" alt="" className='object-fit-contain' />
                        </div>
                        <div className='HomeAboutUs-card-text-container'>
                            <h6 className='manrope font-600 size-20 color-deep-forest-green'>Natural Sunlight</h6>
                            <p className='manrope font-400 size-16 color-black-black'>Our plants grow exactly as nature intended — slowly, under open skies, for maximum efficacy.</p>
                        </div>
                    </div>
                    <div className='display-flex align-items-center gap-10 HomeAboutUs-card'>
                        <div className='border-radius-100 display-flex align-items-center justify-content-center HomeAboutUs-card-image-container'>
                            <img src="/assets/HomeAboutUs_icon_3.webp" alt="" className='object-fit-contain' />
                        </div>
                        <div className='HomeAboutUs-card-text-container'>
                            <h6 className='manrope font-600 size-20 color-deep-forest-green'>Clean Air</h6>
                            <p className='manrope font-400 size-16 color-black-black'>Processing in air-quality certified facilities ensures every product reaches you contaminant-free.</p>
                        </div>
                    </div>
                </div>
                <div className='display-flex justify-content-flex-end'>
                    <Link href={'/about-us'} className='color-white-200 background-warm-khali manrope font-400 size-16 HomeAboutUs-learn-more-button'>
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomeAboutUs