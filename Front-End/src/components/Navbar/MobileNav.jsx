import React, { useState } from 'react'
// import '/root/windowPros3/src/CSS/HamburgerNav.css'

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <body className='hamburgerNavContainer'>
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
                    <a href='#services' className='linksMobile'>Services</a>
                    <a href='#reviews' className='linksMobile'>Reviews</a>
                    <a href='#contact' className='linksMobile contactLink'>ContactUs</a>
                </div>
            </div>
        </body>
    )
}
