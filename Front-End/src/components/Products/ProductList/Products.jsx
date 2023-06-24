import React, { useState } from 'react';
import '../../../css/products.css'
import ProductNav from './ProductNav'
import ProductList from './ProductList'

export default function Products({ API_URL, isLoggedIn, token, filterName, setFilterName, setIsLoggedIn, setShowProfile, setModalEmail, modalEmail, products, currentPage, setCurrentPage, setProducts, setActiveCategory, activeCategory, setNoResult, noResult, setDemoUser, updateFurniture, setUpdateFurniture }) {
    const [sortMethod, setSortMethod] = useState("")

    return (
        <section className='marginReducer' onClick={() => { setShowProfile(false) }}>
            <ProductNav setFilterName={setFilterName} setCurrentPage={setCurrentPage} setActiveCategory={setActiveCategory} activeCategory={activeCategory} setSortMethod={setSortMethod} />
            <ProductList API_URL={API_URL} filterName={filterName} setFilterName={setFilterName} currentPage={currentPage} setCurrentPage={setCurrentPage} isLoggedIn={isLoggedIn} token={token} setIsLoggedIn={setIsLoggedIn} setModalEmail={setModalEmail} modalEmail={modalEmail} products={products} setProducts={setProducts} sortMethod={sortMethod} setSortMethod={setSortMethod} setNoResult={setNoResult} noResult={noResult} setDemoUser={setDemoUser} updateFurniture={updateFurniture} setUpdateFurniture={setUpdateFurniture} />
        </section>
    )
}
