
export const generateCardVariants = (index) => ({
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delay: index * 0.05,
        },
    },
});