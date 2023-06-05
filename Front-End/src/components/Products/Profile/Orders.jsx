import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Orders({ finializedOrders, setShowProfile }) {
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleClick = (orderId) => {
        setSelectedOrderId(orderId === selectedOrderId ? null : orderId);
    };

    return (
        <section className='favBox'>
            <section className="favoriteContainer">
                {finializedOrders &&
                    finializedOrders.map((order) => {
                        const isOpen = selectedOrderId === order.order_id;

                        return (
                            <div
                                className="checkoutOrders"
                                key={order.order_id}
                                onClick={() => handleClick(order.order_id)}
                            >
                                <div className="topContentBoxOrder">
                                    <p className="favTitle">{order.checkoutDate}</p>
                                    <div className='leftOrder'>
                                        <p className="itemsQuantity">Items: {order.orderItems.length}</p>
                                        <p className="favPrice"> Price:  ${order.checkoutSum}</p>
                                    </div>
                                </div>
                                <section className='itemsContainer'>
                                    {isOpen && order.orderItems.map((item) => {
                                        return (
                                            <Link to={`/product/${item.productId}`} className='item' key={item.productId} onClick={() => { setShowProfile(false) }}>
                                                <img className='orderImg' src={item.image} alt="" />
                                                <div className='leftItem'>
                                                    <p className='favTitle'>{item.title}</p>
                                                    {item.quantity > 1 ?
                                                        <p className='favPrice'>{item.price} ({item.quantity})</p> :
                                                        <p className='favPrice'>{item.price}</p>
                                                    }
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </section>
                            </div >
                        );
                    })}

            </section >
            <section className='recomendations'>

            </section>
        </section>

    );
}
