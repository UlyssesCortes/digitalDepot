import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

import {
    typingContainer,
    typingContainer2,
    typingContainer3,
    typingContainerSub,
    btnContainer,
    bannerDetails,
} from '../../assets/FramerAnimations/HeroAnimations';

export default function Banner() {

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

                    <p>Accent chairs at Herman Miller included a clear</p>
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
