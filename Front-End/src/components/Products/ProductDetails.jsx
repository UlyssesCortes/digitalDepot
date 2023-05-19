import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import ProductNav from './ProductNav';

export default function ProductDetails({ API_URL }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${API_URL}products/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                if (result) {
                    setProduct(result);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [API_URL, id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const productInfo = product[0];
    console.log(productInfo)
    return (
        <>
            <Header />
            <div className='productDetail'>
                <h2>{productInfo.title}</h2>
                <p>Price: ${productInfo.price}</p>
            </div>
        </>
    );
}
