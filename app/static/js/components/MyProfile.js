import axios from 'axios';
import React, { Component } from 'react';

const style = {
  backgroundColor:"#f1f1f1"
};

class MyProfile extends Component {
  constructor(props){
   super(props);
   this.state={department: "", student: ""};
   this.sendInfo = this.sendInfo.bind(this);
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
          <input type="text" id ='department' placeholder="Enter Department" className="department" value = {this.state.department} onChange={this.updateInputValueDepartment.bind(this)} required />
          <button type="submit" id='departmentButton' onClick ={this.sendInfo.bind(this)}>Submit</button>
        </div>

        <div>
          <p><i>Enter your students' usernames here to add them to your roster. It should be in the format of username@luther.edu</i></p>
          <label><b>Student</b></label>
          <input type="text" id ='student' placeholder="Enter Student Id" className="student" value ={this.state.student} onChange={this.updateInputValueStudent.bind(this)} required />

          <button type="submit" id='studentButton' onClick ={this.sendInfo.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }

  sendInfo(){
    var config = { headers: {
                      'Content-Type': 'application/json',
                      'Access-Control-Allow-Origin': '*'}
    }
    axios.post('/api/myprofileC',{
      student: this.state.student,
      department: this.state.department
    }, this.state,config)
    .then(response => {
      if (response.data == '/myprofile'){
        console.log("this.state: ", this.state);
        alert('Your changes have been saved');
      }
      //window.location = '/myprofile';
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default MyProfile;
