import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/navigation.css";
import Logo from "../assets/images/logo.png";
import Profile from "../assets/images/profile.png";
import { connect } from "react-redux";
import { authLogout, getImageProfileUser } from "../action";
import axios from "axios";
import { URL_API } from "../Helper";

class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, role: "user", file: Profile };
  }

  componentDidMount() {
    // this.checkImage();
    // this.props.getImageProfileUser(this.props.user.iduser);
  }

  // checkImage = () => {
  //   if (this.props.profile.message) {
  //     return Profile;
  //   } else {
  //     return this.props.profile;
  //   }
  // };

  btLogout = () => {
    this.props.authLogout();
  };

  render() {
    return (
      <div>
        <Navbar
          color="light"
          light
          expand="md"
          className="px-3  navi-item"
          fixed="top"
        >
          <NavbarBrand>
            <img src={Logo} width="150px" alt="logo pharmaclick" />
          </NavbarBrand>
          <NavbarToggler
            onClick={() => {
              this.setState({ isOpen: !this.state.isOpen });
            }}
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="m-auto " navbar>
              <NavItem>
                <NavLink>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <a className="menu-item">Home</a>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link className="menu-item" to="/product">Product</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <a className="menu-item">Contact</a>
                </NavLink>
              </NavItem>
            </Nav>
            {this.props.user.role === "user" ? (
              <div className="d-flex justify-content-end align-items-center drop-menu">
                <NavItem type="none">
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav>
                      <NavLink href="#">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span
                          class="badge bg-primary rounded-pill"
                          style={{ color: "white" }}
                        >
                          {/* {this.props.cart.length} */}
                        </span>
                      </NavLink>
                    </DropdownToggle>
                    <DropdownMenu right>
                      isi print cart
                      <DropdownItem divider />
                      <DropdownItem>
                        <Link
                          to="/cart"
                          style={{
                            fontSize: "calc(5px + 1vmin)",
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          Go To Cart
                        </Link>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
                <NavItem type="none" style={{ marginRight: "10px" }}>
                  <a>{this.props.user.fullname.split(" ")[0]}</a>
                </NavItem>
                {/* <img
                  src={this.state.file}
                  width="35px;"
                  height="35px;"
                  style={{ borderRadius: "50%" }}
                  alt="profile image"
                /> */}
                <UncontrolledDropdown>
                  <DropdownToggle nav caret></DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <DropdownItem>Edit Profile</DropdownItem>
                    </Link>
                    <DropdownItem>Change Password</DropdownItem>
                    <DropdownItem onClick={this.btLogout}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            ) : this.props.user.role === "admin" ? (
              <>
                <div className="d-flex justify-content-end align-items-center drop-menu">
                  <NavbarText style={{ marginRight: "10px" }}>
                    <a>{this.props.user.fullname.split(" ")[0]}</a>
                  </NavbarText>
                  <img src={Profile} width="5%" alt="profile image" />
                  <UncontrolledDropdown>
                    <DropdownToggle nav caret></DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Add Product</DropdownItem>
                      <DropdownItem>Transaction Managmeent</DropdownItem>
                      <DropdownItem>History</DropdownItem>
                      <DropdownItem onClick={this.btLogout}>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex regist">
                  <NavbarText className="mr-3">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <a>Login</a>
                    </Link>
                  </NavbarText>
                  &nbsp;
                  <NavbarText>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      <a>Register</a>
                    </Link>
                  </NavbarText>
                  &nbsp;
                </div>
              </>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ productReducer, authReducer }) => {
  return {
    products: productReducer.product_list,
    user: authReducer,
    profile: productReducer.image_profile,
  };
};

export default connect(mapStateToProps, { authLogout, getImageProfileUser })(
  NavbarComp
);
