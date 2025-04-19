import { useState } from "react";
import { Link } from "react-router-dom";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let currentErrors = {};

    if (!name) currentErrors.name = "Name is required.";
    if (!email) currentErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      currentErrors.email = "Enter a valid email address.";
    if (!password) currentErrors.password = "Password is required.";

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      console.log("Signup submitted:", { name, email, password });
      // TODO: send to backend later
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>📝 Sign Up for Cookease</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Name:</label><br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Password:</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
