import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SidebarComp from './components/SidebarComp';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProductManagementPage from './pages/ProductManagementPage';
import VerificationPage from './pages/VerificationPage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <>

        {/* <Switch>
          <Route path={'/'} component={LandingPage} exact />
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/verif'} component={VerificationPage} />
        </Switch> */}
        <SidebarComp />
        <Switch>
          <Route path={'/product-management'} component={ProductManagementPage} />
          <Route path={'/dashboard'} component={DashboardPage} />
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
export default App;