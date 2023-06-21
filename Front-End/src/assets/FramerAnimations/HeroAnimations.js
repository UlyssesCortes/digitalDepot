
export const furniturePopUp = {
    hidden: { opacity: 1, y: 100 },
    show: {
        y: 0,
        transition: {
            staggerChildren: 0.3,
            delay: 0.1,
            y: {
                duration: 0.8,
                type: "spring",
                stiffness: 80,
                mass: .10,
                damping: 6,
            },
        },
    },
};

export const typingContainer = {
    hidden: { opacity: 0, y: 50 },
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
                stiffness: 50,
                mass: 0.5,
                damping: 10,
            },
        },
    },
};
export const typingContainer2 = {
    hidden: { opacity: 0, y: 50 },
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
                stiffness: 50,
                mass: 0.5,
                damping: 10,
            },
        },
    },
};
export const typingContainer3 = {
    hidden: { opacity: 0, y: 50 },
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
                stiffness: 50,
                mass: 0.5,
                damping: 10,
            },
        },
    },
};
export const typingContainer4 = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.3,
            delay: 0.4,
            opacity: {
                duration: 0.6,
                ease: [0.4, 0.05, 0.8, 0.5],
            },
            y: {
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                mass: 0.5,
                damping: 10,
            },
        },
    },
};


export const typingContainerSub = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delay: 0.8,
        },
    },
};
export const btnContainer = {
    hidden: { opacity: 0, x: "-100px" },
    show: {
        opacity: 1,
        x: "0",
        transition: {
            delay: 1.2,
        },
    },
};

export const bannerDetails = {
    hidden: { opacity: 0, x: "100px" },
    show: {
        opacity: 1,
        x: "0",
        transition: {
            delay: 1.2,
        },
    },
};