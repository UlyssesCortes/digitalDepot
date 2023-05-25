
const addToCart = async (API_URL, user, productId, token, currentOrderId, setCurrentOrderId, quantity, isLoggedIn) => {
    let items = null;

    setCurrentOrderId(currentOrderId)

    if (!currentOrderId && isLoggedIn) {
        const response = await fetch(`${API_URL}order/myOrders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        // Check if there is an order with isCheckedOut set to false
        const hasUncheckedOrder = data.some((order) => !order.isCheckedOut);
        if (hasUncheckedOrder) {
            // Get the order with isCheckedOut set to false
            const uncheckedOrder = data.find((order) => !order.isCheckedOut);
            setCurrentOrderId(uncheckedOrder.id);
            localStorage.setItem('currentOrderId', uncheckedOrder.id);
        } else {
            // Create a new order
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
                throw new Error(`Failed to add item to cart. Status: ${itemsResponse.status}`);
            }

            items = await itemsResponse.json();

            if (items) {
                alert("Product added to cart!");
            }
        }

    } else if (!isLoggedIn) {
        alert("Need to login to add product")
    }


    try {
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
                throw new Error(`Failed to add item to cart. Status: ${itemsResponse.status}`);
            }

            items = await itemsResponse.json();

            if (items) {
                alert("Product added to cart!");
            }
        }


    } catch (err) {
        console.error(err);
    }
};

export default addToCart;
