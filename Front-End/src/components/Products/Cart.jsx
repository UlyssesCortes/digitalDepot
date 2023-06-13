import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react"
import checkout from "../../assets/LottieAnimations/checkout.json"
import emptyCartAnimation from "../../assets/LottieAnimations/box.json"
import loadingAnimation from "../../assets/LottieAnimations/loadingLines.json"
import Favorites from './Profile/Favorites';
import Orders from './Profile/Orders';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import { getOrderItems2 } from '../../API/cartApi';

export default function Cart({ API_URL, token, currentOrderId, setCurrentOrderId, isLoggedIn, setShowProfile, favorites, finializedOrders, showFavorite, setShowFavorite, showOrder, setShowOrder, pageTitle, setPageTitle, setShowCart, showCart }) {

    const [myCart, setMyCart] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [checkoutAnimation, setCheckoutAnimation] = useState(false)
    const [emptyCart, setEmptyCart] = useState(false);
    const [stripeForm, setStripForm] = useState(false);
    const segments = [2.5, 3];
    const stripePromise = loadStripe("pk_test_51NDdY6II4Zr4AaFdZKvdWouisBvtIdpBLp8Do9RwkAnqHFvXOKOkVfUrSK28BnowQptv30UgnBErZWXOdifUEyk20038VijbMi");

    // const stripe = useStripe();
    // const elements = useElements();
    const cardElementRef = useRef(null);


    let sum = 0;

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

            console.log("Item deleted successfully");
            getOrderItems()
        } catch (error) {
            console.error(error);
        }
    };
    const increaseQuantity = async (index) => {
        if (myCart[index].quantity < 4) {
            let currentQuantity = myCart[index].quantity + 1;
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
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCheckoutStripe = async (orderId) => {
        const stripe = await stripePromise;

        const response = await fetch(`${API_URL}order/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                amount: sum * 100,
            }),
        });
        const cardElement = elements.getElement(CardElement);
        const { clientSecret } = await response.json();
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (result.error) {
            // Handle payment error
            console.error(result.error);
        } else {
            // Payment succeeded
            if (result.paymentIntent.status === 'succeeded') {
                try {
                    // Update the order as checked out
                    const response = await fetch(`${API_URL}order/${orderId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            isCheckedOut: true,
                            checkoutSum: sum,
                        }),
                    });

                    const result = await response.json();

                    if (result.name !== 'error') {
                        localStorage.setItem('currentOrderId', '');
                        setMyCart([]);
                        setProducts([]);
                        setCurrentOrderId('');
                        setCheckoutAnimation(false);
                    } else {
                        console.log('Failed to send order, try again!');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };


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
                setProducts([])
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
        const getProducts = async () => {
            try {
                const myProductData = await Promise.all(
                    myCart && myCart.map((product) =>
                        fetch(`${API_URL}products/${product.productId}`)
                            .then((response) => response.json())
                            .catch((error) => console.error(error))
                    )
                );
                setProducts(myProductData.flat());
            } catch (error) {
                console.error(error);
            }
        };
        getProducts();

        if (myCart.length === 0) {
            setLoading(true);
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [myCart]);


    useEffect(() => {
        let timeoutId;

        if (myCart.length === 0) {
            timeoutId = setTimeout(() => {
                setEmptyCart(true);
                setLoading(false)
            }, 450);
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

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
            },
        },
        hidePostalCode: true,
    };


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
                    <section className={`productsSec ${myCart.length > 2 && "moreGap"}`}>
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

                        {!loading && showCart && isLoggedIn && products && products.map((data, index) =>
                            <div className="cartProduct" key={data.id + '-' + index}>

                                <div className='contentBox'>
                                    <Link to={`/product/${data.id}`}>
                                        <img className='cartProductImg' src={data.images[0]} alt="" loading='lazy' />
                                    </Link>
                                    <div className='topContentBox'>
                                        <h3>{data.title}</h3>
                                        {data.type === "chair" ? <div className='discount'>
                                            <h3 className='discountPrice'> ${(data.price * .75).toFixed(2)}</h3><h3 className='originalPrice'> ${data.price}</h3>
                                        </div>
                                            : <h3>${data.price}</h3>}
                                        <p className='invisSum'>
                                            {products.length === myCart.length ?
                                                data.type === "chair" ? sum += parseFloat((((myCart[index].quantity) * data.price) * .75).toFixed(2)) :
                                                    sum += parseFloat((myCart[index].quantity) * data.price) : sum += parseFloat(data.price)}
                                        </p>
                                    </div>

                                    <div className='bottomContentBox'>

                                        <div className='quntityBtns'>

                                            <div className='plusIcon' onClick={() => { increaseQuantity(index) }}>+</div>
                                            <p>0{products.length === myCart.length ? myCart[index].quantity : 0}</p>
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

                    {showCart && isLoggedIn && (
                        <section className='CartBtnContainer'>
                            <p className='totalPrice'>Total ${parseFloat(sum)}</p>
                            <button onClick={() => { setCheckoutAnimation(true) }}>Checkout</button>
                            {/* {checkoutAnimation && (
                                <div className='stripe-form'>
                                    <CardElement />
                                    <button onClick={() => handleCheckoutStripe(currentOrderId)}>Pay</button>
                                </div>
                            )} */}
                        </section>
                    )}
                    <Elements stripe={stripePromise}>
                        <div className='stripe-form'>
                            <CardElement options={cardElementOptions} />
                            <button onClick={() => handleCheckoutStripe(currentOrderId)}>Pay</button>
                        </div>
                    </Elements>


                    {/* <Elements stripe={stripePromise}>
                      
                        <div className='stripe-form'>
                            <CardElement />
                            <button onClick={() => handleCheckoutStripe(currentOrderId)}>Pay</button>
                        </div>
                    </Elements> */}


                    {/* {isLoggedIn && showCart &&
                        <section className='CartBtnContainer'>
                            <p className='totalPrice'>Total ${parseFloat(sum)}</p>
                            <button onClick={() => { handleUpdate(currentOrderId) }}>Checkout</button>
                        </section>
                    } */}
                </div>
            </section>
        </section>
    )
}
