import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className='hamburgerNavContainer'>
            <section className='subNav'>

                <section className='subnavIcons'>
                    <div className="hamburger" onClick={toggleMenu}>
                        <div className={`${isOpen && "bar1"}`}></div>
                        <div className={`${isOpen && "bar2"}`}></div>
                        <div className={`${isOpen && "bar3"}`}></div>
                    </div>
                </section>
            </section>

            <div className={`links-container ${isOpen && "active"}`}>
                <div className="mobileNav">
                    <Link to='/home' className='linksMobile' onClick={() => { setIsOpen(!isOpen) }}>Home</Link>
                    <Link to='/products' className='linksMobile' onClick={() => { setIsOpen(!isOpen) }}>Products</Link>
                    <Link to='/offers' className='linksMobile contactLink' onClick={() => { setIsOpen(!isOpen) }}>Offers</Link>
                </div>
            </div>
        </section >
    )
}
