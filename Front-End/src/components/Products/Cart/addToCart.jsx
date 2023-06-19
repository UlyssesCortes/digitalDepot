
const addToCart = async (API_URL, user, productId, token, currentOrderId, setCurrentOrderId, quantity, isLoggedIn, setLoginAlert, setCartItems) => {

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

    if (!localCurrentOrderId && localIsLoggedIn) {
        const response = await fetch(`${API_URL}order/myOrders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        const hasUncheckedOrder = data.some((order) => !order.isCheckedOut);

        if (hasUncheckedOrder) {
            const uncheckedOrder = data.find((order) => !order.isCheckedOut);
            setCurrentOrderId(uncheckedOrder.id);
            localStorage.setItem('currentOrderId', uncheckedOrder.id);
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
            const itemsResponse = await fetch(`${API_URL}order-items/${order.id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderId: order.id,
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

    } else if (!localIsLoggedIn) {
        setLoginAlert(true)
    }

    try {
        if (localCurrentOrderId && localIsLoggedIn) {
            const itemsResponse = await fetch(`${API_URL}order-items/${localCurrentOrderId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderId: localCurrentOrderId,
                    productId: productId,
                    quantity: quantity
                })
            });

            if (!itemsResponse.ok) {
                alert(`Failed to add item to cart. Status: ${itemsResponse.status}`)
                throw new Error(`Failed to add item to cart. Status: ${itemsResponse.status}`);
            }
            items = await itemsResponse.json();
            if (items) {
                getCartTest()
            }
        }
    } catch (err) {
        console.error(err);
    }
};

export default addToCart;
