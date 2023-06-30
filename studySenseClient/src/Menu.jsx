import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBAccordion,
  MDBAccordionItem,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
} from "mdb-react-ui-kit";

import "bootstrap/dist/css/bootstrap.min.css";
import { Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Cookies } from "react-cookie";
import { Document, Page, pdfjs } from "react-pdf";
import "./Styling/Menu.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SelectedItem = ({ selectedItem, selectedPDFUrl, goHome }) => {
  const handleDelete = () => {
    const cookies = new Cookies();
    const user = cookies.get("user");

    fetch("http://localhost:8000/delete_file/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        file_name: selectedItem,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        goHome();
      })
      .catch((error) => {
        console.error("Error occurred while fetching categories:", error);
      });
  };

  // selected file tracker, and displays the page Component
  return (
    <div>
      <h2>{selectedItem}</h2>
      <Icon name="trash alternate" size="large" onClick={handleDelete} />
      <Document
        file={selectedPDFUrl}
        error={
          <p>
            Unable to display PDF. Please{" "}
            <a href={selectedPDFUrl} target="_blank" rel="noopener noreferrer">
              download
            </a>{" "}
            it.
          </p>
        }
        className="pdf-container"
      >
        <Page pageNumber={1} className="pdf-page" renderTextLayer={false} />
      </Document>
    </div>
  );
};

// Component for the default home display
const Home = () => {
  return <h1>Hi</h1>;
};

// Component for the User NavBar display
const UserBar = ({ username, goHome, logout }) => {
  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
          <MDBNavbarItem>
            <MDBNavbarLink active aria-current="page">
              <Icon name="home" size="large" onClick={goHome} />
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarBrand href="#">{username}</MDBNavbarBrand>
          <MDBNavbarItem>
            <button className="btn btn-red" onClick={logout}>
              Logout
            </button>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};

