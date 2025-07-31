const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/departments - List all departments with product count
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT d.id, d.name, COUNT(p.id) AS product_count
      FROM departments d
      LEFT JOIN products p ON p.department_id = d.id
      GROUP BY d.id, d.name
      ORDER BY d.id
    `);

    res.json({ departments: result.rows });
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/departments/:id - Get specific department details
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name FROM departments WHERE id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching department by ID:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/departments/:id/products - Get all products for a department
router.get("/:id/products", async (req, res) => {
  try {
    // First get department name
    const deptResult = await pool.query(
      `SELECT name FROM departments WHERE id = $1`,
      [req.params.id]
    );

    if (deptResult.rows.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    }

    const productsResult = await pool.query(
      `SELECT p.id, p.name, p.retail_price AS price 
       FROM products p 
       WHERE p.department_id = $1`,
      [req.params.id]
    );

    res.json({
      department: deptResult.rows[0].name,
      products: productsResult.rows,
    });
  } catch (err) {
    console.error("Error fetching department products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
