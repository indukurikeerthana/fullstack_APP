import React, { useEffect, useState } from "react";
import axios from "axios";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get("/api/products/departments/list")
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Error fetching departments:", err));
  }, []);

  return (
    <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <h2>Departments</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {departments.map((dept) => (
          <li key={dept.id}>{dept.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentList;
