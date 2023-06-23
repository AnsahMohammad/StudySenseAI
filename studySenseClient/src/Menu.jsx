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
			<MDBRow className="main-page">
				<MDBCol className="main-border secondary p-0">
					<MDBContainer className="user-tab">
						<p>{user.username} - {user.email}</p>
					</MDBContainer>
					<div className="secondary-accordion">
						<MDBAccordion initialActive={1} className="w-100">
							<MDBAccordionItem collapseId={1} className="drop-item" headerTitle="MATH">
								<MDBContainer fluid className="m-0 file-holder">
									<ul>
										<li>Algebra</li>
										<li>Geometry</li>
										<li>Calculus</li>
									</ul>
								</MDBContainer>
							</MDBAccordionItem>
							<MDBAccordionItem collapseId={2} className="drop-item" headerTitle="Physics">
								<MDBContainer fluid className="m-0 file-holder">
									<ul>
										<li>Algebra</li>
										<li>Geometry</li>
										<li>Calculus</li>
									</ul>
								</MDBContainer>
							</MDBAccordionItem>
						</MDBAccordion>
					</div>
				</MDBCol>
				<MDBCol className="main-border primary">
					<h1>Welcome {user.username}</h1>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
}

export default App;
