import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        ← Back to Products
      </Link>

      <h2 style={{ marginTop: "1rem" }}>{product.name}</h2>

      <p><strong>Price:</strong> ₹{Number(product.price).toFixed(2)}</p>
    </div>
  );
}

export default ProductDetail;
