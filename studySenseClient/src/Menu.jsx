import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
import "./Styling/Menu.css";

function App() {
  const cookies = new Cookies();
  const user = cookies.get('user');

  return (
    <MDBContainer fluid className="p-0 m-0 h-100">
      <MDBRow className="custom-row">
        <MDBCol className="custom-col secondary">
          <h2>{user.username}</h2>
          <p>Email: {user.email}</p>
          <div className="secondary-accordion">
            <MDBAccordion initialActive={1} className="w-100">
              <MDBAccordionItem collapseId={1} headerTitle="MATH">
                <ul>
                  <li>Algebra</li>
                  <li>Geometry</li>
                  <li>Calculus</li>
                </ul>
              </MDBAccordionItem>
              <MDBAccordionItem collapseId={2} headerTitle="Physics">
                <ul>
                  <li>Quantum</li>
                  <li>Newton</li>
                  <li>Hamiltonian</li>
                </ul>
              </MDBAccordionItem>
            </MDBAccordion>
          </div>
        </MDBCol>
        <MDBCol className="custom-col primary">
          <h1>MAIN</h1>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
