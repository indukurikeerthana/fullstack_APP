import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import DepartmentPage from "./components/DepartmentPage";
import DepartmentList from "./components/DepartmentList";
import "./App.css";


function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div style={{ width: "250px" }}>
          <DepartmentList />
        </div>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/departments/:id" element={<DepartmentPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
