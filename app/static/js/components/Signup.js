import axios from 'axios';
import React, { Component } from 'react';
import { Row, Col, Button, Input, Label, Jumbotron, Option, Select } from 'reactstrap';

const style = {
  backgroundColor:"#f1f1f1"
};

class Signup extends Component {
  constructor(props){
   super(props);
   this.state={inputusername: "", inputpassword: "", inputrole:"Student"};
   this.handleClick = this.handleClick.bind(this);
   this.updateInputValueUserName = this.updateInputValueUserName.bind(this);
   this.updateInputValuePassword = this.updateInputValuePassword.bind(this);
   this.updateInputUserRole = this.updateInputUserRole.bind(this);
   this.redirectLogin = this.redirectLogin.bind(this); 
  }

  handleClick(){
    console.log("value of username: "+this.state.inputusername);
    console.log("value of password: "+this.state.inputpassword);
    console.log("role of the user: "+this.state.inputrole)
  }

  updateInputValueUserName(evt){
    this.setState({inputusername: evt.target.value});
  }

  updateInputValuePassword(evt){
    this.setState({inputpassword: evt.target.value});
  }

  updateInputUserRole(evt){
    this.setState({inputrole: evt.target.value})
  }

  redirectLogin(){
    return window.location = '/login';
  }

  render() {
    return (
      <Row className='text-center' fluid>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
      <Jumbotron>
        <h2> Sign up for NordicSHIFT</h2>
          <Label><b>Username</b></Label>
          <Input type="text" id ='username' placeholder="Enter Username" className="inputusername" value = {this.state.inputusername} onChange={this.updateInputValueUserName.bind(this)} required />

          <Label><b>Password</b></Label>
          <Input type="password" id ='password' placeholder="Enter Password" className="inputpassword" value ={this.state.inputpassword} onChange={this.updateInputValuePassword.bind(this)} required />
          <Label><b>Select Role</b></Label>
          <Input type="select" name="userRole" id="userRole" value={this.state.inputrole}  onChange={this.updateInputUserRole.bind(this)} required>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
          </Input>
          <hr/>
          <Button type="submit" id='signupButton' color="primary" onClick ={this.sendInfo.bind(this)}> Signup</Button>
          <hr /> 
          <Button type ="button" id ='signupButton' color="danger" onClick = {this.redirectLogin}>Return to login</Button>
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
    axios.post('/signupC', {
      inputusername: this.state.inputusername,
      inputpassword: this.state.inputpassword,
      inputrole: this.state.inputrole
    }, config)
    .then(function (response) {
      if (response.data == '/'){
        alert("You have successfully signed up!");
      }
       window.location = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default Signup;
