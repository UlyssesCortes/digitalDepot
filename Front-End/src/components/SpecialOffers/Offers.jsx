import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Lottie from "lottie-react"
import arrow from "../../assets/LottieAnimations/rightArrow.json"

import '../../css/offer.css'

export default function Offers({ setShowProfile, setFilterName }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <section className='marginReducer' onClick={() => { setShowProfile(false) }}>
            <section className="offerContainer">
                <div className="offerLeft" onClick={() => setFilterName("chair")}>
                    <Link to='/products'>
                        <img className='offerImg' src="https://www.ikea.com/global/en/images/PH_192617_1_4bf83c6c23.jpg?f=xxl" alt="Product Image" />
                        <div className='arrowImgOffer'></div>
                        <div className='imgText'>
                            <p>Discover the Perfect Seat at Unbeatable Prices</p>
                            <h2>Sit in Style, Save More:<br></br> <span className='percentageOffer'>25%</span> off All Chairs!</h2>
                        </div>
                    </Link>

                </div>
                <Link to="/products" className="prodLinkOffer offerRight" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setFilterName("all")}>
                    <p>Go Shopping!</p>
                    <Lottie className="arrowAnimation" animationData={arrow} loop={isHovered} />
                </Link>

            </section>
        </section>
    )
}
