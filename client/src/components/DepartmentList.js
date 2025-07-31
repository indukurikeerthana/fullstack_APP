import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("/api/departments")
      .then(res => setDepartments(res.data.departments))
      .catch(err => console.error("Error fetching departments:", err));
  }, []);

  return (
    <div style={{
      padding: "1rem",
      borderRight: "1px solid #ddd",
      minWidth: "200px"
    }}>
      <h3 style={{ marginBottom: "1rem" }}>Departments</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {departments.map((dept) => (
          <li key={dept.id} style={{ marginBottom: "0.5rem" }}>
            <Link
              to={`/departments/${dept.id}`}
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              {dept.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentList;
