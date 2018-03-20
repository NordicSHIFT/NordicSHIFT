import axios from 'axios';
import React, { Component } from 'react';
import { Row, Col, Button, Input, Label, Jumbotron } from 'reactstrap';

const style = {
  width:"50%"
};

class ResetPassword extends Component {
  constructor(props){
   super(props);
   this.state={inputusername: this.props.match.params.username, inputpassword: "", inputretypepassword: ""};
   this.handleClick = this.handleClick.bind(this);
   this.updateInputValueUserName = this.updateInputValueUserName.bind(this);
   this.updateInputValuePassword = this.updateInputValuePassword.bind(this);
   this.updateInputValueRetypePassword = this.updateInputValueRetypePassword.bind(this);
   this.sendInfo = this.sendInfo.bind(this);
   // this.getCheckUsernamePassword = this.getCheckUsernamePassword.bind(this);
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

  updateInputValueRetypePassword(evt){
    this.setState({inputretypepassword: evt.target.value});
  }

  render() {
    return (
      <Row className='text-center' fluid>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Jumbotron>
        <h2> Reset Password</h2>
        <div>
          <Label><b>Username</b></Label>
          <Input type="text" id ='username' className="inputusername" value = {this.state.inputusername} readonly="readonly" />
          <Label><b>Password</b></Label>
          <Input type="password" id ='password' placeholder="Enter Password" className="inputpassword" value = {this.state.inputpassword} onChange={this.updateInputValuePassword} required />
          <Label><b>Retype Password</b></Label>
          <Input type="password" id ='retypepassword' placeholder="Retype Password" className="inputretypepassword" value ={this.state.inputretypepassword} onChange={this.updateInputValueRetypePassword} required />
          <Button type="submit" id='resetPasswordButton' color="primary" onClick ={this.sendInfo}> Reset</Button>
        </div>
        <hr/>
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
    axios.post('/api/resetPassword', {
      username: this.state.inputusername,
      inputpassword: this.state.inputpassword,
      inputretypepassword: this.state.inputretypepassword
    }, config)
    .then(function (response) {
      if (response.data == 'error'){
        alert('Password and Retype Password do not match. Please type again');
      }
      else if (response.data =='done') {
        alert('Your new password has been saved. Please login again');
        window.location = '/login';
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    // console.log(this.state.inputpassword);
    // console.log(this.state.inputretypepassword);
  }
}

export default ResetPassword;
