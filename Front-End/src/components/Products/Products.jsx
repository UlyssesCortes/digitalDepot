import React, { useState } from 'react';

import '../../css/products.css'
import Header from "../Header"
import ProductNav from './ProductNav'
import ProductList from './ProductList'

export default function Products({ API_URL }) {
    const [filterName, setFilterName] = useState("")
    const [currentPage, setCurrentPage] = useState(1);


    return (
        <section className='marginReducer'>
            <Header />
            <ProductNav setFilterName={setFilterName} setCurrentPage={setCurrentPage} />
            <ProductList API_URL={API_URL} filterName={filterName} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </section>
    )
}
