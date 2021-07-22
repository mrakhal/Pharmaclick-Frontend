import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SidebarComp from './components/SidebarComp';
import { URL_API } from './Helper';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductManagementPage from './pages/ProductManagementPage';
import VerificationPage from './pages/VerificationPage';
import { getProductAction, keepLogin } from './action'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.getProductAction()
    this.reLogin()
  }
  reLogin = async () => {
    try {
      let token = localStorage.getItem("tkn_id")
      console.log("id token keep login", token)
      if (token) {
        const headers = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        this.props.keepLogin(headers)
      }

    } catch (error) {
      console.log("keep login error", error)
    }
  }

  render() {
    return (
      <>

        <Switch>
          <Route path='/' component={LandingPage} exact />
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/verif'} component={VerificationPage} />
          {
            this.props.role == "admin" &&
            <>
              <SidebarComp />
              <Switch>
                <Route path={'/dashboard'} component={DashboardPage} />
                <Route path={'/product-management'} component={ProductManagementPage} />
              </Switch>
            </>
          }
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    ...authReducer
  }
}

export default connect(mapStateToProps, { getProductAction, keepLogin })(App);