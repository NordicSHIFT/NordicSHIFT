import axios from 'axios';
import React, { Component } from 'react';
import { Row, Col, Button, Input, Label, Jumbotron } from 'reactstrap';

const style = {
  width:"50%"
};

class Login extends Component {
  constructor(props){
   super(props);
   this.state={inputusername: "", inputpassword: ""};
   this.handleClick = this.handleClick.bind(this);
   this.updateInputValueUserName = this.updateInputValueUserName.bind(this);
   this.updateInputValuePassword = this.updateInputValuePassword.bind(this);
  }

  handleClick(){
    console.log("you put in the username");
    console.log("value of username: "+this.state.inputusername);
    console.log("you put in the password");
    console.log("value of password"+this.state.inputpassword);
  }

  updateInputValueUserName(evt){
    this.setState({inputusername: evt.target.value});
  }

  updateInputValuePassword(evt){
    this.setState({inputpassword: evt.target.value});
  }

  redirectSignUp(){
    return window.location = '/signup';
  }

  render() {
    return (
      <Row className='text-center' fluid>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Jumbotron>
        <h2> Log in to NordicSHIFT</h2>
        <div>
          <Label><b>Username</b></Label>
          <Input type="text" id ='username' placeholder="Enter Username" className="inputusername" value = {this.state.inputusername} onChange={this.updateInputValueUserName.bind(this)} required />
          <Label><b>Password</b></Label>
          <Input type="password" id ='password' placeholder="Enter Password" className="inputpassword" value ={this.state.inputpassword} onChange={this.updateInputValuePassword.bind(this)} required />
          <Button type="submit" id='loginButton' color="primary" onClick ={this.sendInfo.bind(this)}> Login</Button>
        </div>
        <hr/>
        <div id ="signup">
          <span> Do not have an account?  </span>
          <Button type ="button" id ='signupButton' color="primary" onClick = {this.redirectSignUp}>Signup</Button>
        </div>
        </Jumbotron>
        </Col>
      </Row>
    );
  }

  sendInfo(){
    var config = { headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'}
    }
    axios.post('/loginC', {
      inputusername: this.state.inputusername,
      inputpassword: this.state.inputpassword
    }, config)
    .then(function (response) {
      if (response.data == '/login'){
        alert('Wrong login, please try again');
        console.log("wrong login");

      }
      else if (response.data =='/signup') {
        alert('Your username is invalid, please create an account or double check the username');
      }
      window.location = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default Login;
