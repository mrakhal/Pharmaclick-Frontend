import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <>
        <Switch>
          <Route path={'/'} component={LandingPage}/>
        </Switch>
      </>
    );
  }
}

export default App;