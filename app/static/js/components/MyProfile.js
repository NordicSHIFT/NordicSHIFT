import axios from 'axios';
import React, { Component } from 'react';

const style = {
  backgroundColor:"#f1f1f1"
};

class MyProfile extends Component {
  constructor(props){
   super(props);
   this.state={department: "", student: ""};
  }

  handleClick(){
    console.log("value of department: "+this.state.department);
    console.log("value of student"+this.state.student);
  }

  updateInputValueDepartment(evt){
    this.setState({department: evt.target.value});
  }

  updateInputValueStudent(evt){
    this.setState({student: evt.target.value});
  }

  render() {
    return (
      <div id ='myprofile'>
        <div>
          <label><b>Department</b></label>
          <input type="text" id ='username' placeholder="Enter Department" className="department" value = {this.state.department} onChange={this.updateInputValueDepartment.bind(this)} required />
          <button type="submit" id='departmentButton' onClick ={this.sendInfo.bind(this)}>Submit</button>
        </div>

        <div>
          <p><i>You can enter your student user name here. It should be in the format of username@luther.edu</i></p>
          <label><b>Student</b></label>
          <input type="password" id ='password' placeholder="Enter Student Id" className="student" value ={this.state.student} onChange={this.updateInputValueStudent.bind(this)} required />

          <button type="submit" id='studentButton' onClick ={this.sendInfo.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }

  sendInfo(){
    var config = { headers: {
                      'Content-Type': 'application/json'}};
    axios.post('/myprofileC',{foo:'bar'},config)
    .then(function (response) {
      if (response.data == '/myprofile'){
        alert('Your changes have been saved');
      }
      window.location = '/myprofile';
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default MyProfile;
