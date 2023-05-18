import '../../css/products.css'

import Header from "../Header"
import ProductNav from './ProductNav'
import ProductList from './ProductList'

export default function Products({ API_URL }) {
    return (
        <>
            <Header />
            <ProductNav />
            <ProductList API_URL={API_URL} />
        </>
    )
}
