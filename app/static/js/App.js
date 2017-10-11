// App.js
import React, { Component } from 'react';
import Menubar from './components/Menubar';
import Main from './components/Main';


class App extends Component {
  render() {
    return (
      <div>
        <Menubar/>
        <Main />
      </div>
    );
  }
}

export default App;
