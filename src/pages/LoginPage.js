import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset previous errors
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    // Stop if invalid
    if (!isValid) return;

    // Successful submission
    console.log("Login submitted:", { email, password });
    // TODO: Submit to backend later
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>🔐 Login to Cookease</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Email:</label><br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Password:</label><br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>

          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

