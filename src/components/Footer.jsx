import React from 'react'
import './Footer.css'
import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  "Our Mission & Vision": [
    { name: "About Us", href: "/about" },
    { name: "Store Reviews", href: "/reviews" },
    { name: "iPure Herbs Quality", href: "/quality" },
    { name: "Our Promise", href: "/promise" },
    { name: "100% Natural", href: "/natural" },
    { name: "Sustainably Sourced", href: "/sustainably-sourced" },
    { name: "Lab Tested", href: "/lab-tested" },
  ],
  "Shop": [
    { name: "Men's Health Enhancer", href: "/shop/mens-health" },
    { name: "Women's Health Enhancer", href: "/shop/womens-health" },
    { name: "Digestive Health Enhancer", href: "/shop/digestive-health" },
    { name: "Diabetic Care", href: "/shop/diabetic-care" },
    { name: "Heart Care", href: "/shop/heart-care" },
    { name: "Kidney Care", href: "/shop/kidney-care" },
    { name: "All Products", href: "/products" },
  ],
  "Learn": [
    { name: "Men's Health", href: "/learn/mens-health" },
    { name: "Women's Health", href: "/learn/womens-health" },
    { name: "Herbal Guide", href: "/learn/herbal-guide" },
    { name: "Research", href: "/learn/research" },
    { name: "All Articles", href: "/learn" },
  ],
  "Let Us Help You": [
    { name: "Account", href: "/account" },
    { name: "Help", href: "/help" },
    { name: "Shipping & Delivery", href: "/shipping" },
    { name: "Return & Replacement", href: "/returns" },
    { name: "Track Order", href: "/track-order" },
    { name: "Frequently Asked Questions", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ],
}

