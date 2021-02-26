import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import Login from "./views/login/index";
import Index from "./views/index/Index";
import PrivateRouter from "./components/privateRouter/Index"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={Login} exact path="/" />
          <PrivateRouter component={Index} path="/index" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
