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
    <div className="products-grid">
      {products.map((product) => (
        <Link
          to={`/product/${product.id}`}
          key={product.id}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="product-card">
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ₹{Number(product.price).toFixed(2)}</p>
            <p><strong>Department:</strong> {product.department}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
