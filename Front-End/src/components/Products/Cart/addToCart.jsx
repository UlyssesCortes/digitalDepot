import axios from 'axios';

import { getCartTestAPI, fetchMyOrdersAPI } from '../../API/AppApi';

const addToCart = async (API_URL, user, productId, token, currentOrderId, setCurrentOrderId, quantity, setLoginAlert, setCartItems) => {

    let items = null;
    const localCurrentOrderId = window.localStorage.getItem('currentOrderId');
    const localIsLoggedIn = window.localStorage.getItem('isLoggedIn');
    setCurrentOrderId(localCurrentOrderId)

    const getCartTest = async () => {
        const data = await getCartTestAPI(API_URL)
        setCartItems(data)
    }

    const addingItem = async (orderId) => {
        console.log("ADDING ITEM")
        const itemsResponse = await axios.post(`${API_URL}order-items/${orderId}`, {
            orderId: orderId,
            productId: productId,
            quantity: quantity
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        items = await itemsResponse.data;
        if (items) {
            getCartTest()
        }

        if (!itemsResponse.ok) {
            throw new Error(`Failed to add item to cart. Status: ${itemsResponse.status}`);
        }
    }

    try {
        if (!localIsLoggedIn) {
            return setLoginAlert(true)
        }

        if (!localCurrentOrderId && localIsLoggedIn) {
            const data = await fetchMyOrdersAPI(token, API_URL)
            if (data.length > 0) {
                localStorage.setItem('currentOrderId', data[0].id);
                setCurrentOrderId(data[0].id)
                addingItem(data[0].id)

            } else {
                console.log("Creating new order");
                const orderResponse = await axios.post(`${API_URL}order`, {
                    userId: user.id,
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                const order = await orderResponse.data;
                setCurrentOrderId(order.id);
                addingItem(order.id)
                if (!orderResponse.ok) {
                    throw new Error(`Failed to create order. Status: ${orderResponse.status}`);
                }
            }
        }

        if (localCurrentOrderId && localIsLoggedIn) {
            addingItem(currentOrderId)
        }
    } catch (err) {
        console.error(err);
    }
};

export default addToCart;
