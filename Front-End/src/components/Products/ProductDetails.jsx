import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from "lottie-react"
import check from "../../assets/check.json"

import StarRating from './StartRating';
import Features from './Features';
import Dimensions from './Dimensions';
import Shipping from './Shipping';
import Description from './Description';
import addToCart from './addToCart';
import ProductLoading from '../Loading/ProductLoading';
import ImageSlider from './ImageSlider';
import LoginAlert from '../Login-Register/LoginAlert';

export default function ProductDetails({ API_URL, user, token, currentOrderId, setCurrentOrderId, isLoggedIn, quantity, setQuantity, setShowProfile, setModalEmail, modalEmail }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [displayFeatures, setDisplayFeatures] = useState(false)
    const [added, setAdded] = useState(false)
    const [displayDimensions, setDisplayDimensions] = useState(false)
    const [displayShipping, setDisplayShipping] = useState(false)
    const [displayDescription, setDisplayDescription] = useState(false)
    const [showImageSlider, setShowImageSlider] = useState(false)
    const [imgIndex, setImgIndex] = useState(0)
    const [loginAlert, setLoginAlert] = useState(false)


    useEffect(() => {
        console.log("GETING PRODUCT DETAILS")
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${API_URL}products/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                if (result) {
                    setProduct(result);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [API_URL, id]);

    if (!product) {
        return (
            <>
                <ProductLoading isLoggedIn={isLoggedIn} />
            </>
        )
    }

    const productInfo = product[0];
    return (
        <section id="topDetails" className='marginReducer' onClick={() => { setShowProfile(false) }}>
            {loginAlert &&
                <div className='loginAlertWrapper'>
                    <LoginAlert setLoginAlert={setLoginAlert} setModalEmail={setModalEmail} modalEmail={modalEmail} />
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
                    <img className="productImg1" src={productInfo.images[0]} alt="product Image" onClick={() => { setShowImageSlider(true); setImgIndex(0) }} />

                    <div className='bottomImages' >
                        <img className="productImg2" src={productInfo.images[1]} alt="product Image" onClick={() => { setShowImageSlider(true); setImgIndex(1) }} />
                        <img className="productImg3" src={productInfo.images[2]} alt="product Image" onClick={() => { setShowImageSlider(true); setImgIndex(2) }} />
                        <img className="productImg4" src={productInfo.images[3]} alt="product Image" onClick={() => { setShowImageSlider(true); setImgIndex(3) }} />
                    </div>
                    <div className='dots'>
                        <span className='dot'></span>
                        <span className='dot'></span>
                        <span className='dot'></span>
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
                        {productInfo.type === "chair" ? <div className='discountD'>
                            <p className='discountPriceD'> ${((productInfo.price * .75) * quantity).toFixed(2)}</p><p className='originalPriceD'> ${(productInfo.price * quantity).toFixed(2)}</p>
                        </div>
                            : <p className='regularPrice'>${(productInfo.price * quantity).toFixed(2)} </p>}
                    </div>
                    <div className='quantity'>
                        <div className='quntityBtns'>
                            <div className='minusIcon' onClick={() => { quantity < 4 && setQuantity(quantity + 1) }}>+</div>
                            <p>0{quantity}</p>
                            <div className='plusIcon' onClick={() => { quantity > 1 && setQuantity(quantity - 1) }}>-</div>
                        </div>
                    </div>
                    {quantity === 4 && <p className='tooManyError'>Maximum capacity reached!</p>}
                    <div className='shipInfo'>
                        <p>Available to ship in 2 weeks</p>
                    </div>

                    <div className='productBtns'>
                        <button
                            className="addCartBtn"
                            onClick={() => {
                                addToCart(API_URL, user, productInfo.id, token, currentOrderId, setCurrentOrderId, quantity, isLoggedIn, setLoginAlert);
                                setAdded(true);
                            }}
                        >
                            {isLoggedIn && added ?
                                <Lottie className="checkAnimation" animationData={check} loop={false} />
                                :
                                <p>Add to cart</p>
                            }
                        </button>
                        <button className='saveToWishlist'>Save To Wishlist</button>
                    </div>

                    <div className='moreDetails'>

                        <div className="features"
                            onClick={() => {
                                setDisplayFeatures(!displayFeatures);
                            }}
                        >
                            <p>Product Features</p>
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
                            <p>Dimensions</p>
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
                            <p>Description</p>
                            <p className="plus">{!displayDescription ? "+" : "-"}</p>
                        </div>
                        <section className={`moreDetailsListAnimation ${displayDescription ? "actives" : ""}`}>
                            {displayDescription && <Description description={productInfo.description} />}
                        </section>

                        <div className='shiping'
                            onClick={() => { setDisplayShipping(!displayShipping) }}>
                            <p>Shipping and Return</p>
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
