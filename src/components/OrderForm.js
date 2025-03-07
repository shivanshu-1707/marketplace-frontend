import { useState } from "react";
import axios from "axios";
import React from "react";

const OrderForm = ({ product }) => {
    const [buyerName, setBuyerName] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                ID: `ORD-${Date.now()}`,
                productID: product.ID,
                buyerName,
                buyerEmail,
                Status: "Pending",
                // Ensure price is a number
                price: parseFloat(product.Price) || 0 // Handle case if Price is invalid or empty
            };

            const response = await axios.post("http://localhost:5000/orders", orderData);
            setMessage(`Order placed successfully! Order ID: ${response.data.id}`);
        } catch (error) {
            setMessage("Failed to place order.");
        }
        setLoading(false);
    };

    return (
        <div>
            <h3>Order {product.Name}</h3>
            <input
                type="text"
                placeholder="Your Name"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Your Email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
            />
            <button onClick={handleOrder} disabled={loading}>
                {loading ? "Placing Order..." : "Place Order"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default OrderForm;
