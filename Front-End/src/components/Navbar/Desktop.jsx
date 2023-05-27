import React from 'react'
import { Link } from 'react-router-dom';


export default function Desktop() {
    return (
        <section className='leftNav'>
            <section className='titleContainer'>
                <Link to='/' className='navLink companyTitle'>DigitalDepot</Link>

            </section>
            <section className='navLinks'>
                <Link to='/' className='navLink '>Home</Link>

                <Link to='/products' className='navLink '>Products</Link>
                <section className='navCategorieSec'>
                    <p className='navLink categoryLink'>Categories</p>
                    <div className='navCategories'>
                        <Link to='/products' className='navCategory'>Living Room</Link>
                        <Link to='/products' className='navCategory'>Bedroom</Link>
                        <Link to='/products' className='navCategory'>Workspace</Link>
                        <Link to='/products' className='navCategory'>Kitchen</Link>
                    </div>

                </section>
                <Link to='/promo' className='navLink'>Promo</Link>
            </section>
        </section>
    )
}
