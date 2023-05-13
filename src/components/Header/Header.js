import "./navbar.css";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../images/biofoodoke.png";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const jwtToken = localStorage.getItem("token");

  const handleIsLogin = () => {
    localStorage.getItem("id") ? setIsLogin(true) : setIsLogin(false);
  };

  const handleIsAdmin = () => {
    localStorage.getItem("role") === "admin" ? setIsAdmin(true) : setIsAdmin(false);
  };

  // Logout
  const handleLogout = () => {
    alert("You have logged out!");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setIsLogin(false);

    window.location.assign("/");
  };

  useEffect(() => {
    handleIsLogin();
    handleIsAdmin();

    if (isLogin) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BASEURL}/api/v1/user`,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          apiKey: `${process.env.REACT_APP_APIKEY}`,
        },
      })
        .then()
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLogin, isAdmin, jwtToken]);

  return (
    <div className="header-container">
  <Navbar expand="lg" className="w-100" collapseOnSelect={true}> 
    <Container>
      <Navbar.Brand className="header-brand " href="/">
        <img className="logo-image" src={logo} alt="logo" style={{ width: "100px"}} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" variant="dark"/> 
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto d-flex gap-3 ms-lg-5 mb-3 mb-lg-0">
          <Nav.Link href="/" className="header-link">
            Home
          </Nav.Link>
          {isLogin ? (
            <Nav.Link href="/favorite" className="header-link">
              Favorite
            </Nav.Link>
          ) : null}
          <Nav.Link href="/foods" className="header-link">
            Recipes
          </Nav.Link>
          {isAdmin ? (
            <Nav.Link href="/add-food" className="header-link">
              Add Food
            </Nav.Link>
          ) : null}
        </Nav>
        {isLogin ? (
          <NavDropdown className="header-username" title={localStorage.getItem("name")} id="nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            {isAdmin ? <NavDropdown.Item href="/all-user">All User (Admin)</NavDropdown.Item> : null}
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Button className="btn-signin">
            <a href="/login" className="login-header">
            Sign In
          </a>
          </Button>

        )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
</div>

    // <>
    //   <Navbar expand="lg" >
    //     <Container>
    //       <Navbar.Brand className="header-brand " href="/">
    //         <img className="logo-image" src={logo} alt="logo" style={{ width: "100px"}} />
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="me-auto d-flex gap-3 ms-lg-5 mb-3 mb-lg-0">
    //           <Nav.Link href="/" className="header-link">
    //             Home
    //           </Nav.Link>
    //           {isLogin ? (
    //             <Nav.Link href="/favorite" className="header-link">
    //               Favorite
    //             </Nav.Link>
    //           ) : null}
    //           <Nav.Link href="/foods" className="header-link">
    //             Recipes
    //           </Nav.Link>
    //           {isAdmin ? (
    //             <Nav.Link href="/add-food" className="header-link">
    //               Add Food
    //             </Nav.Link>
    //           ) : null}
    //         </Nav>
    //         {isLogin ? (
    //           <NavDropdown className="header-username" title={localStorage.getItem("name")} id="nav-dropdown">
    //             <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
    //             {isAdmin ? <NavDropdown.Item href="/all-user">All User (Admin)</NavDropdown.Item> : null}
    //             <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
    //           </NavDropdown>
    //         ) : (
    //           <Button className="btn-signin">
    //             <a href="/login" className="login-header">
    //             Sign In
    //           </a>
    //           </Button>
              
    //         )}
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </>
  );
};

export default Header;
