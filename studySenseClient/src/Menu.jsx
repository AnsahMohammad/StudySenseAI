import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBAccordion,
  MDBAccordionItem,
} from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import { Cookies } from "react-cookie";
import "./Styling/Menu.css";

function App() {
  const cookies = new Cookies();
  const user = cookies.get("user");
  // handling authentication
  if (!user) {
    window.location.href = "http://localhost:5173/";
  }

  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState(null);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const logout = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("User logged out successfully");
          cookies.remove("user");
          window.location.href = "/";
        } else {
          console.error("Failed to logout the user");
        }
      })
      .catch((error) => {
        console.error("Error occurred while signing out:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error occurred while fetching categories:", error);
      });
  }, []);

  return (
    <MDBContainer fluid className="p-0 m-0 h-100">
      <MDBRow className="main-page">
        <MDBCol className="main-border secondary p-0">
          <MDBContainer className="user-tab flex">
            <span>
              {user.username} - {user.email}
            </span>
            <button className="btn btn-red" onClick={logout}>
              Logout
            </button>
          </MDBContainer>
          <div className="secondary-accordion">
            <MDBAccordion initialActive={1} className="w-100">
              {categories &&
                categories.categories.map((category, index) => (
                  <MDBAccordionItem
                    key={index}
                    collapseId={index + 1}
                    className="drop-item"
                    headerTitle={category.name}
                  >
                    <MDBContainer fluid className="m-0 file-holder p-0">
                      {categories.category_data[category.name].map((book, bookIndex) => (
                        <div
                          key={bookIndex}
                          className={`selectable-item ${
                            selectedItem === book.name ? "selected" : ""
                          }`}
                          onClick={() => handleItemClick(book.name)}
                        >
                          {book.name}
                        </div>
                      ))}
                    </MDBContainer>
                  </MDBAccordionItem>
                ))}
            </MDBAccordion>
          </div>
        </MDBCol>
        <MDBCol className="main-border primary">
          <h1>Welcome {user.username}</h1>
          {selectedItem && <h2>{selectedItem}</h2>}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
