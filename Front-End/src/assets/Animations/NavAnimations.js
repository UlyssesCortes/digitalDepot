export const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
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
        y: '-10px',
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: "easeInOut"
        }
    }
}