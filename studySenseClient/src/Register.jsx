import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic here
    const formData = {
      username: username,
      password: password,
      email: email,
    };
    // Make the API request to register the user
    // You can use fetch or axios library for making the POST request
    // Example using fetch:
    fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User registered successfully");
          window.location.href = "http://localhost:8000/";
        } else {
          console.error("Failed to register user");
        }
      })
      .catch((error) => {
        console.error("Error occurred while registering user:", error);
      });
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <button type="submit">Register</button>
        </form>
        <Link to="/">Back to Login</Link>
      </div>
    </div>
  );
};

export default Register;
