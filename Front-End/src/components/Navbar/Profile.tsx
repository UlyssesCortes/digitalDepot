import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    itemVariants,
    containerVariants
} from '../../assets/FramerAnimations/NavAnimations';

export default function Profile({ setIsLoggedIn, setShowProfile, showProfile, setShowFavorite, setShowOrder, setPageTitle, setShowCart, setCartItems, setCurrentOrderId }) {

    const handleLogOutBtn = () => {
        localStorage.setItem('currentOrderId', "");
        localStorage.setItem('token', "");
        localStorage.setItem('isLoggedIn', "");

        setIsLoggedIn(false);
        setShowProfile(false)
        setCurrentOrderId("")
        setCartItems([])
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