import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Favorites from '../Products/Profile/Favorites';
import Orders from '../Products/Profile/Orders';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile({ setIsLoggedIn, favorites, setShowProfile, finializedOrders, showProfile }) {
    const [showFavorite, setShowFavorite] = useState(false);
    const [showOrder, setShowOrder] = useState(false);

    const handleLogOutBtn = () => {
        localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const itemVariants = {
        open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
    };

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         setShowProfile(true);
    //     }, 500); 

    //     return () => {
    //         clearTimeout(timeoutId);
    //     };
    // }, []);

    return (

        //     <section className='profileSectionBtn' >
        //     {/* <div className='triShape'></div> */}
        //     <Link to='/cart' className='profileBtns profileBtn1'>
        //         <div className='btnContainer'>
        //             <div className='userLink'>Cart</div>
        //             <div className='profileIcon1'></div>
        //         </div>
        //     </Link>

        //     <div className='profileBtns profileBtn2' onClick={() => { setShowOrder(!showOrder); setShowFavorite(false) }}>
        //         <div className='btnContainer' >
        //             <p>Orders</p>
        //             <div className='profileIcon2'></div>

        //         </div>
        //     </div>
        //     {showOrder && <Orders finializedOrders={finializedOrders} setShowProfile={setShowProfile} />}

        //     <div className='profileBtns profileBtn3' onClick={() => { setShowFavorite(!showFavorite); setShowOrder(false) }}>
        //         <div className='btnContainer' >
        //             <p>Favorites</p>
        //             <div className='profileIcon3'></div>
        //             {showFavorite && <Favorites favorites={favorites} setShowProfile={setShowProfile} />}
        //         </div>
        //     </div>
        //     <button className='profileBtns profileBtn4' onClick={() => { handleLogOutBtn() }}>
        //         <div className='btnContainer'>
        //             <p>Logout</p>
        //             <div className='profileIcon4'></div>
        //         </div>
        //     </button>

        // </section>

        <section className="">
            <AnimatePresence>
                {showProfile && (
                    <motion.nav initial="closed" animate="open" exit="closed" layout="position" className='navUserIconDop'>
                        <motion.div onClick={() => setShowProfile(!showProfile)}></motion.div>
                        <motion.ul
                            variants={{
                                open: {
                                    clipPath: 'inset(0% 0% 0% 0% round 10px)',
                                    transition: {
                                        type: 'spring',
                                        bounce: 0,
                                        duration: 0.5,
                                        delayChildren: 0.3,
                                        staggerChildren: 0.05,
                                    },
                                },
                                closed: {
                                    clipPath: 'inset(10% 50% 90% 50% round 10px)',
                                    transition: {
                                        type: 'spring',
                                        bounce: 0,
                                        duration: 0.2,
                                    },
                                },
                            }}
                            style={{ pointerEvents: 'auto' }}
                        >
                            <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
                                <Link to="/cart" className="profileBtns profileBtn1">
                                    <div className="btnContainer">
                                        <div className="userLink userNavLinks">Cart</div>
                                    </div>
                                </Link>
                            </motion.li>
                            <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
                                <div className="profileBtns profileBtn2" onClick={() => { setShowOrder(!showOrder); setShowFavorite(false) }}>
                                    <div className="btnContainer">
                                        <p className='userNavLinks'>Orders</p>
                                    </div>
                                </div>
                                {showOrder && <Orders finializedOrders={finializedOrders} setShowProfile={setShowProfile} />}
                            </motion.li>
                            <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
                                <div className="profileBtns profileBtn3" onClick={() => { setShowFavorite(!showFavorite); setShowOrder(false) }}>
                                    <div className="btnContainer">
                                        <p className='userNavLinks'>Favorites</p>
                                        {showFavorite && <Favorites favorites={favorites} setShowProfile={setShowProfile} />}
                                    </div>
                                </div>
                            </motion.li>
                            <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
                                <button className="profileBtns profileBtn4" onClick={() => { handleLogOutBtn() }}>
                                    <div className="btnContainer">
                                        <p className='userNavLinks'>Logout</p>
                                    </div>
                                </button>
                            </motion.li>
                        </motion.ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </section>
    );
}      