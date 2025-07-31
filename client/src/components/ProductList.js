import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Products</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem"
      }}>
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem"
            }}>
              <h3>{product.name}</h3>
              <p><strong>Price:</strong> ₹{Number(product.price).toFixed(2)}</p>
              <p><strong>Department:</strong> {product.department}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
