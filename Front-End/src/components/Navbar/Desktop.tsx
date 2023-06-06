import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { motion, Variants } from "framer-motion";
import {
    itemVariants,
    navAnimation,
    navItems
} from '../../assets/FramerAnimations/NavAnimations';

export default function Desktop({ setFilterName, setShowProfile, setIsCategorieOpen, isCategorieOpen, setCurrentPage }) {

    const handleCategorySelect = (filterName) => {
        setFilterName(filterName)
        setIsCategorieOpen(false)
        setCurrentPage(1)
    }

    return (
        <section className='leftNav' onClick={() => { setShowProfile(false) }}>
            <section className='titleContainer'>
                <Link to='/' className='companyTitle' onClick={() => { setIsCategorieOpen(false) }}>DigitalDepot</Link>
            </section>
            <motion.ul className='navLinks' variants={navAnimation} initial="hidden" animate="show">

                <motion.li variants={navItems}>
                    <Link to='/' className='navLink ' onClick={() => { setIsCategorieOpen(false) }}>Home</Link>
                </motion.li>
                <motion.li variants={navItems}>
                    <Link to='/products' className='navLink ' onClick={() => { setIsCategorieOpen(false) }}>Shop</Link>
                </motion.li>
                <motion.li variants={navItems}>

                    <motion.nav
                        initial={false}
                        animate={isCategorieOpen ? "open" : "closed"}
                        className="navCategorieSec"
                        layout="position"
                    >
                        <motion.div
                            onClick={() => setIsCategorieOpen(!isCategorieOpen)}
                        >
                            <p className={` ${isCategorieOpen ? "categoryLink" : "navLink"}`}>Categories</p>
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
                            style={{ pointerEvents: isCategorieOpen ? "auto" : "none" }}
                        >
                            <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
                                <Link
                                    to="/products"
                                    className="navCategory"
                                    onClick={() => {
                                        handleCategorySelect("Living Room")
                                    }}
                                >
                                    Living Room
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
                                <Link
                                    to="/products"
                                    className="navCategory"
                                    onClick={() => {
                                        handleCategorySelect("Bedroom")
                                    }}
                                >
                                    Bedroom
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
                                <Link
                                    to="/products"
                                    className="navCategory"
                                    onClick={() => {
                                        handleCategorySelect("Workspace")
                                    }}
                                >
                                    Workspace
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
                                <Link
                                    to="/products"
                                    className="navCategory"
                                    onClick={() => {
                                        handleCategorySelect("Kitchen")
                                    }}
                                >
                                    Kitchen
                                </Link>
                            </motion.li>
                        </motion.ul>
                    </motion.nav>
                </motion.li>

                <motion.li variants={navItems}>
                    <Link to='/offers' className='navLink' onClick={() => { setIsCategorieOpen(false) }}>Special Offers</Link>
                </motion.li>

            </motion.ul>
        </section >
    )
}
