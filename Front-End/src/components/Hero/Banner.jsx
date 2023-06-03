import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

export default function Banner() {
    return (
        <article className='banner'>
            <section className='bannerContent'>
                <section className='bannerSlogan'>
                    <p>Find the best</p>
                    <p>home furniture for</p>
                    <p>your room</p>
                </section>
                <section className='bannerSubSlogan'>
                    <p>Accent chairs at Herman Miller inclued a clear</p>
                    <p>mid-century modern accent</p>
                </section>
                <section className='bannerBtnContainer'>
                    <motion.div
                        className="box"
                        whileHover={{ scale: [null, 1.1, 1.1] }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link to='/products' className=' bannerBtn'>Shop now</Link>

                    </motion.div>
                    <section className='bannerStats'>
                        <div className='statsLeft'>
                            <h1>20k+</h1>
                            <p>Collections</p>
                        </div>
                        <div className='statsRight'>
                            <h1>16k</h1>
                            <p>Users</p>
                        </div>
                    </section>
                </section>
            </section>
        </article>
    )
}
