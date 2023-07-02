import React, { useEffect, useState, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LazyImages from './LazyImages';
import { motion } from "framer-motion";

import ProductListLoading from '../../Loading/ProductListLoading';
import LoginAlert from '../../Login-Register/LoginAlert';
import { generateCardVariants } from '../../../assets/FramerAnimations/ProductAnimation';
import axios from 'axios';

export default function ProductList({ API_URL, filterName, currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn, setModalEmail, modalEmail, products, setProducts, sortMethod, setSortMethod, setNoResult, noResult, setDemoUser, updateFurniture, setUpdateFurniture }) {
    const [furniture, setFurniture] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [productsPerPage] = useState(8);
    const [loginAlert, setLoginAlert] = useState(false)

    const token = window.localStorage.getItem('token');
    const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');
    const lowerCaseFilterName = filterName.toLowerCase();
    const location = useLocation();

    useEffect(() => {
        const filteredProducts = filterProducts(products, filterName);
        setFurniture(filteredProducts);
        if (filteredProducts.length === 0) {
            setNoResult(true)
        } else {
            setNoResult(false)
        }
    }, [filterName, products]);

    useEffect(() => {
        sortFunriture()
    }, [sortMethod]);

    useEffect(() => {
        setIsLoggedIn(isLoggedInLocal);
        setFurniture(products)

    }, []);

    useEffect(() => {
        if (updateFurniture) {
            getProducts();
            setUpdateFurniture(false)
        }
    }, [location.pathname, updateFurniture]);

    const filterProducts = (products, filterName) => {
        if (!filterName || filterName === 'all') {
            return products;
        }
        return products.filter(
            (product) =>
                product.type.toLowerCase() === lowerCaseFilterName ||
                product.category === filterName ||
                product.title.toLowerCase().includes(lowerCaseFilterName) ||
                product.id == filterName ||
                product.category.toLowerCase().includes(lowerCaseFilterName)
        );
    };

    const sortFunriture = () => {
        const sortedFurniture = [...furniture];
        if (sortMethod === "Alphabetical (A-Z)") {
            sortedFurniture.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortMethod === "Alphabetical (Z-A)") {
            sortedFurniture.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortMethod === "Price (Low to High)") {
            sortedFurniture.sort((a, b) => a.price - b.price);
        } else if (sortMethod === "Price (High to Low)") {
            sortedFurniture.sort((a, b) => b.price - a.price);
        }
        setFurniture(sortedFurniture);
        setSortMethod("")
    }

    const getProducts = async () => {
        try {
            if (isLoggedIn) {
                const response = await axios.get(`${API_URL}products/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.data;
                if (result) {
                    setProducts(result);
                }
                return result;
            } else {
                const response = await axios.get(`${API_URL}products`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.data;
                if (result) {
                    setProducts(result);
                }
                return result;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleMouseEnter = (index) => {
        setTimeout(() => {
            setHoveredIndex(index);
        }, 200);
    };

    const handleFavoriteBtn = async (productId) => {
        if (isLoggedInLocal) {
            setFurniture((prevFurniture) => {
                return prevFurniture.map((product) => {
                    if (product.id === productId) {
                        return { ...product, isFavorite: !product.isFavorite };
                    }
                    return product;
                });
            });

            try {
                const favoriteResponse = await axios.post(`${API_URL}favorite/${productId}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (favoriteResponse.status === 200) {
                    setUpdateFurniture(true)
                } else {
                    throw new Error(
                        `Failed to create order. Status: ${favoriteResponse.status}`
                    );
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setLoginAlert(true)
        }
    };

    const removeFavorite = async (productId) => {
        setFurniture((prevFurniture) => {
            return prevFurniture.map((product) => {
                if (product.id === productId) {
                    return { ...product, isFavorite: false };
                }
                return product;
            });
        });

        try {
            const favoriteResponse = await axios.delete(`${API_URL}favorite/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (favoriteResponse.status === 200) {
                setUpdateFurniture(true)

            } else {
                throw new Error(
                    `Failed to create order. Status: ${favoriteResponse.status}`
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = () => {
        setShowAll(!showAll);
    };
    const visibleButtons = showAll ? furniture.length : 7;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = furniture.length > 0
        ? furniture.slice(indexOfFirstProduct, indexOfLastProduct)
        : products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <section className="productsLis">
                {products.length === 0 &&
                    <ProductListLoading />
                }
                {loginAlert &&
                    <div className='loginAlertWrapper'>
                        <LoginAlert setLoginAlert={setLoginAlert} setModalEmail={setModalEmail} modalEmail={modalEmail} setDemoUser={setDemoUser} />
                    </div>}
                {!noResult && currentProducts.map((product, index) => {
                    const isHovered = index === hoveredIndex;
                    const imageSource = isHovered ? product.images[1] : product.images[0];
                    return (
                        <motion.section
                            key={product.id}
                            className="productCard"
                            variants={generateCardVariants(index)}
                            initial="hidden"
                            animate="show"
                        >
                            <div
                                className={`favorite ${loginAlert && "hideMe"}`}
                                href="#topNav">
                                {isLoggedInLocal && product.isFavorite ? (

                                    <motion.div
                                        key={product.id}
                                        className="redHeartIcon"
                                        onClick={() => removeFavorite(product.id)}
                                        whileHover={{ scale: [null, 1.2, 1.1] }}
                                        transition={{ duration: 0.3 }}
                                    ></motion.div>
                                ) : (
                                    <motion.div
                                        key={product.id}
                                        className="heartIcon"
                                        onClick={() => handleFavoriteBtn(product.id)}
                                        whileHover={{ scale: [null, 1.2, 1.1] }}
                                        transition={{ duration: 0.3 }}
                                    ></motion.div>
                                )}
                            </div>

                            <Link
                                to={`/products/${product.id}`}
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
                                {product.type === "chair" ? <div className='discount'>
                                    <p className='discountPrice'> ${(product.price * .75).toFixed(2)}</p><p className='originalPrice'> ${(product.price)}</p>
                                </div>
                                    : <p>${product.price}</p>}
                            </div>
                        </motion.section>
                    );
                })}

                <section className="paginationBtns">
                    {Array.from(
                        { length: Math.ceil(furniture.length / productsPerPage) },
                        (_, index) => {
                            if (index < visibleButtons) {
                                return (
                                    <a
                                        href="#topNav"
                                        className={`paginationBtn ${index + 1 === currentPage ? 'selected' : ''}`}
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </a>
                                );
                            }
                            return null;
                        }
                    )}

                    {furniture.length / 8 > 7 && (
                        <button className='showMoreBtn' onClick={handleClick}>
                            {showAll ? '‣' : '‣'}
                        </button>
                    )}
                </section>
            </section>
        </>
    );
}