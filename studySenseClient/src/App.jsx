import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardImage,
} from "mdb-react-ui-kit";
import "./Styling/App.css";
import cover from "./Assets/cover.jpg";

function App() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };
  return (
    <MDBContainer fluid className="p-0 m-0">
      <MDBRow className="align-items-center">
        <span className="h1 fw-bold" style={{ fontSize: "4rem" }}>
          /StudySenseAI
        </span>
        <MDBContainer className="cover-container">
          <MDBRow>
            <MDBCol md="6" className="mx-auto border">
              <span className="h3 fw-bold" style={{ fontSize: "3rem" }}>
                Oops, looks like you're lost !
              </span>
              <div className="full-width-container mb-5">
                <MDBCardImage
                  src={cover}
                  alt="cover pic"
                  className="rounded-start w-100"
                />
              </div>
              <MDBRow>
                <MDBCol md="6">
                  <button
                    className="btn btn-dark mb-4 px-5 w-100"
                    size="lg"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </MDBCol>
                <MDBCol md="6">
                  <button
                    className="btn btn-dark mb-4 px-5 w-100"
                    size="lg"
                    onClick={handleSignUpClick}
                  >
                    Signup
                  </button>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
