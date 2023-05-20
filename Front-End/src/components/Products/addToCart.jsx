const addToCart = async (API_URL, user, productId, token) => {
    console.log(productId);
    console.log(token);
    let order = null;
    let items = null;

    try {
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

        console.log("Order Response:", orderResponse);
        order = await orderResponse.json();
        console.log("Order:", order);

        const itemsResponse = await fetch(`${API_URL}order-items/${productId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                orderId: order.id,
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
