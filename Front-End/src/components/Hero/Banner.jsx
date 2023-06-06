import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

export default function Banner() {

    const typingContainer = {
        hidden: { opacity: 0, y: 100 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.3,
                delay: 0.1,
                opacity: {
                    duration: 0.6,
                    ease: [0.4, 0.05, 0.8, 0.5],
                },
                y: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 80,
                    mass: 0.5,
                    damping: 10,
                },
            },
        },
    };
    const typingContainer2 = {
        hidden: { opacity: 0, y: 100 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.3,
                delay: 0.2,
                opacity: {
                    duration: 0.6,
                    ease: [0.4, 0.05, 0.8, 0.5],
                },
                y: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 80,
                    mass: 0.5,
                    damping: 10,
                },
            },
        },
    };
    const typingContainer3 = {
        hidden: { opacity: 0, y: 100 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.3,
                delay: 0.3,
                opacity: {
                    duration: 0.6,
                    ease: [0.4, 0.05, 0.8, 0.5],
                },
                y: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 80,
                    mass: 0.5,
                    damping: 10,
                },
            },
        },
    };


    const typingContainerSub = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delay: 0.8,
            },
        },
    };
    const btnContainer = {
        hidden: { opacity: 0, x: "-100px" },
        show: {
            opacity: 1,
            x: "0",
            transition: {
                delay: 1.1,
            },
        },
    };

    const bannerDetails = {
        hidden: { opacity: 0, x: "100px" },
        show: {
            opacity: 1,
            x: "0",
            transition: {
                delay: 1.1,
            },
        },
    };

    return (
        <article className='banner'>
            <section className='bannerContent'>
                <section className='bannerSlogan'>

                    <div className='sloganTest'>
                        <motion.div className='sloganTest' variants={typingContainer} initial="hidden" animate="show">
                            <p  >Find the best</p>
                        </motion.div>
                    </div>
                    <div className='sloganTest'>
                        <motion.div className='sloganTest' variants={typingContainer2} initial="hidden" animate="show">
                            <p  >home furniture for</p>
                        </motion.div>
                    </div>
                    <div className='sloganTest'>
                        <motion.div variants={typingContainer3} initial="hidden" animate="show">
                            <p >your room</p>
                        </motion.div>
                    </div >
                </section>

                <motion.section className='bannerSubSlogan' variants={typingContainerSub} initial="hidden" animate="show">

                    <p>Accent chairs at Herman Miller inclued a clear</p>
                    <p>mid-century modern accent</p>

                </motion.section>
                <section className='bannerBtnContainer'>
                    <motion.div variants={btnContainer} initial="hidden" animate="show">
                        <Link to='/products' className=' bannerBtn'>Shop now</Link>

                    </motion.div>
                    <motion.section className='bannerStats' variants={bannerDetails} initial="hidden" animate="show">
                        <div className='statsLeft'>
                            <h1>20k+</h1>
                            <p>Collections</p>
                        </div>
                        <div className='statsRight'>
                            <h1>16k</h1>
                            <p>Users</p>
                        </div>
                    </motion.section>
                </section>
            </section>
        </article >
    )
}
