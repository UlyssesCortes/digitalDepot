
const addToCart = async (API_URL, user, productId, token, currentOrderId, setCurrentOrderId, quantity, isLoggedIn, setLoginAlert) => {

    let items = null;
    console.log("isLoggedIn: ", isLoggedIn)
    setCurrentOrderId(currentOrderId)

    if (!currentOrderId && isLoggedIn) {
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
                    orderId: currentOrderId,
                    productId: productId,
                    quantity: quantity
                })
            });

            if (!itemsResponse.ok) {
                throw new Error(`Failed to add item to cart. Status: ${itemsResponse.status}`);
            }
            items = await itemsResponse.json();
        }

    } else if (!isLoggedIn) {
        setLoginAlert(true)
    }

    try {
        console.log(token)
        // error occurs because currentOrder does not get registered fast enought
        if (currentOrderId && isLoggedIn) {
            const itemsResponse = await fetch(`${API_URL}order-items/${currentOrderId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderId: currentOrderId,
                    productId: productId,
                    quantity: quantity
                })
            });

            if (!itemsResponse.ok) {
                alert(`Failed to add item to cart. Status: ${itemsResponse.status}`)
                throw new Error(`Failed to add item to cart. Status: ${itemsResponse.status}`);
            }
            items = await itemsResponse.json();
            console.log(items)
        }


    } catch (err) {
        console.error(err);
    }
};

export default addToCart;
