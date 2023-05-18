import React, { useEffect, useState } from 'react';


export default function ProductList({ API_URL, filterName }) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([products]);


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


    if (filterName) {
        console.log(products.map((product => product.images)))
        console.log(products.filter(product => product.type == filterName))
        // setFilteredProducts(products.filter(product => product.type.toLowerCase().includes(filterName)));
        // console.log("There is filterName")
    }




    return (
        <>
            <section className='productsLis'>
                {products && products.map((product) => {
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
