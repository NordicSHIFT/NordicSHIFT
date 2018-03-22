import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>Error!</h1>
        <p>You are trying to access a page that does not exists or you do not have access to </p>
        <img src={require("./../../img/goat1.png")} alt="Goat Image" />
      </div>
    );
  }
}

export default ErrorPage;
