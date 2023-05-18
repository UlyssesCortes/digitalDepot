import React, { useEffect, useState } from 'react';

export default function ProductList({ API_URL, filterName }) {
    const [products, setProducts] = useState([]);
    const [furniture, setFurniture] = useState([]);
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
                setFurniture(result);
            }
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (filterName === "all") {
            setFurniture(products)
        } else {
            const filteredProducts = (products.filter(product => product.type === filterName));
            if (filteredProducts) {
                setFurniture(filteredProducts)
            }
        }

    }, [filterName])

    return (
        <>
            <section className='productsLis'>
                {furniture.map((product) => {
                    { console.log(furniture) }
                    return (
                        <div className="productCard" key={product.id}>
                            <div className='borderCard'>
                                <div className='favorite'>
                                    <div className='heartIcon'></div>
                                </div>
                                <img className="productImg" src={product.images[0]} alt="product Image" />

                                <div className='productContent'>
                                    <p>{product.title}</p>
                                    <p>${product.price}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>
        </>
    )
}
