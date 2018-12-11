import './App.css';
import Login from './views/login';
import Todos from './views/todos';
import history from './utils/history'
import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// export const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <Switch>
          <Route path='/login' exact component={Login} />
          {/* <Route path='/register' component={Register} /> */}
          <Route path='/todos' component={Todos} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
