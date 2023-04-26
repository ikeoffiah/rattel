import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Avatar } from "@mui/material";
import logo from "../assets/images/ratlogo.png";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("register");
  };

  const handleNavLogin = () => {
    navigate("login");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <Avatar src={logo} style={{ width: "50px", height: "50px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Form className="d-flex">
            <Button
              style={{
                marginRight: "5px",
                backgroundColor: "greenyellow",
                border: "none",
              }}
              onClick={handleNavigate}
            >
              Sign up
            </Button>
            <Button
              style={{
                borderColor: "greenyellow",
                backgroundColor: "white",
                color: "black",
              }}
              onClick={handleNavLogin}
            >
              login
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
