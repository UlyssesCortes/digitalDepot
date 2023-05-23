import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import LazyImages from './LazyImages';

export default function ProductList({ API_URL, filterName, currentPage, setCurrentPage }) {
    const [products, setProducts] = useState([]);
    const [furniture, setFurniture] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [productsPerPage] = useState(8);



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

    const handleMouseEnter = (index) => {
        setTimeout(() => {
            setHoveredIndex(index);
        }, 200);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = furniture.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <section className='productsLis' >
                {currentProducts.map((product, index) => {
                    const isHovered = index === hoveredIndex;
                    const imageSource = isHovered ? product.images[1] : product.images[0];
                    return (
                        <Link to={`/product/${product.id}`} key={product.id} className="productCard"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}>
                            <div className='favorite'>
                                <div className='heartIcon'></div>
                            </div>
                            {/* <div className="imageContainer">
                                <img
                                    className="productImg"
                                    src={imageSource}
                                    alt="product Image"
                                />
                            </div> */}
                            <Suspense fallback={<div>Loading...</div>}>
                                <div className='imageContainer'>
                                    <LazyImages src={imageSource} alt="product Image" />
                                </div>
                            </Suspense>

                            <div className='productContent'>
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                            </div>
                        </Link>
                    )
                })}
                <section className='paginationBtns'>
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                        <a
                            href='#topNav'
                            className={`paginationBtn ${index + 1 === currentPage ? 'selected' : ''}`}
                            key={index}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </a>
                    ))}
                </section>
            </section>
        </>
    )
}
