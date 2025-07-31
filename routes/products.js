const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all products (with optional pagination)
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const result = await pool.query(
      `
      SELECT p.id, p.name, p.retail_price AS price, d.name AS department
      FROM products p
      JOIN departments d ON p.department_id = d.id
      ORDER BY p.id
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products with departments:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET a product by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT p.id, p.name, p.retail_price AS price, d.name AS department
      FROM products p
      JOIN departments d ON p.department_id = d.id
      WHERE p.id = $1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ error: "Invalid request" });
  }
});

// ✅ NEW: Get all departments
router.get("/departments/list", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM departments ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

module.exports = router;
