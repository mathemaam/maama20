import React, { useEffect, useState } from 'react';

const StockList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
    }, []);

    return (
        <section>
            <h2>Stock List Transfered</h2>
            {products.length === 0 ? (
                <p className="empty-table">No products available in stock</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Stock Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td className={product.quantity < 5 ? 'low-stock' : 'available-stock'}>
                                    {product.quantity < 5 ? "Low Stock" : "Available"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default StockList;
