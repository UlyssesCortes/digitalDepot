import React, { useState } from 'react';
import '../../css/products.css'
import ProductNav from './ProductNav'
import ProductList from './ProductList'

export default function Products({ API_URL, isLoggedIn, token, filterName, setFilterName, setIsLoggedIn, setShowProfile }) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section className='marginReducer' onClick={() => { setShowProfile(false) }}>
            <ProductNav setFilterName={setFilterName} setCurrentPage={setCurrentPage} />
            <ProductList API_URL={API_URL} filterName={filterName} setFilterName={setFilterName} setCurrentPage={setCurrentPage} currentPage={currentPage} isLoggedIn={isLoggedIn} token={token} setIsLoggedIn={setIsLoggedIn} />
        </section>
    )
}
