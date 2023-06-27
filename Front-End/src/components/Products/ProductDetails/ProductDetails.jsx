import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import Lottie from "lottie-react"
import check from "../../../assets/LottieAnimations/check.json"

import StarRating from './StartRating';
import Features from './Features';
import Dimensions from './Dimensions';

import Shipping from './Shipping';
import Description from './Description';
import addToCart from '../Cart/addToCart';
import ProductLoading from '../../Loading/ProductLoading';
import ImageSlider from './ImageSlider';
import LoginAlert from '../../Login-Register/LoginAlert';

export default function ProductDetails({ API_URL, user, token, currentOrderId, setCurrentOrderId, isLoggedIn, quantity, setQuantity, setShowProfile, setModalEmail, modalEmail, setCartItems, setDemoUser, setUpdateFurniture }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [displayFeatures, setDisplayFeatures] = useState(false)
    const [added, setAdded] = useState(false)
    const [displayDimensions, setDisplayDimensions] = useState(false)
    const [displayShipping, setDisplayShipping] = useState(false)
    const [displayDescription, setDisplayDescription] = useState(false)
    const [showImageSlider, setShowImageSlider] = useState(false)
    const [clickedFav, setClickedFav] = useState(false)
    const [imgIndex, setImgIndex] = useState(0)
    const [loginAlert, setLoginAlert] = useState(false)

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        const localToken = window.localStorage.getItem('token');

        try {
            if (localToken) {
                const response = await axios.get(`${API_URL}products/details/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localToken}`,
                    },
                });
                const result = await response.data;
                if (result) {
                    setProduct(result);
                }
            } else {
                const response = await axios.get(`${API_URL}products/${id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const result = await response.data;
                if (result) {
                    setProduct(result);
                }
            }

        } catch (error) {
            console.error(error);
        }
    };

    if (!product) {
        return (
            <>
                <ProductLoading isLoggedIn={isLoggedIn} />
            </>
        )
    }

    const handleFavoriteBtn = async (productId) => {
        if (isLoggedIn) {
            try {
                const favoriteResponse = await axios.post(`${API_URL}favorite/${productId}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (favoriteResponse.status === 200) {
                    setClickedFav(true)
                    setUpdateFurniture(true)
                } else {
                    throw new Error(
                        `Failed to add to favorite. Status: ${favoriteResponse.status}`
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
        if (isLoggedIn) {
            try {
                const favoriteResponse = await axios.delete(`${API_URL}favorite/${productId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (favoriteResponse.status === 200) {
                    setClickedFav(true)
                    setUpdateFurniture(true)
                } else {
                    throw new Error(
                        `Failed to remove favorite. Status: ${favoriteResponse.status}`
                    );
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const productInfo = product[0];
    return (
        <section id="topDetails" className='marginReducer' onClick={() => { setShowProfile(false) }}>
            {loginAlert &&
                <div className='loginAlertWrapper'>
                    <LoginAlert setLoginAlert={setLoginAlert} setModalEmail={setModalEmail} modalEmail={modalEmail} setDemoUser={setDemoUser} />
                </div>}
            {showImageSlider &&
                <div className='imageSliderContainerBox'>
                    <ImageSlider images={productInfo.images} setShowImageSlider={setShowImageSlider} imgIndex={imgIndex} />
                </div>
            }
            <section className='mobileImgView'>
                <div className='imageSliderContainerBox'>
                    <ImageSlider images={productInfo.images} setShowImageSlider={setShowImageSlider} imgIndex={imgIndex} />
                </div>
            </section>


            <div className='productDetailBox'>
                <section className='imageGallery'>
                    <img className="productImg1" src={productInfo.images[0]} alt="product Image" onClick={() => { setShowImageSlider(true); setImgIndex(0) }} loading='lazy' />

                    <div className='bottomImages' >
                        <img className="productImg2" src={productInfo.images[1]} alt="product Image" onClick={() => { setShowImageSlider(true); setImgIndex(1) }} loading='lazy' />
                        <img className="productImg3" src={productInfo.images[2]} alt="product Image" onClick={() => { setShowImageSlider(true); setImgIndex(2) }} loading='lazy' />
                        <img className="productImg4" src={productInfo.images[3]} alt="product Image" onClick={() => { setShowImageSlider(true); setImgIndex(3) }} loading='lazy' />
                    </div>
                </section>
                <section className='productDetailsRight'>
                    <div className='reviews'>
                        <div className='start'>
                            <StarRating />
                        </div>
                        <p className='ItemId'>Item No. {productInfo.id}</p>
                    </div>
                    <div className='nameAndPrice'>
                        <h2>{productInfo.title}</h2>
                        {productInfo.type === "chair" ? <div className='discountD '>
                            <p className='discountPriceD '> ${((productInfo.price * .75) * quantity).toFixed(2)}</p><p className='originalPriceD'> ${(productInfo.price * quantity).toFixed(2)}</p>
                        </div>
                            : <p className='regularPrice'>${(productInfo.price * quantity).toFixed(2)} </p>}
                    </div>
                    <div className='quantity'>
                        <div className='quntityBtns'>
                            <div className='plusIcon' onClick={() => { quantity > 1 && setQuantity(quantity - 1) }}>-</div>
                            <p className='otherFont'>0{quantity}</p>
                            <div className='minusIcon' onClick={() => { quantity < 4 && setQuantity(quantity + 1) }}>+</div>
                        </div>
                    </div>
                    {quantity === 4 && <p className='tooManyError'>Maximum capacity reached!</p>}
                    <div className='shipInfo'>
                        <p className='otherFont'>Available to ship in 2 weeks</p>
                    </div>

                    <div className='productBtns'>
                        <button
                            className="addCartBtn otherFont"
                            onClick={() => {
                                addToCart(API_URL, user, productInfo.id, token, currentOrderId, setCurrentOrderId, quantity, setLoginAlert, setCartItems);
                                setAdded(true);
                            }}
                        >
                            {isLoggedIn && added ?
                                <Lottie className="checkAnimation" animationData={check} loop={false} />
                                :
                                " Add to cart"
                            }
                        </button>

                        {isLoggedIn && productInfo.isFavorite ?
                            <button className='saveToWishlist' onClick={() => { removeFavorite(productInfo.id) }}>
                                {isLoggedIn && clickedFav ?
                                    <Lottie className="checkAnimationFav" animationData={check} loop={false} />
                                    :
                                    "Remove from Wishlist"
                                }
                            </button> :
                            <button className='saveToWishlist otherFont' onClick={() => { handleFavoriteBtn(productInfo.id) }}>
                                {isLoggedIn && clickedFav ?
                                    <Lottie className="checkAnimationFav" animationData={check} loop={false} />
                                    :
                                    "Save to Wishlist"
                                }
                            </button>
                        }

                    </div>

                    <div className='moreDetails'>

                        <div className="features"
                            onClick={() => {
                                setDisplayFeatures(!displayFeatures);
                            }}
                        >
                            <p className='otherFont'>Product Features</p>
                            <p className="plus">{!displayFeatures ? "+" : "-"}</p>
                        </div>
                        <section className={`moreDetailsListAnimation ${displayFeatures ? "actives" : ""}`}>
                            {displayFeatures && <Features features={productInfo.features} />}
                        </section>
                        <div className="dimensions"
                            onClick={() => {
                                setDisplayDimensions(!displayDimensions);
                            }}
                        >
                            <p className='otherFont'>Dimensions</p>
                            <p className="plus">{!displayDimensions ? "+" : "-"}</p>
                        </div>
                        <section className={`moreDetailsListAnimation ${displayDimensions ? "actives" : ""}`}>
                            {displayDimensions && <Dimensions dimensions={productInfo.dimensions} />}
                        </section>
                        <div className="description"
                            onClick={() => {
                                setDisplayDescription(!displayDescription);
                            }}
                        >
                            <p className='otherFont'>Description</p>
                            <p className="plus">{!displayDescription ? "+" : "-"}</p>
                        </div>
                        <section className={`moreDetailsListAnimation ${displayDescription ? "actives" : ""}`}>
                            {displayDescription && <Description description={productInfo.description} />}
                        </section>

                        <div className='shiping'
                            onClick={() => { setDisplayShipping(!displayShipping) }}>
                            <p className='otherFont'>Shipping and Return</p>
                            <p className="plus">{!displayShipping ? "+" : "-"}</p>
                        </div>
                        <section className={`moreDetailsListAnimation ${displayShipping ? "actives" : ""}`}>
                            {displayShipping && <Shipping />}
                        </section>
                    </div>
                </section >
            </div >
        </section>
    );
}
