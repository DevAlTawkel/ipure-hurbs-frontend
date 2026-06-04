import { DUMMY_PRODUCTS } from '@/store/useProductStore' // export it first
import ProductHomePage from './ProductHomePage'

export async function generateStaticParams() {
    return DUMMY_PRODUCTS.map((product) => ({
        slug: product.slug,
    }));
}

const page = async ({ params }) => {
    return <ProductHomePage slug={params.slug} />
}

export default page