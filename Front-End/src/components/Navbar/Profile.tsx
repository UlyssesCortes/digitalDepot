import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Favorites from '../Products/Profile/Favorites';
import Orders from '../Products/Profile/Orders';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export default function Profile({ setIsLoggedIn, favorites, setShowProfile, finializedOrders, showProfile }) {
    const [showFavorite, setShowFavorite] = useState(false);
    const [showOrder, setShowOrder] = useState(false);

    const handleLogOutBtn = () => {
        localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('token');
        setIsLoggedIn(false);
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

    return (

        <motion.section className='profileSectionBtn'
            initial="closed"
            animate={showProfile ? "open" : "closed"}
            style={{ pointerEvents: showProfile ? "auto" : "none" }}
            variants={containerVariants}
        >
            {/* <motion.div
                className='container'

                variants={containerVariants}

            > */}
            <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.04 }}
            >
                <Link to='/cart' className='profileBtns'>
                    <div className='btnContainer'>
                        <div className=' userNavLinks'>Cart</div>
                    </div>
                </Link>
            </motion.div>

            <motion.div
                className='profileBtns'
                // onClick={() => {
                //     setShowOrder(!showOrder);
                //     setShowFavorite(false);
                // }}
                variants={itemVariants}
                whileHover={{ scale: 1.04 }}
            >
                <Link to='/cart' className='profileBtns'>
                    <p className='userNavLinks'>Orders</p>

                </Link>
            </motion.div>

            <motion.div
                className='profileBtns'
                // onClick={() => {
                //     setShowFavorite(!showFavorite);
                //     setShowOrder(false);
                // }}
                variants={itemVariants}
                whileHover={{ scale: 1.04 }}
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

            {showOrder && <Orders finializedOrders={finializedOrders} setShowProfile={setShowProfile} />}
            {showFavorite && <Favorites favorites={favorites} setShowProfile={setShowProfile} />}
        </motion.section>

        // <section className="">
        //     <AnimatePresence>
        //         {showProfile && (
        //             <motion.nav initial="closed" animate="open" exit="closed" layout="position" className='navUserIconDop'>
        //                 <motion.ul
        //                     variants={{
        //                         open: {
        //                             clipPath: 'inset(0% 0% 0% 0% round 10px)',
        //                             transition: {
        //                                 type: 'spring',
        //                                 bounce: 0,
        //                                 duration: 0.5,
        //                                 delayChildren: 0.3,
        //                                 staggerChildren: 0.05,
        //                             },
        //                         },
        //                         closed: {
        //                             clipPath: 'inset(10% 50% 90% 50% round 10px)',
        //                             transition: {
        //                                 type: 'spring',
        //                                 bounce: 0,
        //                                 duration: 0.2,
        //                             },
        //                         },
        //                     }}
        //                     style={{ pointerEvents: 'auto' }}
        //                     className={`${showFavorite ? "navUserIconDopWidth" : ""}`}
        //                 >
        //                     <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
        //                         <Link to="/cart" className="profileBtns profileBtn1">
        //                             <div className="btnContainer">
        //                                 <div className="userLink userNavLinks">Cart</div>
        //                             </div>
        //                         </Link>
        //                     </motion.li>
        //                     <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
        //                         <div className="profileBtns profileBtn2" onClick={() => { setShowOrder(!showOrder); setShowFavorite(false) }}>
        //                             <div className="btnContainer">
        //                                 <p className='userNavLinks'>Orders</p>
        //                             </div>
        //                         </div>
        //                         {showOrder && <Orders finializedOrders={finializedOrders} setShowProfile={setShowProfile} />}

        //                     </motion.li>
        //                     <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
        //                         <div className="profileBtns profileBtn3" onClick={() => { setShowFavorite(!showFavorite); setShowOrder(false) }}>
        //                             <div className="btnContainer">
        //                                 <p className='userNavLinks'>Favorites</p>
        //                                 {showFavorite && <Favorites favorites={favorites} setShowProfile={setShowProfile} />}
        //                             </div>
        //                         </div>
        //                     </motion.li>
        //                     <motion.li variants={itemVariants} whileHover={{ scale: 1.04 }}>
        //                         <button className="profileBtns profileBtn4" onClick={() => { handleLogOutBtn() }}>
        //                             <div className="btnContainer">
        //                                 <p className='userNavLinks'>Logout</p>
        //                             </div>
        //                         </button>
        //                     </motion.li>
        //                 </motion.ul>
        //             </motion.nav>
        //         )}
        //     </AnimatePresence>
        // </section >
    );
}      