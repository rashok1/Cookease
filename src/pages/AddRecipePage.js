import { useState } from "react";

function AddRecipePage() {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [recipes, setRecipes] = useState([]); // temporary recipe list

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      id: Date.now(), // unique id
      name,
      calories,
      imageUrl,
    };

    setRecipes([...recipes, newRecipe]);

    // Clear form
    setName("");
    setCalories("");
    setImageUrl("");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>📝 Add a New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <label>Recipe Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />

          <label>Calories:</label><br />
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />

          <label>Image URL:</label><br />
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />

          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Add Recipe
          </button>
        </form>

        {recipes.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h3>🧾 Your Added Recipes:</h3>
            {recipes.map((r) => (
              <div key={r.id} className="recipe-card">
                <img src={r.imageUrl} alt={r.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                <h4>{r.name}</h4>
                <p>{r.calories} kcal</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRecipePage;
