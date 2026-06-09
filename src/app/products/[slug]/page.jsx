// page.jsx
import ProductHomePage from './ProductHomePage'
import productService from '@/services/productService'

export async function generateStaticParams() {
    try {
        const response = await productService.getAll({ per_page: 100 })
        return (response.data ?? []).map((product) => ({
            slug: product.slug,
        }))
    } catch (err) {
        console.error('generateStaticParams failed:', err)
        return []
    }
}

export default async function page({ params }) {
    const { slug } = await params 
    
    return <ProductHomePage slug={slug} />
}