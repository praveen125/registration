import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Register />
        </Provider>
      </div>
    );
  }
}

export default App;
