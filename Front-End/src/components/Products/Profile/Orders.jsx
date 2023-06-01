import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Orders({ finializedOrders, token, API_URL }) {
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [productsArray, setProductsArray] = useState([]);

    const fetchProduct = async (productId) => {
        const response = await fetch(`${API_URL}products/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        setProductsArray(data[0]);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (selectedOrderId) {
                const response = await fetch(`${API_URL}order-items/${selectedOrderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setOrderItems(data);
                fetchProduct(data[0].productId);
            }
        };

        fetchData();
    }, [selectedOrderId, token, API_URL]);

    const handleClick = async (orderId) => {
        setSelectedOrderId(orderId);
    };

    return (
        <section className="favoriteContainer">
            {finializedOrders &&
                finializedOrders.map((order) => {
                    return (
                        <div
                            className={`checkoutOrders ${selectedOrderId === order.id ? 'showItems' : ''}`}
                            key={order.id}
                            onClick={() => handleClick(order.id)}
                        >
                            <div className="topContentBoxOrder">
                                <p className="favTitle">{order.checkoutDate}</p>
                                <p className="favPrice">${order.checkoutSum}</p>
                            </div>
                            {selectedOrderId === order.id && (
                                <section className="orderCheckItems">
                                    {orderItems &&
                                        orderItems.map((item) => {
                                            return (
                                                <div className="itemCheckout" key={item.id}>
                                                    <h1>Product Name</h1>
                                                    <h1>{item.quantity}</h1>
                                                    {console.log(productsArray)}
                                                    <p>{productsArray && productsArray.title}</p>
                                                </div>
                                            );
                                        })}
                                </section>
                            )}
                        </div>
                    );
                })}
        </section>
    );
}
