import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function DepartmentPage() {
  const { id } = useParams();
  const [departmentName, setDepartmentName] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch department name
    axios.get(`/api/departments/${id}`)
      .then(res => {
        setDepartmentName(res.data.name);
      })
      .catch(err => {
        console.error("Error fetching department:", err);
        setDepartmentName("Department Not Found");
      });

    // Fetch products of this department
    axios.get(`/api/departments/${id}/products`)
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(err => {
        console.error("Error fetching products by department:", err);
        setProducts([]);
      });
  }, [id]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Department: {departmentName}</h2>
      <p>Products in this department: {products.length}</p>
      <Link to="/">← Back to All Products</Link>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
        marginTop: "1rem"
      }}>
        {products.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem"
            }}>
              <h4>{product.name}</h4>
              <p>₹{Number(product.price).toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DepartmentPage;
