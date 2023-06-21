import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import upRightArrow from '../../assets/images/upRightArrow.png'
import { furniturePopUp } from '../../assets/FramerAnimations/HeroAnimations';

export default function Furniture({ setFilterName }) {
    const [isAnimated, setIsAnimated] = useState(false);

    const handleVisibilityChange = (isVisible) => {
        if (isVisible) {
            setIsAnimated(true);
        }
    };

    return (
        <article className="furnitureComponent">
            <VisibilitySensor onChange={handleVisibilityChange}>
                <section className="topFurniture">
                    <div>
                        <h1>Top <br></br> Categories</h1>
                        <p>We offer a wide variety of furniture to suit your unique style and needs</p>
                    </div>
                    <Link to='products' className='disBtn' onClick={() => { setFilterName("all") }}>Discover More  <img src={upRightArrow} className='upRightArr' alt="Up Right Arrow" /></Link>
                </section>
            </VisibilitySensor>

            <motion.section className="furnitureCategory" variants={furniturePopUp} initial="hidden" animate={isAnimated ? "show" : "hidden"}>
                <Link to='./products' className="livingRoomCard furnitureCard" onClick={() => { setFilterName("Living Room") }}>
                    <div className="livingRoomImg furnitureCardImg"></div>
                    <p>Living room</p>
                </Link>
                <Link to='/products' className="bedRoomCard furnitureCard" onClick={() => { setFilterName("Bedroom") }}>
                    <div className="bedroomImg furnitureCardImg"></div>
                    <p>Bedroom</p>
                </Link>
                <Link to='/products' className="workSpaceCard furnitureCard" onClick={() => { setFilterName("Workspace") }}>
                    <div className="workspaceImg furnitureCardImg"></div>
                    <p>Office</p>
                </Link>
                <Link to='products' className="kitchenCard furnitureCard" onClick={() => { setFilterName("Kitchen") }}>
                    <div href="#topNav" className="kitchenImg furnitureCardImg"></div>
                    <p>Kitchen</p>
                </Link>
            </motion.section>

        </article>
    )
}
