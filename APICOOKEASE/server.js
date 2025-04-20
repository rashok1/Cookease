require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { fetchAndStoreRecipes } = require("./googleAPI");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

const app = express();
app.use(express.json());
app.use(cors());

// Firebase setup
const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "XXXX",
  appId: "YOUR_APP_ID"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Cookease Firebase API!");
});

// Fetch all recipes from Firestore
app.get("/recipes", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "recipes"));
    const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Import recipes from Google Recipes API
app.get("/import-recipes/:query", async (req, res) => {
  const { query } = req.params;
  try {
    await fetchAndStoreRecipes(query);
    res.json({ message: `Recipes for '${query}' imported successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
