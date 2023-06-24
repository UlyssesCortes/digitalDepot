import axios from 'axios';

const addToCart = async (API_URL, user, productId, token, currentOrderId, setCurrentOrderId, quantity, setLoginAlert, setCartItems) => {

    let items = null;
    const localCurrentOrderId = window.localStorage.getItem('currentOrderId');
    const localIsLoggedIn = window.localStorage.getItem('isLoggedIn');
    setCurrentOrderId(localCurrentOrderId)

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
            const response = await axios.get(`${API_URL}order/myOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.data;

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
