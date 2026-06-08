// import { DUMMY_PRODUCTS } from '@/store/useProductStore' // export it first
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

const page = async ({ params }) => {
    return <ProductHomePage slug={params.slug} />
}

export default page