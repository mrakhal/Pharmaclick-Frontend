import "./App.css";
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SidebarComp from './components/SidebarComp';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProductManagementPage from './pages/ProductManagementPage';
import ProductPage from './pages/ProductPage';
import VerificationPage from './pages/VerificationPage';
import { getProductAction } from './action'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.getProductAction(1)
  }
  render() {
    return (
      <>

        <Switch>
          <Route path={'/'} component={LandingPage} exact />
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/verif'} component={VerificationPage} />
          <Route path={'/verif'} component={VerificationPage} />
          <Route path={'/product'} component={ProductPage} />
        </Switch>
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
      </>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    ...authReducer
  }
}

export default connect(mapStateToProps, { getProductAction })(App);