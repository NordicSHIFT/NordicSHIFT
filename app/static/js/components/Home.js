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
                <h6> Remove the headache of students' busy schedules. </h6>
                <h6> New here? Sign up below to get started! </h6>
                <p> Otherwise, go ahead and login.</p>
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