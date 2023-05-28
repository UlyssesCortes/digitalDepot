import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function Desktop({ setFilterName }) {
    return (
        <section className='leftNav'>
            <section className='titleContainer'>
                <Link to='/' className='navLink companyTitle'>DigitalDepot</Link>

            </section>
            <section className='navLinks'>
                <Link to='/' className='navLink '>Home</Link>

                <Link to='/products' className='navLink '>Shop</Link>
                <section className='navCategorieSec'>
                    <p className='navLink categoryLink'>Categories</p>
                    <div className='navCategories'>
                        <Link to='/products' className='navCategory' onClick={() => { setFilterName("Living Room") }} >Living Room</Link>
                        <Link to='/products' className='navCategory' onClick={() => { setFilterName("Bedroom") }}>Bedroom</Link>
                        <Link to='/products' className='navCategory' onClick={() => { setFilterName("Workspace") }}>Workspace</Link>
                        <Link to='/products' className='navCategory' onClick={() => { setFilterName("Kitchen") }}>Kitchen</Link>
                    </div>

                </section>
                <Link to='/promo' className='navLink'>Special Offers</Link>
            </section>
        </section>
    )
}
