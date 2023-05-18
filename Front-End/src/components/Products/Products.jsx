import '../../css/products.css'

import React, { useState } from 'react';

import Header from "../Header"
import ProductNav from './ProductNav'
import ProductList from './ProductList'

export default function Products({ API_URL }) {
    const [filterName, setFilterName] = useState("")

    return (
        <>
            <Header />
            <ProductNav setFilterName={setFilterName} />
            <ProductList API_URL={API_URL} filterName={filterName} />
        </>
    )
}
