import React, { useState } from 'react';
import { motion } from "framer-motion";
import { itemVariants } from '../../../assets/FramerAnimations/NavAnimations';
import Lottie from "lottie-react"
import filterIcon from "../../../assets/LottieAnimations/filterDotsIcon.json"


export default function ProductNav({ setFilterName, setCurrentPage, setActiveCategory, activeCategory, setSortMethod }) {
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [sortType, setSortType] = useState("")

    const handleNavBtn = (category) => {
        setFilterName(category);
        setSortType("Sort and Filter")
        setCurrentPage(1);
        setActiveCategory(category);
    };

    const selectSortMethod = (sort) => {
        setSortType(sort)
        setSortMethod(sort)
        setIsSortOpen(false)
    }

    return (
        <nav className="productNav" id="topNav">
            <section className="topNavProduct">
                <p>MODERN FURNITURE</p>
            </section>
            <section className="bottomNavProduct" id="topSubNav">
                <button
                    className={`productLinks hideLink ${activeCategory === 'all' && 'subNavSelect'}`}
                    onClick={() => handleNavBtn('all')}
                >
                    All Furniture
                </button>
                <button
                    className={`productLinks 4 ${activeCategory === 'bed' && 'subNavSelect'}`}
                    onClick={() => handleNavBtn('bed')}
                >
                    Beds
                </button>
                <button
                    className={`productLinks  ${activeCategory === 'sofa' && 'subNavSelect'}`}
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
                    className={`productLinks  ${activeCategory === 'table' && 'subNavSelect'}`}
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
                    className="sortMenuSection"
                    layout="position"
                >
                    <div
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className='sortBtnContainer'
                    >
                        <Lottie className="sortIcon" animationData={filterIcon} loop={true} animationoptions={{ delay: 2000 }} />
                        <p className="productLinks sortBtn">{sortType ? sortType : "Sort and Filter"}</p>
                        <span className={`downArr ${isSortOpen && "rotate"}`}></span>

                    </div>

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
                        className='sortMenu'
                    >
                        <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }} onClick={() => { selectSortMethod("Price (Low to High)") }}>
                            <div className="navCategory">
                                Price (Low to High)
                            </div>
                            <div className="navCategoryMobile">
                                Low to High
                            </div>
                        </motion.li>
                        <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }} onClick={() => { selectSortMethod("Price (High to Low)") }}>
                            <div className="navCategory">
                                Price (High to Low)
                            </div>
                            <div className="navCategoryMobile">
                                High to Low
                            </div>
                        </motion.li>
                        <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }} onClick={() => { selectSortMethod("Alphabetical (A-Z)") }}>
                            <div className="navCategory">
                                Alphabetical (A-Z)
                            </div>
                            <div className="navCategoryMobile">
                                Alph. A-Z
                            </div>
                        </motion.li>
                        <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }} onClick={() => { selectSortMethod("Alphabetical (Z-A)") }}>
                            <div className="navCategory">
                                Alphabetical (Z-A)
                            </div>
                            <div className="navCategoryMobile">
                                Alph. Z-A
                            </div>
                        </motion.li>
                    </motion.ul>
                </motion.nav>
            </section>
        </nav >
    );
}
