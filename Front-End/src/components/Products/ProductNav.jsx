import React, { useState } from 'react';

export default function ProductNav({ setFilterName, setCurrentPage, setActiveCategory, activeCategory }) {
    // const [activeCategory, setActiveCategory] = useState("all");

    const handleNavBtn = (category) => {
        setFilterName(category);
        setCurrentPage(1);
        setActiveCategory(category);
    };

    return (
        <nav className="productNav" id="topNav">
            <section className="topNavProduct">
                <p>MODERN FURNITURE</p>
            </section>
            <section className="bottomNavProduct" id="topSubNav">
                <button
                    className={`productLinks ${activeCategory === 'all' && 'subNavSelect'}`}
                    onClick={() => handleNavBtn('all')}
                >
                    All Furniture
                </button>
                <button
                    className={`productLinks ${activeCategory === 'bed' && 'subNavSelect'}`}
                    onClick={() => handleNavBtn('bed')}
                >
                    Beds
                </button>
                <button
                    className={`productLinks ${activeCategory === 'sofa' && 'subNavSelect'}`}
                    onClick={() => handleNavBtn('sofa')}
                >
                    Sofas
                </button>
                <button
                    className={`productLinks ${activeCategory === 'chair' && 'subNavSelect'}`}
                    onClick={() => handleNavBtn('chair')}
                >
                    Chairs
                </button>
                <button
                    className={`productLinks ${activeCategory === 'table' && 'subNavSelect'}`}
                    onClick={() => handleNavBtn('table')}
                >
                    Tables
                </button>
                <button
                    className={`productLinks ${activeCategory === 'desk' && 'subNavSelect'}`}
                    onClick={() => handleNavBtn('desk')}
                >
                    Desks
                </button>
            </section>
        </nav>
    );
}
