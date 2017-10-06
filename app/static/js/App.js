// App.js
import React, { Component } from 'react';
import { Menubar } from './components/Menubar';
import { Jumbotron, Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menubar/>

        <Jumbotron className='text-center'>
          <h1 className="display-3"> NordicSHIFT</h1>
          <h4> Controlling shift management seamlessly.</h4>
          <hr/>
          <h6> New here? Click one of the links below to get started, depending on your role. </h6>
          <h6> Otherwise, you can log in above. </h6>
          <Button color="primary" className="mx-3"> Managers </Button>
          <Button color="primary" className="mx-3"> Worker </Button>
        </Jumbotron>

        <iframe src="https://calendar.google.com/calendar/embed?src=nguyli03%40luther.edu&ctz=America/Chicago" width="800" height="600" frameborder="0" scrolling="no"></iframe> 

      </div>
    );
  }
}

export default App;