import axios from 'axios';
import React, { Component } from 'react';

const style = {
  backgroundColor:"#f1f1f1"
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


  render() {
    return (
      <div id ='login'>
        <div id="container">
          <label><b>Username</b></label>
          <input type="text" id ='username' placeholder="Enter Username" className="inputusername" value = {this.state.inputusername} onChange={this.updateInputValueUserName.bind(this)} required />

          <label><b>Password</b></label>
          <input type="password" id ='password' placeholder="Enter Password" className="inputpassword" value ={this.state.inputpassword} onChange={this.updateInputValuePassword.bind(this)} required />

          <button type="submit" id='loginButton' onClick ={this.sendInfo.bind(this)}> Login</button>
          <input type="checkbox" checked="checked" id='rememberCheckBox' /> Remember me
        </div>

        <div id="container" style={style}>
          <button type="button" id="cancelButton">Cancel</button>
          <span id="forgotPassword">Forgot <a href="#">password?</a></span>
        </div>
      </div>
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
       window.location = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default Login;