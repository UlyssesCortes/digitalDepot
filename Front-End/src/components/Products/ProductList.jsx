import React, { useEffect, useState } from 'react';


export default function ProductList({ API_URL }) {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await fetch(`${API_URL}products`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (result) {
                setProducts(result);
            }
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            {products.map((product) => {
                return (
                    <div className="card2" key={product.id}>
                        <div className='imgBox2'>
                            <img className='mouse' src={product.image} alt="" />
                        </div>
                        <div className='contentBox2'>
                            <h3>{product.title}</h3>
                            <h2>${product.price}</h2>
                            <p>${product.images}</p>
                            {/* <button className='buy2' onClick={() => addToCart(API_URL, user, product.id, token)}>Add to Cart</button> */}
                        </div>
                    </div>
                )
            })}
        </>
    )
}
