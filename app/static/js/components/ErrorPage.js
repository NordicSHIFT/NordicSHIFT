import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>There is an error!</h1>
        <p>You are trying to access a page that does not exists or you do not have access to </p>
      </div>
    );
  }
}

export default ErrorPage;
