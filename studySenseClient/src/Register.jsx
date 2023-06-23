import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Styling/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import illustration from "./Assets/register.jpg";

function App() {
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
    <MDBContainer fluid className="p-0 m-0 h-100">
      <MDBCard className="h-100">
        <MDBRow className="g-0 ">
          <MDBCol md="6">
            <MDBCardImage
              src={illustration}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6 mt-5 pt-5">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                />
                <span
                  className="h1 fw-bolder mb-0"
                  style={{ fontSize: "4rem" }}
                >
                  /StudySenseAI
                </span>
              </div>

              <h5
                className="fw-bold mt-2 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Sign up your account
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                value={username}
                onChange={handleUsernameChange}
                label="Username"
                id="formControlLg"
                type="text"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4"
                value={email}
                onChange={handleEmailChange}
                label="Email"
                id="formControlLg"
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                id="formControlLg"
                type="Password"
                size="lg"
              />

              <button
                className="btn btn-dark mb-4 px-5"
                size="lg"
                onClick={handleSubmit}
              >
                Register
              </button>
              <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Aready have an account? <Link to="/login">Login here</Link>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
