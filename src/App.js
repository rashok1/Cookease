import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RecipeListPage from "./pages/RecipeListPage";
import PublicRecipePage from "./pages/PublicRecipePage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage"; // ✅ NEW: Detail View

import logo from "./assets/logo.png";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isLoggedIn = true; // 🔐 Simulate authentication for now

  return (
    <div className="app-container">
      {/* ✅ Navbar appears on all pages */}
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          {isLoggedIn && <li><Link to="/recipes">My Recipes</Link></li>}
          {isLoggedIn && <li><Link to="/add-recipe">Add Recipe</Link></li>}
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>

      {/* 🎉 Welcome banner only on Login/Signup pages */}
      {(location.pathname === "/login" || location.pathname === "/signup") && (
        <header className="app-header">
          <div className="welcome-banner">
            <img src={logo} alt="Cookease Logo" className="logo" />
            <h1 style={{ margin: 0, color: "#001f3f" }}>Welcome to Cookease</h1>
          </div>
        </header>
      )}

      {/* 🧭 Define page routes */}
      <Routes>
        {/* 🌐 Public recipe browsing (homepage) */}
        <Route path="/" element={<PublicRecipePage />} />

        {/* 👤 Authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 👨‍🍳 Private recipe list (requires login) */}
        <Route
          path="/recipes"
          element={isLoggedIn ? <RecipeListPage /> : <Navigate to="/login" />}
        />

        {/* ➕ Add recipe form (requires login) */}
        <Route
          path="/add-recipe"
          element={isLoggedIn ? <AddRecipePage /> : <Navigate to="/login" />}
        />

        {/* 🔍 View individual recipe detail (requires login) */}
        <Route
          path="/recipe/:id"
          element={isLoggedIn ? <RecipeDetailPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
