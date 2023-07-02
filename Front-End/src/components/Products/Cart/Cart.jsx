import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Lottie from "lottie-react"
import checkout from "../../../assets/LottieAnimations/checkout.json"
import copyAnimation from "../../../assets/LottieAnimations/copy.json"

import emptyCartAnimation from "../../../assets/LottieAnimations/box.json"
import loadingAnimation from "../../../assets/LottieAnimations/loadingLines.json"
import Favorites from '../Profile/Favorites';
import Orders from '../Profile/Orders';

import { loadStripe } from '@stripe/stripe-js'

export default function Cart({ API_URL, token, isLoggedIn, setShowProfile, favorites, finializedOrders, showFavorite, setShowFavorite, showOrder, setShowOrder, pageTitle, setPageTitle, setShowCart, showCart, cartItems, setCartItems }) {

    const [loading, setLoading] = useState(false)
    const [checkoutAnimation, setCheckoutAnimation] = useState(false)
    const [emptyCart, setEmptyCart] = useState(false);
    const [creditHover, setCreditHover] = useState(false)
    const [creditBtnHover, setCreditBtnHover] = useState(false)
    const [stripeLoading, setStripeLoading] = useState(false)
    const [copy, setCopy] = useState(false);
    const creditCardNumber = '4242 4242 4242 4242'
    const segments = [2.5, 3];
    let sum = 0;
    let stripePromise

    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHIBLE_KEY)
        }
        return stripePromise
    }

    const getCartTest = async () => {
        try {
            const localToken = window.localStorage.getItem('token');

            const response = await axios.get(`${API_URL}order/cart`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localToken}`,
                },
            })
            const items = await response.data;
            setCartItems(items)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteItem = async (data) => {
        try {
            const response = await axios.delete(`${API_URL}order-items/${data.productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseBody = await response.data;
            console.log(responseBody);
            getCartTest()
        } catch (error) {
            console.error(error);
        }
    };

    const updateQuantity = async (data, index, quantity) => {
        const response = await axios.patch(`${API_URL}order-items/${data.orderItemId}`, {
            quantity: quantity
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            setCartItems((pertCartItems) => {
                const updatedCart = [...pertCartItems];
                updatedCart[index].quantity = quantity;
                return updatedCart;
            });
        }
    }

    const increaseQuantity = async (data, index) => {
        if (data.quantity < 4) {
            let currentQuantity = data.quantity + 1;
            try {
                updateQuantity(data, index, currentQuantity)
            } catch (error) {
                console.log(error);
            }
        }

    };

    const decreaseQuantity = async (data, index) => {
        if (data.quantity > 1) {
            let currentQuantity = data.quantity - 1;

            try {
                updateQuantity(data, index, currentQuantity)
            } catch (error) {
                console.log(error);
            }
        }
    };

    const items = cartItems && cartItems.map((product) => ({
        price: product.stripePrice,
        quantity: product.quantity
    }))

    const checkoutOptions = {
        lineItems: items.map((item) => ({
            price: item.price,
            quantity: item.quantity,
        })),
        mode: "payment",
        successUrl: `${window.location.origin}/paymentSuccess?payment=success`,
        cancelUrl: `${window.location.origin}/cart`
    }

    const redirectToCheckout = async () => {
        localStorage.setItem('totalSum', sum)

        setStripeLoading(true)
        if (sum > 0) {
            const stripe = await getStripe()
            const { error } = await stripe.redirectToCheckout(checkoutOptions)
            if (error) {
                alert(error.message)
            }
            setStripeLoading(false)
            setCartItems([])
        }
    }

    useEffect(() => {
        if (cartItems.length === 0) {
            setLoading(true);
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [cartItems]);


    useEffect(() => {
        let timeoutId;
        if (cartItems.length === 0) {
            timeoutId = setTimeout(() => {
                setEmptyCart(true);
                setLoading(false)
            }, 650);
        } else {
            clearTimeout(timeoutId);
            setEmptyCart(false);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [cartItems]);

    const handleFavClick = () => {
        setShowFavorite(true)
        setShowCart(false)
        setShowOrder(false)
        setPageTitle("FAVORITES")
    }
    const handleOrderClick = () => {
        setShowFavorite(false)
        setShowCart(false)
        setShowOrder(true)
        setPageTitle("ORDER HISTORY")
    }
    const handleCartClick = () => {
        setShowFavorite(false)
        setShowCart(true)
        setShowOrder(false)
        setPageTitle(" SHOPPING CART")
    }

    const handleAnimation = () => {
        setTimeout(() => {
            setCheckoutAnimation(false)
        }, 3300);

        return <Lottie className="checkoutAnimation" animationData={checkout} loop={false} segments={segments} />
    }

    const creditAnimation = {
        hover: {
            scale: creditBtnHover ? 1 : 1.2,
            rotate: creditBtnHover ? 8 : 10,
            y: creditBtnHover ? -30 : -180
        }
    }

    const handleCreditCardClick = () => {
        navigator.clipboard.writeText(creditCardNumber)
            .then(() => {
                console.log('Text copied to clipboard');
                setCopy(true)
                setTimeout(() => setCopy(false), 700);
            })
            .catch((error) => {
                console.log('Failed to copy text:', error);
            });
    };

    return (
        <section className='marginReducer' onClick={() => { setShowProfile(false) }}>

            <section className='cartSection'>
                <div className='subHeaderCart'>
                    <h1>{pageTitle}</h1>
                    <section className='CartBtnContainer'>
                        <div className='myCartBtnContainer' onClick={() => { handleCartClick() }}>
                            <p className='cartLink' >My Cart</p>
                        </div>
                        <div className='dropDownBox' onClick={() => { handleFavClick() }}>
                            <p className='cartLink'>Favorites</p>
                        </div>
                        <div className='dropDownBox' onClick={() => { handleOrderClick() }}>
                            <p className='cartLink'>Orders</p>
                        </div>
                        <Link to='/products'>
                            <button className='hideBtn'>Continue Shoping</button>
                        </Link>

                    </section>

                    {/* CART COMPONENT */}
                    <section className={`productsSec ${cartItems.length > 2 && "moreGap"}`}>
                        {isLoggedIn && loading && !showFavorite && !showOrder && !checkoutAnimation &&
                            <div className="loadingWrapper">
                                <Lottie className="loadingAnimation" animationData={loadingAnimation} />
                            </div>}

                        {isLoggedIn && showCart && emptyCart && <div className="loadingWrapper">
                            <p className='emptyCart'>Cart is empty</p>
                            <Lottie className="emptyAnimation" animationData={emptyCartAnimation} />
                        </div>}

                        {!isLoggedIn &&
                            <p className='emptyCart'>Log in to see details</p>
                        }

                        {checkoutAnimation && !showFavorite && !showOrder && handleAnimation()}

                        {!loading && showCart && isLoggedIn && cartItems && cartItems.map((data, index) =>
                            <div className="cartProduct" key={data.id + '-' + index}>

                                <div className='contentBox'>
                                    <Link to={`/products/${data.productId}`}>
                                        <img className='cartProductImg' src={data.image} alt="" loading='lazy' />
                                    </Link>
                                    <div className='topContentBox'>
                                        <h3>{data.title}</h3>
                                        {data.type === "chair" ? <div className='discount'>
                                            <h3 className='discountPrice'> ${(data.price * .75).toFixed(2)}</h3><h3 className='originalPrice'> ${data.price}</h3>
                                        </div>
                                            : <h3>${data.price}</h3>}
                                        <p className='invisSum'>
                                            {data.type === "chair" ? sum += parseFloat((((data.quantity) * data.price) * .75).toFixed(2)) :
                                                sum += parseFloat((data.quantity) * data.price)}
                                        </p>
                                    </div>


                                    <div className='bottomContentBox'>

                                        <div className='quntityBtns'>

                                            <div className='plusIcon' onClick={() => { increaseQuantity(data, index) }}>+</div>
                                            <p>0{data.quantity}</p>
                                            <div className='minusIcon' onClick={() => { decreaseQuantity(data, index) }}>-</div>
                                        </div>
                                        <button className='removeBtn' onClick={() => deleteItem(data)}>Remove item</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showFavorite && <Favorites favorites={favorites} />}
                        {showOrder && <Orders finializedOrders={finializedOrders} />}
                    </section>

                    {showCart && !emptyCart &&
                        <section className='creditSection'>
                            <motion.div className="credit"
                                animate={creditHover ? 'hover' : 'initial'}
                                whileTap={{ scale: 1.1, rotate: 25 }}
                                variants={creditAnimation}
                                onMouseEnter={() => setCreditHover(true)}
                                onMouseLeave={() => setCreditHover(false)}
                                onClick={() => { handleCreditCardClick() }}>
                                {showCart && copy && <Lottie className='copyAni' animationData={copyAnimation} loop={false} />}
                                <div className="visa_logo">
                                    <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="" />
                                </div>
                                <div className="visa_info">
                                    <img className='chip' src="https://img.icons8.com/?size=512&id=pRrkw6sJDhF_&format=png" alt="" />
                                    <p>4242 4242 4242 4242</p>
                                </div>
                                <div className="visa_crinfo">
                                    <section className='visaDetail'>
                                        <div>
                                            <p>Ex. Date</p>
                                            <p>04/24</p>
                                        </div>
                                        <div>
                                            <p>CVV</p>
                                            <p>242</p>
                                        </div>
                                    </section>
                                    <p>Test Card Name</p>
                                </div>
                            </motion.div>
                        </section>
                    }

                    {isLoggedIn && showCart && !emptyCart &&
                        <section className='CartBtnContainer bottomCartContainer'>
                            <p className='totalPrice'>Total ${parseFloat(sum)}</p>
                            <button className='checkoutBtn' onClick={() => { redirectToCheckout() }} disabled={stripeLoading}
                                onMouseEnter={() => { setCreditBtnHover(true); setCreditHover(true) }}
                                onMouseLeave={() => { setCreditBtnHover(false); setCreditHover(false) }}>{!stripeLoading ? "Checkout" : "Loading..."}</button>
                        </section>
                    }

                </div>
            </section >
        </section >
    )
}
