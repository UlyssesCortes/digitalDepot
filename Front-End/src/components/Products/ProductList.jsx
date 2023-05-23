import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import LazyImages from './LazyImages';

export default function ProductList({ API_URL, filterName, currentPage, setCurrentPage }) {
    const [products, setProducts] = useState([]);
    const [furniture, setFurniture] = useState([]);
    const [myFavorites, setMyFavorites] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [productsPerPage] = useState(8);

    const token = window.localStorage.getItem('token');

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

    const handleFavoriteBtn = async (productId) => {
        const favoriteResponse = await fetch(`${API_URL}favorite/${productId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!favoriteResponse.ok) {
            throw new Error(`Failed to create order. Status: ${favoriteResponse.status}`);
        }
        // Do this when ther is no order with checkout false
        const favorite = await favoriteResponse.json();
        console.log(favorite)
    }
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favoriteResponse = await fetch(`${API_URL}favorite`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const favorite = await favoriteResponse.json();
                setMyFavorites(favorite);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFavorites();
    }, [API_URL, token]);

    const checkFavorite = (productId) => {
        if (myFavorites.some((favorite) => favorite.productId === productId)) {
            return (
                <div className='redHeartIcon' onClick={() => { handleFavoriteBtn(productId) }}></div>
            )
        } else {
            return (
                <div className='heartIcon' onClick={() => { handleFavoriteBtn(productId) }}></div>
            )

        }
    }

    return (
        <>
            <section className='productsLis' >
                {currentProducts.map((product, index) => {
                    const isHovered = index === hoveredIndex;
                    const imageSource = isHovered ? product.images[1] : product.images[0];
                    return (

                        <section to={`/product/${product.id}`} key={product.id} className="productCard"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}>
                            <div className='favorite'>
                                {checkFavorite(product.id)}
                            </div>
                            <Link to={`/product/${product.id}`} key={product.id}
                                onMouseEnter={() => handleMouseEnter(index)}>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <div className='imageContainer'>
                                        <LazyImages src={imageSource} alt="product Image" />
                                    </div>
                                </Suspense>
                            </Link>
                            <div className='productContent'>
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                            </div>
                        </section>
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
