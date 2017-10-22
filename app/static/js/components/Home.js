// Home.js
import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Home = () => (
  <Jumbotron className='text-center'>
    <h1 className="display-3"> NordicSHIFT</h1>
    <h4> Controlling shift management seamlessly.</h4>
    <hr/>
    <h6> New here? Click one of the links below to get started, depending on your role. </h6>
    <h6> Otherwise, you can log in above. </h6>
    <Button color="primary" className="mx-3"> Managers </Button>
    <Button color="primary" className="mx-3"> Worker </Button>
  </Jumbotron>
)

export default Home