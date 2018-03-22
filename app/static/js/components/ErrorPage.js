import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>Error!</h1>
        <p>Either this page does not exist or you do not have authorization to be here.</p>
        <img src={require("./../../img/goat1.png")} alt="Goat Image" />
      </div>
    );
  }
}

export default ErrorPage;
