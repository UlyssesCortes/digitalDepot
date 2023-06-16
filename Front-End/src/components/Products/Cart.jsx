import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dotenv from 'dotenv';
import Lottie from "lottie-react"
import checkout from "../../assets/LottieAnimations/checkout.json"
import emptyCartAnimation from "../../assets/LottieAnimations/box.json"
import loadingAnimation from "../../assets/LottieAnimations/loadingLines.json"
import Favorites from './Profile/Favorites';
import Orders from './Profile/Orders';
// import { getOrderItems2 } from '../../API/cartApi';
import { loadStripe } from '@stripe/stripe-js'

export default function Cart({ API_URL, token, currentOrderId, setCurrentOrderId, isLoggedIn, setShowProfile, favorites, finializedOrders, showFavorite, setShowFavorite, showOrder, setShowOrder, pageTitle, setPageTitle, setShowCart, showCart, cartItems, setCartItems }) {

    const [myCart, setMyCart] = useState([])
    const [loading, setLoading] = useState(false)
    const [checkoutAnimation, setCheckoutAnimation] = useState(false)
    const [emptyCart, setEmptyCart] = useState(false);
    const [stripeLoading, setStripeLoading] = useState(false)
    const segments = [2.5, 3];
    let sum = 0;
    let stripePromise


    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe("pk_test_51NDdY6II4Zr4AaFdZKvdWouisBvtIdpBLp8Do9RwkAnqHFvXOKOkVfUrSK28BnowQptv30UgnBErZWXOdifUEyk20038VijbMi")
        }
        return stripePromise
    }

    const getOrderItems = async () => {
        try {
            if (currentOrderId) {
                const response = await fetch(`${API_URL}order-items/${currentOrderId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                const items = await response.json();
                setMyCart(items)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getCartTest = async () => {
        try {
            const localToken = window.localStorage.getItem('token');

            const response = await fetch(`${API_URL}order/cart`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localToken}`,
                },
            })
            const items = await response.json();
            setCartItems(items)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`${API_URL}order-items/${itemId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete item. Status: ${response.status}`);
            }

            getOrderItems()
            getCartTest()

        } catch (error) {
            console.error(error);
        }

    };
    const increaseQuantity = async (data, index) => {
        console.log(data)
        if (data.quantity < 4) {
            let currentQuantity = data.quantity + 1;
            const orderItemId = data.order_id;
            console.log(`${API_URL}order-items/${orderItemId}`)

            try {
                const response = await fetch(`${API_URL}order-items/${orderItemId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ quantity: currentQuantity }),
                });
                console.log(response)
                if (response.ok) {
                    setCartItems((pertCartItems) => {
                        const updatedCart = [...pertCartItems];
                        console.log("UPDATECART: ", updatedCart)
                        updatedCart[index].quantity = currentQuantity;
                        return updatedCart;
                    });
                }
                // getCartTest()
            } catch (error) {
                console.log(error);
            }
        }

    };

    const decreaseQuantity = async (index) => {
        if (myCart[index].quantity > 1) {
            let currentQuantity = myCart[index].quantity - 1;
            const orderItemId = myCart[index].id;

            try {
                const response = await fetch(`${API_URL}order-items/${orderItemId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ quantity: currentQuantity }),
                });

                if (response.ok) {
                    setMyCart((prevCart) => {
                        const updatedCart = [...prevCart];
                        updatedCart[index].quantity = currentQuantity;
                        return updatedCart;
                    });
                }
                getCartTest()
            } catch (error) {
                console.log(error);
            }
        }
    };
    // If type == chair 10%discount or add coupon code 
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
        successUrl: `${window.location.origin}`,
        cancelUrl: `${window.location.origin}/cart`
    }

    const redirectToCheckout = async () => {
        setStripeLoading(true)
        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout(checkoutOptions)
        if (error.message) {
            alert(error.message)
        }
        setStripeLoading(false)
        getCartTest()

    }

    const handleUpdate = async (orderId) => {

        var currentDate = new Date();
        var checkoutDate = new Date(currentDate);
        checkoutDate.setDate(currentDate.getDate());

        var month = checkoutDate.getMonth() + 1;
        var day = checkoutDate.getDate();
        var year = checkoutDate.getFullYear();

        var formattedDate = month + '/' + day + '/' + year;

        try {
            const response = await fetch(`${API_URL}order/${orderId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    isCheckedOut: true,
                    checkoutDate: formattedDate,
                    checkoutSum: sum
                })
            });
            const result = await response.json();

            if (result.name !== "error") {
                localStorage.setItem('currentOrderId', "");
                setMyCart([])
                setCurrentOrderId("")
                setCheckoutAnimation(true)
            } else {
                console.log("Failed to send order, try again!")
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getOrderItems()
    }, [token]);

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
        if (myCart.length === 0) {
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
    }, [myCart]);

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
        }, 3500);

        return <Lottie className="checkoutAnimation" animationData={checkout} loop={false} segments={segments} />
    }

    return (
        <section className='cartContainer marginReducer' onClick={() => { setShowProfile(false) }}>
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
                            <button>Continue Shoping</button>
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
                                    <Link to={`/product/${data.id}`}>
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
                                            <div className='minusIcon' onClick={() => { decreaseQuantity(index) }}>-</div>
                                        </div>
                                        <button className='removeBtn' onClick={() => deleteItem(data.id)}>Remove item</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showFavorite && <Favorites favorites={favorites} />}
                        {showOrder && <Orders finializedOrders={finializedOrders} />}
                    </section>
                    {isLoggedIn && showCart &&
                        <section className='CartBtnContainer'>
                            <p className='totalPrice'>Total ${parseFloat(sum)}</p>
                            {/* <button onClick={() => { handleUpdate(currentOrderId) }}>Checkout</button> */}
                            <button onClick={() => { redirectToCheckout() }} disabled={stripeLoading}>{!stripeLoading ? "Checkout" : "Loading..."}</button>
                        </section>
                    }
                </div>
            </section>



        </section>
    )
}
