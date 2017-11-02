import axios from 'axios';
import React, { Component } from 'react';

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

  render() {
    return (
      <div id ='signup'>
        <div id="container">
          <label><b>Username</b></label>
          <input type="text" id ='username' placeholder="Enter Username" className="inputusername" value = {this.state.inputusername} onChange={this.updateInputValueUserName.bind(this)} required />

          <label><b>Password</b></label>
          <input type="password" id ='password' placeholder="Enter Password" className="inputpassword" value ={this.state.inputpassword} onChange={this.updateInputValuePassword.bind(this)} required />

          <select id='userRole' name='userRole' value ={this.state.inputrole} onChange={this.updateInputUserRole.bind(this)} required>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
          </select>

          <button type="submit" id='signupButton' onClick ={this.sendInfo.bind(this)}> Signup</button>
          <input type="checkbox" checked="checked" id='rememberCheckBox' /> Remember me
        </div>

      </div>
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
