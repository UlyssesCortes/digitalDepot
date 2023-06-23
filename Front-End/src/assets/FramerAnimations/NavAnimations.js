export const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 30, damping: 2 }
    },
    closed: { opacity: 0, y: 2, transition: { duration: 0.2 } }
};

export const navAnimation = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0,
            ease: "easeInOut"
        }
    }
}

export const navItems = {
    hidden: {
        opacity: 0,
        y: '0px',
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: "easeInOut"
        }
    }
}

export const containerVariants = {
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
