import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import arrow from '../../../assets/images/imgArr.png'

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        };
    },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const ImageSlider = ({ images, setShowImageSlider, imgIndex }) => {
    const [[page, direction], setPage] = useState([imgIndex, 0]);

    const imageIndex = (page + images.length) % images.length;

    const paginate = (newDirection) => {
        setPage([(page + newDirection + images.length) % images.length, newDirection]);
    };

    return (
        <div className="image-slider-container">
            <AnimatePresence initial={false} custom={direction}>
                <div className="slider-image-container">
                    <motion.img
                        key={page}
                        src={images[imageIndex]}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="slider-image"
                        loading="lazy"
                    />
                    <div className="slider-buttons">
                        <button className="prev" onClick={() => paginate(-1)}>
                            <img className="prevArr" src={arrow} alt="product Image" loading='lazy' />
                        </button>
                        <button className="next" onClick={() => paginate(1)}>
                            <img className="prevArr" src={arrow} alt="product Image" loading='lazy' />
                        </button>
                    </div>
                    <div className="hideMobile">
                        <button to='/products' className="sliderClose" onClick={() => { setShowImageSlider(false) }} ></button>
                    </div>

                </div>
            </AnimatePresence>
        </div>
    );
};

export default ImageSlider;
