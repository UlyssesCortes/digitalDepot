import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';

export default function Profile({ setIsLoggedIn, favorites, setShowProfile, finializedOrders, showProfile, setShowFavorite, setShowOrder, setPageTitle, setShowCart, setCartItems }) {

    const handleLogOutBtn = () => {
        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('currentOrderId');
        window.localStorage.removeItem('token');
        setIsLoggedIn(false);
        setShowProfile(false)
        setCartItems([])
    };

    const itemVariants: Variants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }

    };

    const containerVariants = {
        open: {
            clipPath: "inset(0% 0% 0% 0% )",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.5,
                delayChildren: 0.3,
                staggerChildren: 0.05,
            },
        },
        closed: {
            clipPath: "inset(10% 50% 90% 50% )",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.2,
            },
        },
    };

    const handleFavClick = () => {
        setShowFavorite(true)
        setShowOrder(false)
        setShowProfile(false)
        setShowCart(false)
        setPageTitle("FAVORITES")
    }
    const handleOrderClick = () => {
        setShowFavorite(false)
        setShowProfile(false)
        setShowOrder(true)
        setShowCart(false)
        setPageTitle("ORDER HISTORY")
    }
    const handleCartClick = () => {
        setShowFavorite(false)
        setShowOrder(false)
        setShowProfile(false)
        setShowCart(true)
        setPageTitle("SHOPPING CART")
    }

    return (

        <motion.section className='profileSectionBtn'
            initial="closed"
            animate={showProfile ? "open" : "closed"}
            style={{ pointerEvents: showProfile ? "auto" : "none" }}
            variants={containerVariants}
        >
            <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.04 }}
                onClick={() => { handleCartClick() }}
            >
                <Link to='/cart' className='profileBtns'>
                    <div className='btnContainer'>
                        <div className=' userNavLinks'>Cart</div>
                    </div>
                </Link>
            </motion.div>

            <motion.div
                className='profileBtns'
                variants={itemVariants}
                whileHover={{ scale: 1.04 }}
                onClick={() => { handleOrderClick() }}
            >
                <Link to='/cart' className='profileBtns'>
                    <p className='userNavLinks'>Orders</p>

                </Link>
            </motion.div>

            <motion.div
                className='profileBtns'
                variants={itemVariants}
                whileHover={{ scale: 1.04 }}
                onClick={() => { handleFavClick() }}

            >
                <Link to='/cart' className='btnContainer profileBtns'>
                    <p className='userNavLinks'>Favorites</p>
                </Link>
            </motion.div>

            <motion.button className='profileBtns' onClick={() => handleLogOutBtn()}
                variants={itemVariants}
                whileHover={{ scale: 1.04 }}
            >
                <div className='btnContainer'>
                    <p className='userNavLinks'>Logout</p>

                </div>
            </motion.button>
        </motion.section>
    );
}      