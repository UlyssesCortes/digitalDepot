
const addToCart = async (API_URL, user, productId, token, currentOrderId, setCurrentOrderId) => {
    let order = null;
    let items = null;

    try {
        if (!currentOrderId) {
            console.log("Creating new order")
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
            // Do this when ther is no order with checkout false
            console.log("Order Response:", orderResponse);
            order = await orderResponse.json();
            setCurrentOrderId(order.id);
            console.log("Order:", order);
        }

        console.log("Updating Order: ", currentOrderId)

        const itemsResponse = await fetch(`${API_URL}order-items/${currentOrderId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                orderId: currentOrderId,
                productId: productId,
                quantity: 1
            })
        });

        if (!itemsResponse.ok) {
            throw new Error(`Failed to add item to cart. Status: ${itemsResponse.status}`);
        }

        items = await itemsResponse.json();

        if (items) {
            alert("Product added to cart!");
        }

        console.log(items);
    } catch (err) {
        console.error(err);
    }
};

export default addToCart;
