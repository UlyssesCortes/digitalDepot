import Header from '../Navbar/Header'
import React, { useState, useEffect } from 'react';
import CartLoading from '../Loading/CartLoading';
import { Link } from 'react-router-dom';


export default function Cart({ API_URL, token, currentOrderId, setCurrentOrderId, isLoggedIn }) {

    const [myCart, setMyCart] = useState([])
    const [products, setProducts] = useState([])

    let sum = 0;

    const getOrders = async () => {
        try {


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
            getOrders()
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

    // NEED TO UPDATE CHECKOUT TO HAVE CHECKOUT BE TRUE WHEN CLICKED AND RESET THER CURRENTID TO ""
    // const checkOut = async (itemId) => {
    //     try {
    //         const response = await fetch(`${API_URL}order${itemId}`, {
    //             method: "PATCH",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Failed to delete item. Status: ${response.status}`);
    //         }

    //         console.log("Item deleted successfully");
    //         getOrders()
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    useEffect(() => {
        getOrders()
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
            <Header isLoggedIn={isLoggedIn} />
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
                        {products && products.map((data, index) =>
                            <div className="cartProduct" key={data.id + '-' + index}>
                                <img className='cartProductImg' src={data.images[0]} alt="" />
                                <div className='contentBox'>
                                    <div className='topContentBox'>
                                        <h3>{data.title}</h3>
                                        <h3>${data.price}</h3>
                                        <p className='invisSum'> {sum += parseFloat(data.price)}</p>
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
                            <Link to='/products'>
                                <button>Checkout</button>
                            </Link>
                        </section>
                    }
                </div>
            </section>
        </section>
    )
}
