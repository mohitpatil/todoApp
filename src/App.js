import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

import Newtodo from './components/Newtodo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Newtodo />
      </div>
    );
  }
}

export default App;
