
const addToCart = async (API_URL, user, productId, token, currentOrderId, setCurrentOrderId, quantity, setLoginAlert, setCartItems) => {

    let items = null;
    const localCurrentOrderId = window.localStorage.getItem('currentOrderId');
    const localIsLoggedIn = window.localStorage.getItem('isLoggedIn');
    setCurrentOrderId(localCurrentOrderId)

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

    const addingItem = async (orderId) => {
        console.log("ADDING ITEM")
        const itemsResponse = await fetch(`${API_URL}order-items/${orderId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                orderId: orderId,
                productId: productId,
                quantity: quantity
            })
        });

        if (!itemsResponse.ok) {
            throw new Error(`Failed to add item to cart. Status: ${itemsResponse.status}`);
        }
        items = await itemsResponse.json();
        if (items) {
            getCartTest()
        }
    }

    try {
        if (!localIsLoggedIn) {
            return setLoginAlert(true)
        }

        if (!localCurrentOrderId && localIsLoggedIn) {
            const response = await fetch(`${API_URL}order/myOrders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.length > 0) {
                localStorage.setItem('currentOrderId', data[0].id);
                setCurrentOrderId(data[0].id)
                addingItem(data[0].id)

            } else {
                console.log("Creating new order");
                const orderResponse = await fetch(`${API_URL}order`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        userId: user.id,
                    })
                });

                if (!orderResponse.ok) {
                    throw new Error(`Failed to create order. Status: ${orderResponse.status}`);
                }
                const order = await orderResponse.json();
                setCurrentOrderId(order.id);
                addingItem(order.id)
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
