import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './views/login';
// import Register from './views/register';
import Todos from './views/todos';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
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
