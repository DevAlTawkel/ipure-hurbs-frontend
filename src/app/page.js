export const metadata = {
  metadataBase: new URL("https://ipureherbs.org"),

  title: "iPure Herbs | Pure Natural Herbal Wellness Products",

  description:
    "Premium herbal wellness products for energy, vitality, confidence, and everyday natural balance. Ayurvedic-inspired formulas delivered globally.",

  keywords: [
    "iPure Herbs",
    "herbal wellness",
    "Ayurveda",
    "natural supplements",
    "herbal products",
    "men's health",
    "women's health",
    "immunity support",
    "stress relief",
    "natural vitality",
    "herbal remedies",
    "wellness products",
    "US herbal supplements",
    "UK herbal supplements",
    "European wellness products",
  ],

  alternates: {
    canonical: "https://ipureherbs.org",
  },

  openGraph: {
    title: "iPure Herbs | Pure Natural Herbal Wellness Products",
    description:
      "Premium herbal wellness products for energy, vitality, confidence, and everyday natural balance. Ayurvedic-inspired formulas delivered globally.",
    url: "https://ipureherbs.org",
    siteName: "iPure Herbs | Pure Natural Herbal Wellness Products",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/company-logo.png",
        width: 1125,
        height: 1125,
        alt: "iPure Herbs",
      },
    ],
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "iPure Herbs | Pure Natural Herbal Wellness Products",
  //   description:
  //     "Premium herbal wellness products for energy, vitality, confidence, and everyday natural balance. Ayurvedic-inspired formulas delivered globally.",
  //   images: ["/company-logo.png"],
  // },

  // robots: {
  //   index: true,
  //   follow: true,
  // },

  category: "Health & Wellness",
};


import HomePage from "./HomePage";

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