const socialLinks = [
  {
    name: "Instagram", href: "https://instagram.com", icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.0271 0C12.1525 0.00186 12.7228 0.00782002 13.2156 0.02249L13.4097 0.0288301C13.6339 0.0368 13.8551 0.0467999 14.1218 0.0592999C15.1859 0.10847 15.9118 0.2768 16.5493 0.5243C17.2084 0.77847 17.7651 1.1218 18.3209 1.67764C18.8759 2.23347 19.2193 2.7918 19.4743 3.4493C19.7209 4.08597 19.8893 4.81264 19.9393 5.8768C19.9512 6.14347 19.9608 6.36467 19.9687 6.58891L19.975 6.783C19.9896 7.27574 19.9963 7.84613 19.9984 8.97157L19.9992 9.71717C19.9993 9.80827 19.9993 9.90227 19.9993 9.99927L19.9992 10.2814L19.9986 11.0271C19.9967 12.1525 19.9908 12.7229 19.9761 13.2156L19.9697 13.4097C19.9618 13.634 19.9518 13.8552 19.9393 14.1218C19.8901 15.186 19.7209 15.9118 19.4743 16.5493C19.2201 17.2085 18.8759 17.7652 18.3209 18.321C17.7651 18.876 17.2059 19.2193 16.5493 19.4743C15.9118 19.721 15.1859 19.8893 14.1218 19.9393C13.8551 19.9512 13.6339 19.9609 13.4097 19.9687L13.2156 19.975C12.7228 19.9897 12.1525 19.9963 11.0271 19.9985L10.2814 19.9993C10.1903 19.9993 10.0963 19.9993 9.99932 19.9993H9.71722L8.97152 19.9986C7.84612 19.9968 7.27574 19.9908 6.78299 19.9761L6.58891 19.9698C6.36466 19.9618 6.14346 19.9518 5.8768 19.9393C4.81263 19.8902 4.08763 19.721 3.4493 19.4743C2.79096 19.2202 2.23346 18.876 1.67763 18.321C1.1218 17.7652 0.7793 17.206 0.5243 16.5493C0.2768 15.9118 0.1093 15.186 0.0593002 14.1218C0.0474202 13.8552 0.03773 13.634 0.02988 13.4097L0.0235901 13.2156C0.00896009 12.7229 0.00229018 12.1525 0.000130177 11.0271L0 8.97157C0.00186 7.84613 0.00781001 7.27574 0.02248 6.783L0.0288301 6.58891C0.0368 6.36467 0.0468002 6.14347 0.0593002 5.8768C0.10846 4.8118 0.2768 4.0868 0.5243 3.4493C0.77846 2.79097 1.1218 2.23347 1.67763 1.67764C2.23346 1.1218 2.7918 0.7793 3.4493 0.5243C4.0868 0.2768 4.8118 0.1093 5.8768 0.0592999C6.14346 0.0474299 6.36466 0.0377401 6.58891 0.0298901L6.78299 0.0235999C7.27574 0.00895986 7.84612 0.00228994 8.97152 0.000129938L11.0271 0ZM9.99932 4.9993C7.2364 4.9993 4.9993 7.23883 4.9993 9.99927C4.9993 12.7622 7.23883 14.9993 9.99932 14.9993C12.7622 14.9993 14.9993 12.7598 14.9993 9.99927C14.9993 7.2364 12.7597 4.9993 9.99932 4.9993ZM9.99932 6.9993C11.6562 6.9993 12.9993 8.34197 12.9993 9.99927C12.9993 11.6562 11.6566 12.9993 9.99932 12.9993C8.34242 12.9993 6.9993 11.6567 6.9993 9.99927C6.9993 8.34237 8.34192 6.9993 9.99932 6.9993ZM15.2493 3.4993C14.56 3.4993 13.9993 4.05921 13.9993 4.74845C13.9993 5.4377 14.5592 5.99847 15.2493 5.99847C15.9385 5.99847 16.4993 5.43857 16.4993 4.74845C16.4993 4.05921 15.9376 3.49844 15.2493 3.4993Z" fill="#F4F4F4" />
      </svg>

    )
  },
  {
    name: "LinkedIn", href: "https://linkedin.com", icon: (
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.00005 2.00091C3.99968 2.81522 3.50565 3.548 2.75091 3.85371C1.99617 4.15943 1.13144 3.97703 0.56447 3.39253C-0.00250006 2.80802 -0.15848 1.93813 0.17007 1.19305C0.49863 0.447966 1.24611 -0.023524 2.06005 0.000905952C3.14112 0.033356 4.00054 0.919346 4.00005 2.00091ZM4.06005 5.48091H0.0600499V18.0009H4.06005V5.48091ZM10.3801 5.48091H6.40005V18.0009H10.3401V11.4309C10.3401 7.77088 15.1101 7.43088 15.1101 11.4309V18.0009H19.0601V10.0709C19.0601 3.90091 12.0001 4.13091 10.3401 7.16088L10.3801 5.48091Z" fill="#F4F4F4" />
      </svg>
    )
  },
  {
    name: "X", href: "https://x.com", icon: (
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5741 0L10.5774 5.71175L6.25717 0H0L7.47633 9.7762L0.3905 17.875H3.42467L8.89352 11.6261L13.673 17.875H19.7752L11.9817 7.5717L18.6065 0H15.5741ZM14.5099 16.06L3.54108 1.71967H5.34417L16.1901 16.06H14.5099Z" fill="#F4F4F4" />
      </svg>
    )
  },
  {
    name: "Facebook", href: "https://facebook.com", icon: (
      <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 11.5H9.5L10.5 7.5H7V5.5C7 4.47062 7 3.5 9 3.5H10.5V0.1401C10.1743 0.09685 8.943 0 7.6429 0C4.9284 0 3 1.65686 3 4.69971V7.5H0V11.5H3V20H7V11.5Z" fill="#F4F4F4" />
      </svg>
    )
  },
  {
    name: "YouTube", href: "https://youtube.com", icon: (
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.2439 0C10.778 0.00294 12.1143 0.0158601 13.5341 0.0727301L14.0375 0.0946798C15.467 0.16236 16.8953 0.27798 17.6037 0.4755C18.5486 0.74095 19.2913 1.5155 19.5423 2.49732C19.942 4.05641 19.992 7.0994 19.9982 7.8358L19.9991 7.9884V7.9991C19.9991 7.9991 19.9991 8.0028 19.9991 8.0099L19.9982 8.1625C19.992 8.8989 19.942 11.9419 19.5423 13.501C19.2878 14.4864 18.5451 15.261 17.6037 15.5228C16.8953 15.7203 15.467 15.8359 14.0375 15.9036L13.5341 15.9255C12.1143 15.9824 10.778 15.9953 10.2439 15.9983L10.0095 15.9991H9.9991C9.9991 15.9991 9.9956 15.9991 9.9887 15.9991L9.7545 15.9983C8.6241 15.9921 3.89772 15.941 2.39451 15.5228C1.4496 15.2573 0.70692 14.4828 0.45587 13.501C0.0561999 11.9419 0.00624 8.8989 0 8.1625V7.8358C0.00624 7.0994 0.0561999 4.05641 0.45587 2.49732C0.7104 1.51186 1.45308 0.73732 2.39451 0.4755C3.89772 0.0572301 8.6241 0.00622 9.7545 0H10.2439ZM7.99911 4.49914V11.4991L13.9991 7.9991L7.99911 4.49914Z" fill="#F4F4F4" />
      </svg>
    )
  },
]

