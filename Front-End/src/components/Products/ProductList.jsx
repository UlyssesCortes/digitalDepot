import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import LazyImages from './LazyImages';

import ProductListLoading from '../Loading/ProductListLoading';

export default function ProductList({ API_URL, filterName, currentPage, setCurrentPage, isLoggedIn, setFilterName }) {
    const [products, setProducts] = useState([]);
    const [furniture, setFurniture] = useState([]);
    const [myFavorites, setMyFavorites] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [productsPerPage] = useState(8);

    const token = window.localStorage.getItem('token');
    const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');
    const lowerCaseFilterName = filterName.toLowerCase();
    const getProducts = async () => {
        try {
            const response = await fetch(`${API_URL}products`, {
                headers: {
                    'Content-Type': 'application/json',
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

    if (!filterName) {
        setFilterName("all")
    }

    useEffect(() => {
        if (filterName === 'all') {
            setFurniture(products);
        } else if (filterName === 'Living Room') {
            const filteredProducts = products.filter(
                (product) => product.category === filterName
            );
            setFurniture(filteredProducts);
        } else if (filterName === 'Bedroom') {
            const filteredProducts = products.filter(
                (product) => product.category === filterName
            );
            setFurniture(filteredProducts);
        } else if (filterName === 'Workspace') {
            const filteredProducts = products.filter(
                (product) => product.category === filterName
            );
            setFurniture(filteredProducts);
        } else if (filterName === 'Kitchen') {
            const filteredProducts = products.filter(
                (product) => product.category === filterName
            );
            setFurniture(filteredProducts);
        } else {
            const filteredProducts = products.filter(
                (product) => product.type.toLowerCase() === lowerCaseFilterName || product.title.toLowerCase().includes(lowerCaseFilterName) || product.id == filterName || product.category.toLowerCase().includes(lowerCaseFilterName)
            );
            setFurniture(filteredProducts);
        }
    }, [filterName, products]);

    const handleMouseEnter = (index) => {
        setTimeout(() => {
            setHoveredIndex(index);
        }, 200);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };



    const fetchFavorites = async () => {
        try {
            const favoriteResponse = await fetch(`${API_URL}favorite`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const favorite = await favoriteResponse.json();
            setMyFavorites(favorite);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);


    const handleFavoriteBtn = async (productId) => {
        if (isLoggedIn) {
            const favoriteResponse = await fetch(`${API_URL}favorite/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!favoriteResponse.ok) {
                throw new Error(
                    `Failed to create order. Status: ${favoriteResponse.status}`
                );
            }
        } else {
            alert('Need to be logged in to perform this action');
        }
        fetchFavorites();

    };

    const removeFavorite = async (productId) => {
        const favoriteResponse = await fetch(`${API_URL}favorite/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!favoriteResponse.ok) {
            throw new Error(
                `Failed to create order. Status: ${favoriteResponse.status}`
            );
        }
        fetchFavorites();

    };

    const checkFavorite = (productId) => {
        if (isLoggedInLocal) {
            if (myFavorites.some((favorite) => favorite.productId === productId)) {
                return (
                    <div
                        key={productId}
                        className="redHeartIcon"
                        onClick={() => removeFavorite(productId)}></div>
                );
            } else {
                return (
                    <div
                        key={productId}
                        className="heartIcon"
                        onClick={() => handleFavoriteBtn(productId)}
                    >
                    </div>
                );
            }
        }
    };

    if (products.length === 0) {
        return (
            <>
                <ProductListLoading isLoggedIn={isLoggedIn} />
            </>
        );
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = furniture.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <section className="productsLis">
                {currentProducts.map((product, index) => {
                    const isHovered = index === hoveredIndex;
                    const imageSource = isHovered ? product.images[1] : product.images[0];
                    return (
                        <section
                            to={`/product/${product.id}`}
                            key={product.id}
                            className="productCard"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            {isLoggedInLocal && (
                                <div className="favorite">{checkFavorite(product.id)}</div>
                            )}

                            <Link
                                to={`/product/${product.id}`}
                                key={product.id}
                                onMouseEnter={() => handleMouseEnter(index)}
                            >
                                <Suspense fallback={<div>Loading...</div>}>
                                    <div className="imageContainer">
                                        <LazyImages src={imageSource} alt="product Image" />
                                    </div>
                                </Suspense>
                            </Link>
                            <div className="productContent">
                                <p>{product.title}</p>
                                <p>${product.price}</p>
                            </div>
                        </section>
                    );
                })}
                <section className="paginationBtns">
                    {Array.from(
                        { length: Math.ceil(furniture.length / productsPerPage) },
                        (_, index) => (
                            <a
                                href="#topNav"
                                className={`paginationBtn ${index + 1 === currentPage ? 'selected' : ''
                                    }`}
                                key={index}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </a>
                        )
                    )}
                </section>
            </section>
        </>
    );
}
