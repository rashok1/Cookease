import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list-wrapper">
      <h2>🍽️ Your Recipes</h2>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <h3>{recipe.name}</h3>
              <p>{recipe.calories} kcal</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeListPage;
