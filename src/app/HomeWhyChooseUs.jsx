import React from 'react'
import './HomeWhyChooseUs.css'

const HomeWhyChooseUs = () => {
    return (
        <div className='position-relative HomeWhyChooseUs-main-container'>
            <picture>
                <source media="(max-width: 550px)" srcSet="/assets/HomeWhyChooseUs-main-banner_550.webp" />
                <source media="(max-width: 1000px)" srcSet="/assets/HomeWhyChooseUs-main-banner_1000.webp" />
                <img src="/assets/HomeWhyChooseUs-main-banner.webp" alt="" />
            </picture>
            <div className='position-absolute HomeWhyChooseUs-content-container'>
                <div className='position-relative'>
                    <div className='HomeWhyChooseUs-titles-container'>
                        <p className='manrope font-600 size-20 color-dfg-200'>Our Promise</p>
                        <h2 className='playfair_display font-600 size-32 color-deep-forest-green'>Why Choose Us?</h2>
                    </div>
                    <div className='display-grid HomeWhyChooseUs-content-main-container'>
                        <div className='HomeWhyChooseUs-card'>
                            <div className='display-flex gap-10 HomeWhyChooseUs-header-container'>
                                <div className='display-flex transition align-items-center justify-content-center HomeWhyChooseUs-icon-container'>
                                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.78307 1.82598L9 0L17.2169 1.82598C17.6745 1.92766 18 2.33347 18 2.80217V12.7889C18 14.795 16.9974 16.6684 15.3282 17.7812L9 22L2.6718 17.7812C1.00261 16.6684 0 14.795 0 12.7889V2.80217C0 2.33347 0.32553 1.92766 0.78307 1.82598ZM2 3.60434V12.7889C2 14.1263 2.6684 15.3752 3.7812 16.1171L9 19.5963L14.2188 16.1171C15.3316 15.3752 16 14.1263 16 12.7889V3.60434L9 2.04879L2 3.60434Z" fill="#F4F4F4" />
                                    </svg>
                                </div>
                                <p className='manrope font-700 size-24 color-deep-forest-green'>Clinically Tested</p>
                            </div>
                            <p className='manrope font-400 size-18 color-black-black'>Every product is third-party tested and meets international safety standards.</p>
                        </div>
                        <div className='HomeWhyChooseUs-card'>
                            <div className='display-flex gap-10 HomeWhyChooseUs-header-container'>
                                <div className='display-flex transition align-items-center justify-content-center HomeWhyChooseUs-icon-container'>
                                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.6116 14.0338L18.8137 14.7551C19.0504 14.8972 19.1272 15.2043 18.9852 15.4411C18.9429 15.5115 18.884 15.5704 18.8137 15.6126L10.0427 20.8751C9.72602 21.0652 9.33042 21.0652 9.01372 20.8751L0.242831 15.6126C0.00604129 15.4705 -0.0707487 15.1634 0.0713313 14.9266C0.113551 14.8562 0.172451 14.7973 0.242831 14.7551L1.44492 14.0338L9.52822 18.8838L17.6116 14.0338ZM17.6116 9.33376L18.8137 10.0551C19.0504 10.1972 19.1272 10.5043 18.9852 10.7411C18.9429 10.8115 18.884 10.8704 18.8137 10.9126L9.52822 16.4838L0.242831 10.9126C0.00604129 10.7705 -0.0707487 10.4634 0.0713313 10.2266C0.113551 10.1562 0.172451 10.0973 0.242831 10.0551L1.44492 9.33376L9.52822 14.1838L17.6116 9.33376ZM10.0427 0.1425L18.8137 5.40506C19.0504 5.54713 19.1272 5.85426 18.9852 6.09105C18.9429 6.16143 18.884 6.22033 18.8137 6.26255L9.52822 11.8338L0.242831 6.26255C0.00604129 6.12048 -0.0707487 5.81335 0.0713313 5.57656C0.113551 5.50618 0.172451 5.44729 0.242831 5.40506L9.01372 0.1425C9.33042 -0.0475 9.72602 -0.0475 10.0427 0.1425ZM9.52822 2.16619L3.41555 5.83381L9.52822 9.50146L15.6409 5.83381L9.52822 2.16619Z" fill="#F4F4F4" />
                                    </svg>
                                </div>
                                <p className='manrope font-700 size-24 color-deep-forest-green'>100% Natural</p>
                            </div>
                            <p className='manrope font-400 size-18 color-black-black'>Sourced from nature - no artificial fillers, no hidden chemicals, ever.</p>
                        </div>

                        <div className='HomeWhyChooseUs-card'>
                            <div className='display-flex gap-10 HomeWhyChooseUs-header-container'>
                                <div className='display-flex transition align-items-center justify-content-center HomeWhyChooseUs-icon-container'>
                                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.96456 13C7.72194 14.6961 6.26324 16 4.5 16C2.73676 16 1.27806 14.6961 1.03544 13H0V1C0 0.44772 0.44772 0 1 0H15C15.5523 0 16 0.44772 16 1V3H19L22 7.0557V13H19.9646C19.7219 14.6961 18.2632 16 16.5 16C14.7368 16 13.2781 14.6961 13.0354 13H7.96456ZM14 2H2V10.0505C2.63526 9.4022 3.52066 9 4.5 9C5.8962 9 7.10145 9.8175 7.66318 11H13.3368C13.5045 10.647 13.7296 10.3264 14 10.0505V2ZM16 8H20V7.715L17.9917 5H16V8ZM16.5 14C17.1531 14 17.7087 13.5826 17.9146 13C17.9699 12.8436 18 12.6753 18 12.5C18 11.6716 17.3284 11 16.5 11C15.6716 11 15 11.6716 15 12.5C15 12.6753 15.0301 12.8436 15.0854 13C15.2913 13.5826 15.8469 14 16.5 14ZM6 12.5C6 11.6716 5.32843 11 4.5 11C3.67157 11 3 11.6716 3 12.5C3 12.6753 3.03008 12.8436 3.08535 13C3.29127 13.5826 3.84689 14 4.5 14C5.15311 14 5.70873 13.5826 5.91465 13C5.96992 12.8436 6 12.6753 6 12.5Z" fill="#F4F4F4" />
                                    </svg>
                                </div>
                                <p className='manrope font-700 size-24 color-deep-forest-green'>Fast Delivery</p>
                            </div>
                            <p className='manrope font-400 size-18 color-black-black'>Seamless order delivery with real-time tracking updates.</p>
                        </div>
                        <div className='HomeWhyChooseUs-card'>
                            <div className='display-flex gap-10 HomeWhyChooseUs-header-container'>
                                <div className='display-flex transition align-items-center justify-content-center HomeWhyChooseUs-icon-container'>
                                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.90381 1.90381C4.32776 -0.520142 8.18984 -0.629441 10.7435 1.57591C13.2955 -0.629441 17.1576 -0.520142 19.5815 1.90381C22.0011 4.32342 22.1143 8.17606 19.9212 10.7298L12.1569 18.5209C11.4113 19.2664 10.2236 19.3003 9.43788 18.6225L9.32848 18.5209L1.56409 10.7298C-0.629042 8.17606 -0.515802 4.32342 1.90381 1.90381ZM3.31802 3.31802C1.61087 5.02517 1.5621 7.76266 3.1717 9.52876L3.31802 9.68196L10.7427 17.1066L16.0453 11.8026L12.5104 8.26776L11.4498 9.32846C10.2782 10.5 8.37868 10.5 7.20711 9.32846C6.03554 8.15686 6.03554 6.25736 7.20711 5.08579L9.30828 2.98329C7.5956 1.61219 5.11344 1.67499 3.47128 3.17169L3.31802 3.31802ZM11.8033 6.14645C12.1938 5.75592 12.827 5.75592 13.2175 6.14645L17.4595 10.3884L18.1673 9.68196C19.9246 7.92466 19.9246 5.07538 18.1673 3.31802C16.4601 1.61087 13.7226 1.5621 11.9566 3.17169L11.8033 3.31802L8.62132 6.5C8.25869 6.86263 8.23279 7.43448 8.54362 7.82696L8.62132 7.91426C8.98398 8.27686 9.55578 8.30276 9.94828 7.99196L10.0356 7.91426L11.8033 6.14645Z" fill="#F4F4F4" />
                                    </svg>
                                </div>
                                <p className='manrope font-700 size-24 color-deep-forest-green'>Expert Curated</p>
                            </div>
                            <p className='manrope font-400 size-18 color-black-black'>Handpicked by nutritionists and wellness professionals, not algorithms.</p>
                        </div>
                        {/* <div className='display-grid flex-direction-column HomeWhyChooseUs-content-main-left'>

                        </div>
                        <div className='display-grid flex-direction-column HomeWhyChooseUs-content-main-right'>

                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeWhyChooseUs