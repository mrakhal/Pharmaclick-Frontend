import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/profilePage";
import LoginPage from "./pages/LoginPage";
import NavbarComp from "./components/navbarComp";
import FooterComp from "./components/footerComp";
import { getProducts, keepLogin, getImageProfileUser } from "./action";
import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getProducts();
    this.props.getImageProfileUser(this.props.user.iduser);
    this.reLogin();
  }

  reLogin = () => {
    let token = localStorage.getItem("tkn_id");
    console.log("isi token", token);
    this.props.keepLogin(token);
  };
  render() {
    return (
      <>
        <NavbarComp />
        <Switch>
          <Route path={"/"} component={LandingPage} exact />
          <Route path={"/register"} component={RegisterPage} />
          <Route path={"/login"} component={LoginPage} />
          {this.props.user.role === "user" && (
            <>
              <Route path={"/profile"} component={ProfilePage} />
            </>
          )}
        </Switch>
        <FooterComp />
      </>
    );
  }
}

const mapStateToProps = ({ productReducer, authReducer }) => {
  return {
    user: authReducer,
  };
};

export default connect(mapStateToProps, {
  getProducts,
  keepLogin,
  getImageProfileUser,
})(App);
