import React, { useState } from 'react';

const StarRating = () => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={`star ${i <= rating ? 'selected' : ''}`}
                // onClick={() => handleStarClick(i)}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
