// Home.js
import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <Jumbotron className='text-center'>
                <h1 className="display-3"> NordicSHIFT</h1>
                <h4> Controlling shift management seamlessly.</h4>
                <hr/>
                <h6> New here? Click one of the links below to get started, depending on your role. </h6>
                <h6> Otherwise, you can login above. </h6>
                <p> Something here</p>
                <a href="login">
                <Button color="primary" className="mx-3"> Login </Button>
                </a>

                <a href="signup">
                <Button color="primary" className="mx-3"> Signup </Button>
                </a>

            </Jumbotron>
        );
    }
  }
  
  export default Home;