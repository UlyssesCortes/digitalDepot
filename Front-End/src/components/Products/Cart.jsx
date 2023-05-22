import Header from '../Header'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Cart({ API_URL, token }) {

    const [myCart, setMyCart] = useState([])
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(1);

    let sum = 0;

    const getOrders = async () => {
        try {
            const response = await fetch(`${API_URL}order/myOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data) {
                const myCartData = await Promise.all(
                    data && data.map((order) =>
                        fetch(`${API_URL}order-items/${order.id}`)
                            .then((response) => response.json())
                            .catch((error) => console.error(error))
                    )
                );

                setMyCart(myCartData.flat());
            }

        } catch (error) {
            console.error(error);
        }
    }

    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`${API_URL}order/${itemId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedCart = myCart.filter((item) => item.id !== itemId);
                setMyCart(updatedCart);
            } else {
                // Handle error if the response is not OK
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error(error);
            // Handle the error gracefully (e.g., display an error message)
        }
    };


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
            <Header />
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
                                            <div className='minusIcon' onClick={() => { quantity < 4 && setQuantity(quantity + 1) }}>+</div>
                                            <p>0{quantity}</p>
                                            <div className='plusIcon' onClick={() => { quantity > 1 && setQuantity(quantity - 1) }}>-</div>
                                        </div>

                                        <button className='removeBtn' onClick={() => deleteItem(data.id)}>Remove item</button>
                                        {/* <button className='removeBtn'>Remove item</button> */}
                                    </div>

                                </div>
                            </div>
                        )}

                    </section>
                    <section className='CartBtnContainer'>
                        <p className='totalPrice'>Total ${sum}</p>
                        <Link to='/products'>
                            <button>Checkout</button>
                        </Link>
                    </section>
                </div>
            </section>
        </section>
    )
}
