import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { NavbarBrand, Navbar, Nav, NavItem } from "reactstrap";
import "./Navbar.css";
import UserContext from "./UserContext";

const NavBar = ({logout}) => {
  const user = useContext(UserContext);

  return (
    <div className="mb-2">
      <Navbar expand="md" className="navbar-dark bg-dark pb-3">
        <NavbarBrand href="/" className="navbar-brand">
          Jobly
        </NavbarBrand>
        <Nav className="ml-auto links">
          {user.currentUser ? (
            <div className="ml-auto links">
              <NavItem>
                <NavLink to="/companies" className="nav-link">
                  Companies
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/jobs" className="nav-link">
                  Jobs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/edit-profile" className="nav-link">
                  Edit Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/" onClick={logout} className="nav-link">
                  Logout, {user.currentUser.firstName}
                </NavLink>
              </NavItem>
            </div>
          ) : (
            <div className="ml-auto links">
              <NavItem>
                <NavLink to="/login-signup-form" className="nav-link">
                  Login/ Signup
                </NavLink>
              </NavItem>
            </div>
          )}

          {/* Add more NavLink components for other routes */}
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
