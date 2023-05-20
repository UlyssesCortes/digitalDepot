import React, { useState } from 'react';

import '../../css/products.css'
import Header from "../Header"
import ProductNav from './ProductNav'
import ProductList from './ProductList'

export default function Products({ API_URL }) {
    const [filterName, setFilterName] = useState("")

    return (
        <section className='marginReducer'>
            <Header />
            <ProductNav setFilterName={setFilterName} />
            <ProductList API_URL={API_URL} filterName={filterName} />
        </section>
    )
}
