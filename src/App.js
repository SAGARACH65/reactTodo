import './App.css';
import Login from './views/login';
import Todos from './views/todos';
import { store } from './store.js';
import history from './utils/history'
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Switch>
            <Route path='/login' exact component={Login} />
            {/* <Route path='/register' component={Register} /> */}
            <Route path='/todos' component={Todos} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
