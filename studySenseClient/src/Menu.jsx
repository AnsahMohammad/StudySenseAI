import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAccordion, MDBAccordionItem, MDBIcon } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import { Cookies } from "react-cookie";
import { Document, Page, pdfjs } from 'react-pdf';
import "./Styling/Menu.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SelectedItem = ({ selectedItem, selectedPDFUrl }) => {
	return (
		<div>
		<h2>{selectedItem}</h2>
		<Document
			file={selectedPDFUrl}
			error={
			<p>
				Unable to display PDF. Please{" "}
				<a href={selectedPDFUrl} target="_blank" rel="noopener noreferrer">download</a>{" "}
				it.
			</p>
			}
			className="pdf-container">
			<Page pageNumber={1} className="pdf-page" renderTextLayer={false} />
		</Document>
		</div>
	);
};
  
// Component for the default home display
const Home = () => {
return <h1>Hi</h1>;
};

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
	const handleSubmit = (event) => {
	  event.preventDefault();
	  console.log(`Successfully addded to { category }`)
	  setShowForm(false);
	};
  
	return (
	  <div>
		<h2>Form to add file in the {category} category</h2>
		<input type="text" placeholder="enter file name"/>
		<form onSubmit={handleSubmit}>
		<button type="submit">Add File</button>
		</form>
	  </div>
	);
  }; 
 
  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = (event) => {
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
  
  const fetchCategories = () => {
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
    setSelectedItem(itemName);
    itemURL = "http://localhost:8000" + itemURL;
    setSelectedPDFUrl(itemURL);
  };

  const handleItemAdd = (categoryName) => {
	console.log(`Adding a new file to category: ${categoryName}`);
	setCurrentCategory(categoryName);
	setShowForm(true);
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
                    key={index} collapseId={index + 1} className="drop-item" headerTitle={category.name}>
                    <MDBContainer fluid className="m-0 file-holder p-0">
                      {categories.category_data[category.name].map((book, bookIndex) => (
                        <div
                          key={bookIndex}
                          className={`selectable-item ${
                            selectedItem === book.name ? "selected" : ""
                          }`}
                          onClick={() => handleItemClick(book.name, book.file)}
                        >
                          {book.name}
                        </div>
                      ))}
                    </MDBContainer>
					<MDBContainer fluid className="m-0 file-holder p-0">
                        <div
                          key="add book"
                          className="selectable-item book-add" onClick={() => handleItemAdd(category.name)}>
                          <MDBIcon fas icon="plus" />Add a new File
                        </div>
                    </MDBContainer>
                  </MDBAccordionItem>
                ))}
              <MDBAccordionItem
                  key={99} collapseId={categoriesLength + 1} className="drop-item"
                  headerTitle={<> <MDBIcon fas icon="plus" /> &nbsp; Add a category </>} >
                    <div className="accordion-body">
                  <form onSubmit={handleAddCategory}>
                      <input
                      type="text" placeholder="Enter category name" 
                      value={newCategory} onChange={handleCategoryChange} />
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
				return <SelectedItem selectedItem={selectedItem} selectedPDFUrl={selectedPDFUrl} />;
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
