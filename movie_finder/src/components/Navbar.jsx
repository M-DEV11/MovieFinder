import React,{useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../services/api.js'
import { useFirebase } from "../context/Firebase.jsx";

const NavbarComponent = ({setSearchQuery}) => {

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchBar);
  }

  const [searchBar, setSearchBar] = useState("");
  const firebase = useFirebase();


  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Movie Finder</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content">
          {/* Left side navigation */}
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/watchlist">Watchlist</Nav.Link>
            {!firebase.isLoggedIn && (<Nav.Link href="/login">Login</Nav.Link>)}
          </Nav>

          {/* Right side search form */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchBar(e.target.value)}
              value={searchBar}
              style={{ backgroundColor: "#0d6efd", color: "white", borderColor: "white" }}
            />
            <Button variant="outline-light" onClick={handleSearch}>Search</Button>
            {firebase.isLoggedIn && (
              <Button variant="outline-light" className="ms-2" onClick={firebase.logoutUser}>
                Logout
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
