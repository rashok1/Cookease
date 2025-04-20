require("dotenv").config();
const axios = require("axios");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

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

// Fetch recipes from Google Custom Search API
async function fetchRecipes(query) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const cseId = process.env.GOOGLE_CSE_ID;
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}+recipe&key=${apiKey}&cx=${cseId}`;

  try {
    const response = await axios.get(url);
    const items = response.data.items || [];
    return items.map(item => ({
      name: item.title,
      imageUrl: item.pagemap?.cse_image?.[0]?.src || "",
      sourceLink: item.link,
      snippet: item.snippet,
      createdBy: null,
      timestamp: new Date()
    }));
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

// Store fetched recipes in Firestore
async function fetchAndStoreRecipes(query) {
  const recipes = await fetchRecipes(query);
  for (const recipe of recipes) {
    await addDoc(collection(db, "recipes"), recipe);
  }
  console.log(`✅ Stored ${recipes.length} recipes from Google`);
}

module.exports = { fetchAndStoreRecipes };
