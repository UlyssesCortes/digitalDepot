import React, { useState } from 'react';
import { motion } from "framer-motion";
import {
    itemVariants
} from '../../assets/FramerAnimations/NavAnimations';


export default function ProductNav({ setFilterName, setCurrentPage, setActiveCategory, activeCategory, setSortMethod }) {
    const [isSortOpen, setIsSortOpen] = useState(false)

    const handleNavBtn = (category) => {
        setFilterName(category);
        setCurrentPage(1);
        setActiveCategory(category);
    };

    const selectSortMethod = (sort) => {
        setSortMethod(sort)
    }

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



                <motion.nav
                    initial={false}
                    animate={isSortOpen ? "open" : "closed"}
                    className="navCategorieSec"
                    layout="position"
                >
                    <motion.div
                        onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                        <p className="productLinks">Sort and Filter</p>
                    </motion.div>
                    <motion.ul
                        variants={{
                            open: {
                                clipPath: "inset(0% 0% 0% 0% round 10px)",
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.5,
                                    delayChildren: 0.3,
                                    staggerChildren: 0.05,
                                },
                            },
                            closed: {
                                clipPath: "inset(10% 50% 90% 50% round 10px)",
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.2,
                                },
                            },
                        }}
                        style={{ pointerEvents: isSortOpen ? "auto" : "none" }}
                    >
                        <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }} onClick={() => { selectSortMethod("A-Z") }}>
                            <div className="navCategory">
                                Sort [A to Z]
                            </div>
                        </motion.li>
                        <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }} onClick={() => { selectSortMethod("Z-A") }}>
                            <div className="navCategory">
                                Sort [Z to A]
                            </div>
                        </motion.li>
                        <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }} onClick={() => { selectSortMethod("low-high") }}>
                            <div className="navCategory">Price [low to high]</div>
                        </motion.li>
                        <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }} onClick={() => { selectSortMethod("high-low") }}>
                            <div className="navCategory">
                                Price [high to low]
                            </div>
                        </motion.li>

                    </motion.ul>
                </motion.nav>






            </section>
        </nav >
    );
}
