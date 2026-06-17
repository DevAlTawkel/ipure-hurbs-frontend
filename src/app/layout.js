import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="l7vjdxsmus730yf2l606pitakz1c4t" />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-567KQ7CG');`}
        </Script>
        

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WB2PM30FBB"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WB2PM30FBB');
          `}
        </Script>

      </head>
      <body>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-567KQ7CG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Toaster
          position="top-right"
          containerStyle={{ zIndex: 1000011 }}
          containerClassName="manrope size-16"
          toastOptions={{
            duration: 2000,
            style: {
              background: 'white',
              color: 'rgba(200, 169, 107, 1)',
              borderRadius: '8px',
              padding: '10px 16px',
              border: '1px solid rgba(200, 169, 107, 1)'
            },
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}