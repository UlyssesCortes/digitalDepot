import React, { useState } from 'react';

import '../../css/products.css'
import Header from "../Navbar/Header"
import ProductNav from './ProductNav'
import ProductList from './ProductList'

export default function Products({ API_URL, isLoggedIn, token, setIsLoggedIn, filterName, setFilterName }) {
    const [currentPage, setCurrentPage] = useState(1);
    console.log(filterName)
    return (
        <section className='marginReducer'>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <ProductNav setFilterName={setFilterName} setCurrentPage={setCurrentPage} />
            <ProductList API_URL={API_URL} filterName={filterName} setFilterName={setFilterName} setCurrentPage={setCurrentPage} currentPage={currentPage} isLoggedIn={isLoggedIn} token={token} />
        </section>
    )
}
