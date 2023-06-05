import React, { useEffect, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import LazyImages from './LazyImages';
import { motion } from "framer-motion";

import ProductListLoading from '../Loading/ProductListLoading';
import LoginAlert from '../Login-Register/LoginAlert';

export default function ProductList({ API_URL, filterName, currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn, setModalEmail, modalEmail, products }) {
    const [furniture, setFurniture] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [productsPerPage] = useState(8);
    const [loginAlert, setLoginAlert] = useState(false)

    const token = window.localStorage.getItem('token');
    const isLoggedInLocal = window.localStorage.getItem('isLoggedIn');
    const lowerCaseFilterName = filterName.toLowerCase();

    useEffect(() => {
        setIsLoggedIn(isLoggedInLocal)
    }, []);

    useEffect(() => {
        if (!filterName || filterName === 'all') {
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
                const favoriteResponse = await fetch(`${API_URL}favorite/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!favoriteResponse.ok) {
                    setFurniture((prevFurniture) => {
                        return prevFurniture.map((product) => {
                            if (product.id === productId) {
                                return { ...product, isFavorite: !product.isFavorite };
                            }
                            return product;
                        });
                    });

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
            const favoriteResponse = await fetch(`${API_URL}favorite/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!favoriteResponse.ok) {
                setFurniture((prevFurniture) => {
                    return prevFurniture.map((product) => {
                        if (product.id === productId) {
                            return { ...product, isFavorite: true };
                        }
                        return product;
                    });
                });

                throw new Error(
                    `Failed to create order. Status: ${favoriteResponse.status}`
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (products.length === 0) {
        return (
            <>
                <ProductListLoading isLoggedIn={isLoggedIn} />
            </>
        );
    }
    const handleClick = () => {
        setShowAll(!showAll);
    };

    const visibleButtons = showAll ? furniture.length : 7;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = furniture.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <section className="productsLis">
                {loginAlert &&
                    <div className='loginAlertWrapper'>
                        <LoginAlert setLoginAlert={setLoginAlert} setModalEmail={setModalEmail} modalEmail={modalEmail} />
                    </div>}
                {currentProducts.map((product, index) => {
                    const isHovered = index === hoveredIndex;
                    const imageSource = isHovered ? product.images[1] : product.images[0];
                    return (
                        <section
                            key={product.id}
                            className="productCard"
                        >
                            <div className="favorite" href="#topNav">
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
                                {product.type === "chair" ? <div className='discount'>
                                    <p className='discountPrice'> ${(product.price * .75).toFixed(2)}</p><p className='originalPrice'> ${(product.price)}</p>
                                </div>
                                    : <p>${product.price}</p>}
                            </div>
                        </section>
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
