import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

import {
    furniturePopUp,
    furniturePopUp2,
    furniturePopUp3,
    furniturePopUp4
} from '../../assets/FramerAnimations/HeroAnimations';

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
                    <h1>Exclusive Furniture</h1>
                    <p>Check out this week&rsquo;s selection of popular products that might catch your eye, and don&rsquo;t</p>
                </section>
            </VisibilitySensor>

            <motion.section className="furnitureCategory" variants={furniturePopUp} initial="hidden" animate={isAnimated ? "show" : "hidden"}>
                {/* <motion.div className="furnitureCard" variants={furniturePopUp} initial="hidden" animate={isAnimated ? "show" : "hidden"}> */}
                <Link to='./products' className="livingRoomCard furnitureCard" onClick={() => { setFilterName("Living Room") }}>
                    <div className="livingRoomImg furnitureCardImg"></div>
                    <p>Living room</p>
                </Link>
                {/* </motion.div> */}

                {/* <motion.div className="furnitureCard" variants={furniturePopUp2} initial="hidden" animate={isAnimated ? "show" : "hidden"}> */}
                <Link to='/products' className="bedRoomCard furnitureCard" onClick={() => { setFilterName("Bedroom") }}>
                    <div className="bedroomImg furnitureCardImg"></div>
                    <p>Bedroom</p>
                </Link>
                {/* </motion.div> */}

                {/* <motion.div className="furnitureCard" variants={furniturePopUp3} initial="hidden" animate={isAnimated ? "show" : "hidden"}> */}
                <Link to='/products' className="workSpaceCard furnitureCard" onClick={() => { setFilterName("Workspace") }}>
                    <div className="workspaceImg furnitureCardImg"></div>
                    <p>Workspace</p>
                </Link>
                {/* </motion.div> */}
                {/* <motion.div className="furnitureCard" variants={furniturePopUp4} initial="hidden" animate={isAnimated ? "show" : "hidden"}> */}
                <Link to='products' className="kitchenCard furnitureCard" onClick={() => { setFilterName("Kitchen") }}>
                    <div href="#topNav" className="kitchenImg furnitureCardImg"></div>
                    <p>Kitchen</p>
                </Link>
                {/* </motion.div> */}

            </motion.section>

        </article>
    )
}
