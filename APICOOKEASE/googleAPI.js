// googleAPI.js
require("dotenv").config();
const axios = require("axios");
const { db } = require("./firebaseConfig");
const { collection, addDoc } = require("firebase/firestore");

async function fetchRecipes(query) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const cseId = process.env.GOOGLE_CSE_ID;
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}+recipe&key=${apiKey}&cx=${cseId}`;

  try {
    const response = await axios.get(url);
    const recipes = response.data.items.map(item => ({
      name: item.title,
      imageUrl: item.pagemap?.cse_image?.[0]?.src || "",
      sourceLink: item.link,
      snippet: item.snippet
    }));
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

async function fetchAndStoreRecipes(query) {
  const recipes = await fetchRecipes(query);
  for (const recipe of recipes) {
    await addDoc(collection(db, "recipes"), {
      ...recipe,
      createdBy: null,
      timestamp: new Date()
    });
  }
  console.log(`✅ Stored ${recipes.length} recipes from Google`);
}

module.exports = { fetchAndStoreRecipes };
