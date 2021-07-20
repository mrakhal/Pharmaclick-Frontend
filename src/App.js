import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PassResetPage from './pages/PassResetPage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <>
        <Switch>
          <Route path={'/'} component={LandingPage} exact/>
          <Route path={'/'} component={PassResetPage}/>
        </Switch>
      </>
    );
  }
}

export default App;