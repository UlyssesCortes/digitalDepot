import Header from '../Navbar/Header'
import React, { useState, useEffect } from 'react';
import CartLoading from '../Loading/CartLoading';
import { Link } from 'react-router-dom';


export default function Cart({ API_URL, token, currentOrderId, setCurrentOrderId, isLoggedIn, setIsLoggedIn }) {

    const [myCart, setMyCart] = useState([])
    const [products, setProducts] = useState([])
    const [updatedCheckout, setUpdatedCheckout] = useState({
        isCheckedOut: null,
        checkoutDate: "",
        checkoutSum: null
    })

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


    const increaseQuantity = (index) => {
        if (myCart[index].quantity < 4) {
            myCart[index].quantity += 1;
            console.log(myCart[index].quantity);
        }
    }

    const decreaseQuantity = (index) => {
        if (myCart[index].quantity > 1) {
            myCart[index].quantity -= 1;
            console.log(myCart[index].quantity);
        }
    }

    const handleUpdate = async (orderId) => {
        // Create a new Date object
        var currentDate = new Date();

        // Calculate the checkout date (e.g., add 7 days)
        var checkoutDate = new Date(currentDate);
        checkoutDate.setDate(currentDate.getDate());

        // Get the individual date components
        var month = checkoutDate.getMonth() + 1;
        var day = checkoutDate.getDate();
        var year = checkoutDate.getFullYear();

        // Format the date string
        var formattedDate = month + '/' + day + '/' + year;

        console.log("DATA: ", formattedDate)

        setUpdatedCheckout({ ...updatedCheckout, isCheckedOut: true })
        setUpdatedCheckout({ ...updatedCheckout, checkoutDate: formattedDate })
        setUpdatedCheckout({ ...updatedCheckout, checkoutSum: sum })

        try {
            const response = await fetch(`${API_URL}order/${orderId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedCheckout)
            });
            const result = await response.json();
            console.log("result: ", result)
            console.log("response: ", response)
            if (result.name !== "error") {
                localStorage.removeItem('currentOrderId')
                console.log("Order sent!")
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
                                        <p>+tax</p>
                                    </div>

                                    <div className='bottomContentBox'>

                                        <div className='quntityBtns'>

                                            <div className='minusIcon' onClick={() => { increaseQuantity(index) }}>+</div>
                                            <p>0{products.length === myCart.length ? myCart[index].quantity : 0}</p>
                                            <div className='plusIcon' onClick={() => { decreaseQuantity(index) }}>-</div>
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
