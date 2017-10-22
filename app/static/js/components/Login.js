// var Parent = React.createClass({
//   getInitialState:function(){
//     return {signup:false, login:true}
//   },
//   switch:function(word){
//     var signup, login;
//     if (word==="signup"){
//       signup = true;
//       login = false;
//     } else {
//       signup = false;
//       login = true;
//     }
//     return this.setState({login:login, signup: signup})
//   },
//   render:function(){
//     var self = this;
//     return (
//       <div>
//         <div id='buttons'>
//           <p id='signupButton' onClick={self.switch.bind(null,"signup")} className ={self.state.signup?"yellow":"blue"}>Sign In</p>
//           <p id='loginButton' onClick={self.switch.bind(null,"login")} className={self.state.login?"blue":"yellow"}>Login</p>
//         </div>
//         {self.state.signup?<Signup/>:null}
//         {self.state.login?<Login/>:null}
//       </div>
//     )
//   }
// })
//
// var Signup = React.createClass({
//   render:function(){
//     return (
//       <div>
//         <div id='signup'>
//           <input type='text' id='first' placeholder='First Name'/>
//           <input type='text' id='last' placeholder='Last Name'/>
//           <input type='text' id='email' placeholder='Email'/>
//           <input type='text' id='password' placeholder='Password'/>
//           <input type='text' id='confirm' placeholder='Confirm Password'/>
//           <button id='send'>Send</button>
//         </div>
//       </div>
//     )
//   }
// })
//
// var Login = React.createClass({
//   render:function(){
//     return (
//       <div>
//       <div id='login'>
//         <input type='text' id='email' placeholder='Email'/>
//         <input type='text' id='password' placeholder='Password'/>
//         <button id='send'>Send</button>
//       </div>
//       </div>
//     )
//   }
// })
//
// ReactDOM.render(<Parent/>,document.getElementById('container'))
import React, { Component } from 'react';

const style = {
  backgroundColor:"#f1f1f1"
};

class Login extends Component {
  render() {
    return (
      <form id ='login' action="{loginSuccess()}">
        <div id="container">
          <label><b>Username</b></label>
          <input type="text" id ='username' placeholder="Enter Username" className="uname" required />

          <label><b>Password</b></label>
          <input type="password" id ='password' placeholder="Enter Password" className="psw" required />

          <button type="submit" id='loginButton'>Login</button>
          <input type="checkbox" checked="checked" id='rememberCheckBox' /> Remember me
        </div>

        <div id="container" style={style}>
          <button type="button" id="cancelButton">Cancel</button>
          <span id="forgotPassword">Forgot <a href="#">password?</a></span>
        </div>
      </form>
    );
  }
}

export default Login;
