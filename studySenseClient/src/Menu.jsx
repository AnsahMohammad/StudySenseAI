import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBAccordion, MDBAccordionItem } from "mdb-react-ui-kit";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
import "./Styling/Menu.css";

function App() {
	const cookies = new Cookies();
	const user = cookies.get('user');
	const [selectedItem, setSelectedItem] = useState(null);

	const handleItemClick = (itemName) => {
		setSelectedItem(itemName);
	};

	return (
		<MDBContainer fluid className="p-0 m-0 h-100">
			<MDBRow className="main-page">
				<MDBCol className="main-border secondary p-0">
					<MDBContainer className="user-tab">
						<p>{user.username} - {user.email}</p>
					</MDBContainer>
					<div className="secondary-accordion">
						<MDBAccordion initialActive={1} className="w-100">
							<MDBAccordionItem collapseId={1} className="drop-item" headerTitle="MATH">
								<MDBContainer fluid className="m-0 file-holder">
									<div className={`selectable-item ${selectedItem === 'Algebra' ? 'selected' : ''}`} onClick={() => handleItemClick('Algebra')}>
										Algebra
									</div>
									<div className={`selectable-item ${selectedItem === 'Geometry' ? 'selected' : ''}`} onClick={() => handleItemClick('Geometry')}>
										Geometry
									</div>
									<div className={`selectable-item ${selectedItem === 'Calculus' ? 'selected' : ''}`} onClick={() => handleItemClick('Calculus')}>
										Calculus
									</div>
								</MDBContainer>
							</MDBAccordionItem>
							<MDBAccordionItem collapseId={2} className="drop-item" headerTitle="Physics">
								<MDBContainer fluid className="m-0 file-holder">
									<div className={`selectable-item ${selectedItem === 'Physics Algebra' ? 'selected' : ''}`} onClick={() => handleItemClick('Physics Algebra')}>
										Physics Algebra
									</div>
									<div className={`selectable-item ${selectedItem === 'Physics Geometry' ? 'selected' : ''}`} onClick={() => handleItemClick('Physics Geometry')}>
										Physics Geometry
									</div>
									<div className={`selectable-item ${selectedItem === 'Physics Calculus' ? 'selected' : ''}`} onClick={() => handleItemClick('Physics Calculus')}>
										Physics Calculus
									</div>
								</MDBContainer>
							</MDBAccordionItem>
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
