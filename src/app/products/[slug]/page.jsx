// app/products/[slug]/page.js

import ProductDetails from "./ProductDetails";
import productService from "@/services/productService";

export async function generateStaticParams() {
  try {
    const response = await productService.getAll({ per_page: 100 });
    return (response.data ?? []).map((product) => ({ slug: product.slug }));
  } catch (err) {
    console.error("generateStaticParams failed:", err);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params; // ← await like your working code
    const response = await productService.getBySlug(slug);
    const p = response.data;

    return {
      title: p.seo?.title || `${p.name} | iPure Herbs`,
      description: p.seo?.description || p.short_description,
      keywords: (p.tags?.[0] ?? "").split(",").map((t) => t.trim()).filter(Boolean),
      alternates: {
        canonical: `https://www.ipureherbs.com/products/${p.slug}`,
      },
      openGraph: {
        title: p.seo?.title || p.name,
        description: p.seo?.description || p.short_description,
        url: `https://www.ipureherbs.com/products/${p.slug}`,
        type: "website",
        images: [
          {
            url: p.image_url ?? p.images?.[0]?.url ?? "https://www.ipureherbs.com/logo.webp",
            width: 800,
            height: 800,
            alt: p.name,
          },
        ],
        locale: "en_US",
      },
    };
  } catch {
    return {
      title: "Product Not Found | iPure Herbs",
    };
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params; // ← await like your working code
  return <ProductDetails slug={slug} />;
}