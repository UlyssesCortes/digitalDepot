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
            <section className='productsLis'>
                {products.map((product) => {
                    return (
                        <div className="productCard" key={product.id}>
                            <img className="productImg" src={product.images[1]} alt="product Image" />

                            <div className='productContent'>
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                            </div>
                        </div>
                    )
                })}
            </section>

        </>
    )
}
