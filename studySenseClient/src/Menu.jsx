import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styling/Menu.css";

function App() {
  return (
    <MDBContainer fluid className="p-0 m-0 h-100">
      <MDBRow className="custom-row">
        <MDBCol className="custom-col secondary">
          <h2>DOCK</h2>
        </MDBCol>
        <MDBCol className="custom-col primary">
          <h1>MAIN</h1>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
