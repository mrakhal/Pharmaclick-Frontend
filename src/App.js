import "./App.css";
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import SidebarComp from './components/SidebarComp';
import { URL_API } from './Helper';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PassResetPage from './pages/PassResetPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductManagementPage from './pages/ProductManagementPage';
import ProductPage from './pages/ProductPage';
import VerificationPage from './pages/VerificationPage';
import ProfilePage from "./pages/profilePage";
import NavbarComp from "./components/navbarComp";
import FooterComp from "./components/footerComp";
import { getProducts, keepLogin, getImageProfileUser, getProductAction } from "./action";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    this.props.getProducts();
    // this.props.getImageProfileUser(this.props.user.iduser);
    this.props.getProductAction(1)
    this.reLogin();
    this.checkNavbar()
  }

  reLogin = async () => {
    try {
      let token = localStorage.getItem("tkn_id")
      if (token) {
        this.props.keepLogin(token)
      }

    } catch (error) {
      console.log("keep login error", error)
    }
  }


  checkNavbar = () => {
    if (this.props.role == 'admin') {
      this.setState({ navbar: <SidebarComp /> })
    }
  }
  render() {
    return (
      <>
        {this.props.role == "user" ?
          <>
            <NavbarComp />
            <Switch>
              <Route path='/' component={LandingPage} exact />
              <Route path={'/verif'} component={VerificationPage} />
              <Route path={'/product'} component={ProductPage} />
              <Route path={'/reset'} component={PassResetPage} />
              <Route path={"/profile"} component={ProfilePage} />
            </Switch>
          </>
          :
          this.props.role == "admin" ?
            <>
              <SidebarComp />
              <Switch>
                <Route path={'/login'} component={LoginPage} />
                <Route path='/dashboard' component={DashboardPage} exact />
                <Route path={'/product-management'} component={ProductManagementPage} />
              </Switch>
            </>
            :
            <>
              <NavbarComp />
              <Switch>
                <Route path='/' component={LandingPage} exact />
                <Route path={'/product'} component={ProductPage} />
                <Route path={'/login'} component={LoginPage} />
                <Route path={"/register"} component={RegisterPage} />
              </Switch>
            </>

        }
      </>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    ...authReducer
  }
}

export default connect(mapStateToProps, { getProductAction, keepLogin, getImageProfileUser, getProducts })(App);