const Footer = () => {
  return (
    <footer className='color-white-200 Footer-main-container'>

      <div className='display-grid Footer-nav'>
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} className='Footer-nav-col'>
            <h3 className='manrope font-600 size-20 user-select-none Footer-nav-heading'>{heading}</h3>
            <ul className='display-flex flex-direction-column list-style-none Footer-nav-list'>
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className='manrope font-400 size-14 transition Footer-nav-link'>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='display-flex align-items-center justify-content-space-between Footer-middle'>
        <div className='display-flex align-items-center Footer-social'>
          <span className='color-white manrope font-600 size-20 user-select-none Footer-social-label'>Follow Us:</span>
          <div className='display-flex align-items-center Footer-social-icons'>
            {socialLinks.map((s) => (
              <a key={s.name} href={s.href} target='_blank' rel='noreferrer' aria-label={s.name} className='display-flex align-items-center justify-content-center border-radius-100 transition Footer-social-icon'>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <Link href={'/'}  className='display-flex align-items-center justify-content-center Footer-logo'>
          <img src='/assets/logo.png' alt='iPure Herbs Logo' className='object-fit-contain' />
        </Link>

        <div className='Footer-language'>
          <button className='display-flex align-items-center background-transparent cursor-pointer transition manrope size-16 font-400 color-white Footer-language-btn'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM7.71002 17.6674C6.74743 15.6259 6.15732 13.3742 6.02731 11H2.06189C2.458 14.1765 4.71639 16.7747 7.71002 17.6674ZM8.0307 11C8.1811 13.4388 8.8778 15.7297 10 17.752C11.1222 15.7297 11.8189 13.4388 11.9693 11H8.0307ZM17.9381 11H13.9727C13.8427 13.3742 13.2526 15.6259 12.29 17.6674C15.2836 16.7747 17.542 14.1765 17.9381 11ZM2.06189 9H6.02731C6.15732 6.62577 6.74743 4.37407 7.71002 2.33256C4.71639 3.22533 2.458 5.8235 2.06189 9ZM8.0307 9H11.9693C11.8189 6.56122 11.1222 4.27025 10 2.24799C8.8778 4.27025 8.1811 6.56122 8.0307 9ZM12.29 2.33256C13.2526 4.37407 13.8427 6.62577 13.9727 9H17.9381C17.542 5.8235 15.2836 3.22533 12.29 2.33256Z" fill="#F4F4F4" />
            </svg>
            English
          </button>
        </div>
      </div>

      <p className='manrope size-12 font-500 color-white-200 user-select-none Footer-copyright'>
        iPureHerbs.com © Copyright 1997–2026 iPure Herbs, LLC. All rights reserved. iPure Herb® is a registered trademark of iPure Herbs, LLC. *Disclaimer: Statements made, or products sold through this website, have not been evaluated by the United States Food and Drug Administration. They are not intended to diagnose, treat, cure or prevent any disease. PLEASE NOTE that iPure Herbs LLC is not affiliated with or in any way or manner related to websites that are not specifically iPureherbs.com. iPureHerb, LLC is not responsible or liable for products sold or shipped from unauthorized sources.{' '}
        <Link href='/disclaimer' className='align-items-center justify-content-center Footer-read-more'>
          Read More
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1714 12.0001L8.22168 7.05031L9.63589 5.63611L15.9999 12.0001L9.63589 18.364L8.22168 16.9498L13.1714 12.0001Z" fill="#F4F4F4" />
            <path d="M18.9497 12.3641L14 7.41432L15.4142 6.00012L21.7782 12.3641L15.4142 18.728L14 17.3138L18.9497 12.3641Z" fill="#F4F4F4" />
          </svg>

        </Link>
      </p>

    </footer>
  )
}

export default Footer