// Component for displaying the PDFs
function App() {
  const cookies = new Cookies();
  const user = cookies.get("user");
  // handling authentication
  if (!user) {
    window.location.href = "http://localhost:5173/";
  }

  const [selectedPDFUrl, setSelectedPDFUrl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [categoriesLength, setCategoriesLength] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  const AddFileForm = ({ category }) => {
    const [formValue, setFormValue] = useState({
      name: "",
      file: null,
    });

    const onChange = (e) => {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) => {
      setFormValue({ ...formValue, file: event.target.files[0] });
    };

    const handleSubmitFiles = (event) => {
      event.preventDefault();
      const { name, file } = formValue;
      if (!name || !category || !file) {
        console.error("Please fill in all fields.");
        return;
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", user.username);
      formData.append("cat", category);
      formData.append("myfile", file);

      fetch("http://localhost:8000/add_file/", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Request failed with status: " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.message);
          fetchCategories();
          setFormValue({ name: "", file: null });
        })
        .catch((error) => {
          console.error("Error occurred while uploading file:", error);
        });
    };

    return (
      <>
        <h1>Add a new File </h1>
        <hr></hr>
        <MDBValidation className="row g-3">
          <MDBValidationItem className="col-md-4">
            <MDBInput
              value={formValue.name}
              name="name"
              onChange={onChange}
              id="name"
              required
              label="File Name"
              placeholder="PDF - 1"
            />
          </MDBValidationItem>
          <MDBValidationItem
            feedback="Please choose a Category."
            invalid
            className="col-md-4"
          >
            <input
              type="text"
              id="cat"
              name="cat"
              value={category}
              placeholder="Enter Here"
              readOnly
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="mt-3 mb-5"
            feedback="Example invalid form file feedback"
            invalid
          >
            <input
              type="file"
              className="form-control"
              id="myfile"
              aria-label="file"
              required
              onChange={handleFileChange}
            />
          </MDBValidationItem>
          <div className="col-12">
            <button type="submit" onClick={handleSubmitFiles}>
              Upload
            </button>
            <button type="reset">Reset</button>
          </div>
        </MDBValidation>
      </>
    );
  };

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = (event) => {
    // logic for adding a new category
    event.preventDefault();
    console.log("New category:", newCategory);
    setCategoriesLength((prevLength) => prevLength + 1);
    setNewCategory("");
    fetch("http://localhost:8000/register_categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        category: newCategory,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error occurred while fetching categories:", error);
      });
  };

  const goHome = (event) => {
    // Routing to home page
    fetchCategories();
    setShowForm(false);
    setSelectedItem(false);
  };

  const handleDeleteCat = (selectedCat) => {
    const cookies = new Cookies();
    const user = cookies.get("user");

    fetch("http://localhost:8000/delete_category/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        category_name: selectedCat,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        goHome();
      })
      .catch((error) => {
        console.error("Error occurred while fetching categories:", error);
      });
  };

  const fetchCategories = () => {
    // fetcging the categories from the server
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
        setCategoriesLength(data.categories.length);
      })
      .catch((error) => {
        console.error("Error occurred while fetching categories:", error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleItemClick = (itemName, itemURL) => {
    // logic to load a pdf
    setSelectedItem(itemName);
    setShowForm(false);
    itemURL = "http://localhost:8000" + itemURL;
    setSelectedPDFUrl(itemURL);
  };

  const handleItemAdd = (categoryName) => {
    // handling a new item being added
    console.log(`Adding a new file to category: ${categoryName}`);
    setCurrentCategory(categoryName);
    setShowForm(true);
    setSelectedItem(false);
  };

  const logout = (event) => {
    // logic for logut
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

  return (
    <MDBContainer fluid className="p-0 m-0 h-100">
      <MDBRow className="main-page">
        <MDBCol className="main-border secondary p-0">
          <MDBContainer className="user-tab flex w-1">
            <UserBar username={user.username} logout={logout} goHome={goHome} />
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
                      {categories.category_data[category.name].map(
                        (book, bookIndex) => (
                          <div
                            key={bookIndex}
                            className={`selectable-item ${
                              selectedItem === book.name ? "selected" : ""
                            }`}
                            onClick={() =>
                              handleItemClick(book.name, book.file)
                            }
                          >
                            {book.name}
                          </div>
                        )
                      )}
                    </MDBContainer>
                    <MDBContainer fluid className="m-0 file-holder p-0">
                      <div className="span">
                        <div
                          key="add book"
                          className="selectable-item book-add"
                          onClick={() => handleItemAdd(category.name)}
                        >
                          <Icon name="plus" /> Add a new File
                        </div>
                        <div
                          key="del category"
                          className="selectable-item del-cat"
                          onClick={() => handleDeleteCat(category.name)}
                        >
                          <Icon name="trash alternate" size="large" />
                          Delete the Folder
                        </div>
                      </div>
                    </MDBContainer>
                  </MDBAccordionItem>
                ))}
              <MDBAccordionItem
                key={99}
                collapseId={categoriesLength + 1}
                className="drop-item"
                headerTitle={
                  <>
                    {" "}
                    <Icon name="plus" /> &nbsp; Add a category{" "}
                  </>
                }
              >
                <div className="accordion-body">
                  <form onSubmit={handleAddCategory}>
                    <input
                      type="text"
                      placeholder="Enter category name"
                      value={newCategory}
                      onChange={handleCategoryChange}
                    />
                    <button type="submit">Add</button>
                  </form>
                </div>
              </MDBAccordionItem>
            </MDBAccordion>
          </div>
        </MDBCol>
        <MDBCol className="main-border primary">
          {(() => {
            if (selectedItem) {
              return (
                <SelectedItem
                  selectedItem={selectedItem}
                  selectedPDFUrl={selectedPDFUrl}
                  goHome={goHome}
                />
              );
            } else if (showForm) {
              return <AddFileForm category={currentCategory} />;
            }
            return <Home />;
          })()}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
