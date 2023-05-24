
const addToCart = async (API_URL, user, productId, token, currentOrderId, setCurrentOrderId, quantity) => {
    let items = null;

    setCurrentOrderId(currentOrderId)

    if (!currentOrderId) {
        const response = await fetch(`${API_URL}order/myOrders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();


        console.log("ALL ORDERS: ", data)
        // Check if there is an order with isCheckedOut set to false
        const hasUncheckedOrder = data.some((order) => !order.isCheckedOut);
        console.log("MY ORDER: ", hasUncheckedOrder)
        if (hasUncheckedOrder) {
            // Get the order with isCheckedOut set to false
            const uncheckedOrder = data.find((order) => !order.isCheckedOut);
            console.log(uncheckedOrder)
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
            localStorage.setItem('currentOrderId', order.id);

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


        // data && data.map((order) => {
        //     if (!order.isCheckedOut) {
        //         setCurrentOrderId(order.id)
        //     }
        // })
    }


    try {
        // error occurs because currentOrder does not get registered fast enought
        if (currentOrderId) {
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
