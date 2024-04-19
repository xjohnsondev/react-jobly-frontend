import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const LoginSignup = ({ login, signup }) => {
  const navigate = useNavigate();

  const INITIAL_STATE = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
  };
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles authorization for login or signup
  const handleAuth = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      // Login logic
      try {
        const response = await login({
          username: formData.username,
          password: formData.password,
        });

        if (response.success) navigate("/companies");
      } catch (error) {
        console.error("Login failed:", error);
      }
    } else {
      // Register logic
      try {
        const response = await signup({
          username: formData.username,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        });
        if (response.success) navigate("/companies");
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }

    // Clear the form after submission
    setFormData(INITIAL_STATE);
  };

  return (
    <div className="display">
      <form className="form-box" onSubmit={handleAuth}>
        <h2>{isLoginMode ? "Login" : "Register"}</h2>

        <div className="field-set">
          <label>Username:</label>
          <input
            className="loginField"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="field-set">
          <label>Password:</label>
          <input
            className="loginField"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {!isLoginMode && (
          <div>
            <div className="field-set">
              <label>First Name:</label>
              <input
                className="loginField"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-set">
              <label>Last Name:</label>
              <input
                className="loginField"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-set">
              <label>Email:</label>
              <input
                className="loginField"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}
        <button className="login-btn" type="submit">
          {isLoginMode ? "Login" : "Register"}
        </button>
      </form>
      <p className="switch-form" onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode
          ? "Don't have an account? Sign up"
          : "Already have an account? Sign in"}
      </p>
    </div>
  );
};

export default LoginSignup;
