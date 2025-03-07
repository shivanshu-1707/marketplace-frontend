import { useEffect, useState } from "react";
import axios from "axios";
import OrderForm from "./OrderForm";
import React from "react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ ID: "", Name: "", Description: "", Price: "", ImageURL: "" });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("http://localhost:5000/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Parse the value of 'Price' as a number
        if (name === "Price") {
            setNewProduct({ ...newProduct, [name]: parseFloat(value) });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/products", newProduct)
            .then(() => {
                fetchProducts();
                setNewProduct({ ID: "", Name: "", Description: "", Price: "", ImageURL: "" });
            })
            .catch(error => console.error("Error adding product:", error));
    };

    return (
        <div>
            <h1>Products</h1>

            {/* Add Product Form */}
            <form onSubmit={handleAddProduct}>
                <input type="text" name="ID" placeholder="Product ID" value={newProduct.ID} onChange={handleChange} required />
                <input type="text" name="Name" placeholder="Name" value={newProduct.Name} onChange={handleChange} required />
                <input type="text" name="Description" placeholder="Description" value={newProduct.Description} onChange={handleChange} required />
                <input type="number" name="Price" placeholder="Price" value={newProduct.Price} onChange={handleChange} required />
                <input type="text" name="ImageURL" placeholder="Image URL" value={newProduct.ImageURL} onChange={handleChange} required />
                <button type="submit">Add Product</button>
            </form>

            {/* Display Products */}
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <img src={product.ImageURL} alt={product.Name} width="100" />
                            <h3>{product.Name}</h3>
                            <p>{product.Description}</p>
                            <p>Price: ₹{product.Price}</p>
                            <OrderForm product={product} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Products;
