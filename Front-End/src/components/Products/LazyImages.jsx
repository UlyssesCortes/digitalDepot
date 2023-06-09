import React from 'react';

const LazyImage = ({ src, alt }) => {
    const [imageSrc, setImageSrc] = React.useState(null);
    const imageRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setImageSrc(src);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (observer && observer.unobserve && imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, [src]);

    return <img ref={imageRef} className="productImg" src={imageSrc} alt={alt} loading='lazy' />;
};

export default LazyImage;
