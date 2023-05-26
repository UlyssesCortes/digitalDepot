import Header from '../Navbar/Header'
import React, { useState, useEffect } from 'react';
import CartLoading from '../Loading/CartLoading';
import { Link } from 'react-router-dom';


export default function Cart({ API_URL, token, currentOrderId, setCurrentOrderId, isLoggedIn, setIsLoggedIn }) {

    const [myCart, setMyCart] = useState([])
    const [products, setProducts] = useState([])

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
            let currentQuantity = myCart[index].quantity += 1;
            const orderItemId = myCart[index].id
            // myCart[index].quantity += 1;
            try {
                const response = await fetch(`${API_URL}order-items/${orderItemId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ quantity: currentQuantity })
                });
                if (response.ok) {
                    getOrderItems()
                }
            } catch (error) {
                console.log(error)
            }
            console.log(myCart[index].quantity);
        }
    }

    const decreaseQuantity = async (index) => {
        if (myCart[index].quantity > 1) {

            let currentQuantity = myCart[index].quantity -= 1;
            const orderItemId = myCart[index].id
            try {
                const response = await fetch(`${API_URL}order-items/${orderItemId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ quantity: currentQuantity })
                });
                if (response.ok) {
                    getOrderItems()
                }
            } catch (error) {
                console.log(error)
            }
            console.log(myCart[index].quantity);
        }
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
                alert("Checked out succesfully!")
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
    }, [myCart]);

    return (
        <section className='cartContainer marginReducer'>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <section className='cartSection'>
                <div className='subHeaderCart'>
                    <h1>SHOPPING CART</h1>
                    <section className='CartBtnContainer'>
                        <p className='totalPrice'>My Cart</p>
                        <Link to='/products'>
                            <button>Continue Shoping</button>
                        </Link>
                    </section>

                    <section className='productsSec'>
                        {myCart.length === 0 && <CartLoading />}
                        {isLoggedIn && products && products.map((data, index) =>
                            <div className="cartProduct" key={data.id + '-' + index}>
                                <img className='cartProductImg' src={data.images[0]} alt="" />
                                <div className='contentBox'>
                                    <div className='topContentBox'>
                                        <h3>{data.title}</h3>
                                        <h3>${data.price}</h3>
                                        <p className='invisSum'>
                                            {products.length === myCart.length ? sum += parseFloat(myCart[index].quantity) * data.price : sum += parseFloat(data.price)}
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

                    </section>
                    {myCart.length > 0 &&
                        <section className='CartBtnContainer'>
                            <p className='totalPrice'>Total ${sum}</p>
                            <button onClick={() => { handleUpdate(currentOrderId) }}>Checkout</button>
                        </section>
                    }
                </div>
            </section>
        </section>
    )
}
