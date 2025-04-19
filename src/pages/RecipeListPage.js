import React from "react";
import { Link } from "react-router-dom";

// 💾 Mock recipe data
const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    calories: 550,
    image: "https://images.pexels.com/photos/29039082/pexels-photo-29039082.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 2,
    title: "Avocado Toast",
    calories: 580,
    image: "https://images.pexels.com/photos/1321942/pexels-photo-1321942.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
  {
    id: 3,
    title: "Chicken Curry",
    calories: 620,
    image: "https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=300",
  },
];

function RecipeListPage() {
  return (
    <div className="recipe-list-wrapper">
      <h2>🍽️ Your Recipes</h2>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            {/* 📎 Link to the individual recipe detail page */}
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>{recipe.calories} kcal</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeListPage;

