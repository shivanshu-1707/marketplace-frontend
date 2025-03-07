import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/orders")
            .then(response => setOrders(response.data))
            .catch(error => console.error("Error fetching orders:", error));
    }, []);

    return (
        <div>
            <h1>Orders</h1>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <p>Order ID: {order.ID}</p>
                            <p>Product ID: {order.productID}</p>
                            <p>Buyer: {order.buyerName} ({order.buyerEmail})</p>
                            <p>Status: {order.Status}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Orders Yet</p>
            )}
        </div>
    );
};

export default Orders;
