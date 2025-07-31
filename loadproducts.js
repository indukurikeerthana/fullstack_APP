require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const csv = require('csv-parser');

// PostgreSQL client setup using .env values
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

async function loadCSV() {
  try {
    await client.connect();
    console.log('🟢 Connected to PostgreSQL');

    const results = [];

    const filePath = path.join(__dirname, 'products.csv');

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', async () => {
        console.log(`📦 Inserting ${results.length} rows into database...`);

        for (const row of results) {
          try {
            await client.query(
              `INSERT INTO products (
                id, cost, category, name, brand, retail_price,
                department, sku, distribution_center_id
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
              ON CONFLICT (id) DO NOTHING`, // skip duplicates
              [
                parseInt(row.id),
                parseFloat(row.cost),
                row.category,
                row.name,
                row.brand,
                parseFloat(row.retail_price),
                row.department,
                row.sku,
                parseInt(row.distribution_center_id)
              ]
            );
          } catch (err) {
            console.error('❌ Error inserting row:', err.message);
          }
        }

        console.log('✅ CSV data successfully loaded into PostgreSQL!');
        await client.end();
      });
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

loadCSV();
