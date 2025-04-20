require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const { fetchAndInsertRecipes } = require("./googleAPI"); // Import function from googleAPI.js

const app = express();
app.use(express.json());
app.use(cors());

// Connect to Supabase (PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION,
});

// Test Database Connection
pool.connect()
  .then(() => console.log("Connected to Supabase Database!"))
  .catch(err => console.error("Database connection failed:", err));

// API Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Cookease API!");
});

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "User"');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all recipes
app.get("/recipes", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Recipe');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new route to fetch and insert recipes from Google API
app.get("/fetch-recipes/:query", async (req, res) => {
  const { query } = req.params;

  try {
    await fetchAndInsertRecipes(query);
    res.json({ message: `Successfully fetched and inserted recipes for "${query}"` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Servers
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});