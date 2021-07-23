import "./App.css";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SidebarComp from "./components/SidebarComp";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PassResetPage from "./pages/PassResetPage";
import ProductManagementPage from "./pages/ProductManagementPage";
import ProductPage from "./pages/ProductPage";
import VerificationPage from "./pages/VerificationPage";
import ProfilePage from "./pages/profilePage";
import NavbarComp from "./components/navbarComp";
import NotFoundPage from "./pages/NotFoundPage";
import FooterComp from "./components/footerComp";

import {
  // getProducts,
  keepLogin,
  getImageProfileUser,
  getProductAction,
} from "./action";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getProductAction(1);
    this.reLogin();
  }

  reLogin = async () => {
    try {
      let token = localStorage.getItem("tkn_id");
      // console.log("id token keep login", token);
      if (token) {
        this.props.keepLogin(token);
      }
    } catch (error) {
      console.log("keep login error", error);
    }
  };

  render() {
    return (
      <>
        {this.props.role === "user" ? (
          <>
            <NavbarComp />
            <Switch>
              <Route path="/" component={LandingPage} exact />
              <Route path={"/login"} component={LoginPage} />
              <Route path={"/register"} component={RegisterPage} />
              <Route path={"/verif"} component={VerificationPage} />
              <Route path={"/product"} component={ProductPage} />
              <Route path={"/reset"} component={PassResetPage} />
              <Route path={"/profile"} component={ProfilePage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
            <FooterComp />
          </>
        ) : this.props.role === "admin" ? (
          <>
            <SidebarComp />
            <Switch>
              <Route path={"/dashboard"} component={DashboardPage} />
              <Route
                path={"/product-management"}
                component={ProductManagementPage}
              />
              <Route path="*" component={NotFoundPage} />
            </Switch>
            <FooterComp />
          </>
        ) : (
          <>
            <NavbarComp />
            <Switch>
              <Route path="/" component={LandingPage} exact />
              <Route path={"/login"} component={LoginPage} />
              <Route path={"/register"} component={RegisterPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
            <FooterComp />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    ...authReducer,
  };
};

export default connect(mapStateToProps, {
  getProductAction,
  keepLogin,
  getImageProfileUser,
  // getProducts,
})(App);
