import '../../css/products.css'

import React, { useState } from 'react';

import Header from "../Header"
import ProductNav from './ProductNav'
import ProductList from './ProductList'

export default function Products({ API_URL }) {
    const [beds, setBeds] = useState([])
    const [sofas, setSofas] = useState([])
    const [chairs, setChairs] = useState([])
    const [tables, setTables] = useState([])
    const [desks, setDesks] = useState([])
    return (
        <>
            <Header />
            <ProductNav />
            <ProductList API_URL={API_URL} />
        </>
    )
}
