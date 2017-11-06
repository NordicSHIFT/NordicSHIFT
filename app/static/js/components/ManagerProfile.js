import axios from 'axios';
import React, { Component } from 'react';
import Menubar from './Menubar';

const style = {
  backgroundColor:"#f1f1f1"
};

const editDepartment = (props) => (
  <div id="editDepartment">
    <input type="text" id ='department' placeholder="Enter Department" className="department" value = {ManagerProfile.state.department} onChange={ManagerProfile.updateInputValueDepartment} required />
    <button type="submit" id='departmentButton' onClick ={ManagerProfile.sendInfo}>Submit</button>
  </div>
  // <p>Hello world</p>
);

class ManagerProfile extends Component {
  constructor(props){
   super(props);
   this.state={department: "", student: "", isHidden: true};
   this.sendInfo = this.sendInfo.bind(this);
   this.updateInputValueDepartment = this.updateInputValueDepartment.bind(this);
   this.updateInputValueStudent = this.updateInputValueStudent.bind(this);
   this.editDepartment = this.editDepartment.bind(this);
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

  editDepartment(){
    console.log("this get called?");
    this.setState({isHidden: !this.state.isHidden});
    console.log(this.state.isHidden);
  }

  // getData(){
  //   axios.get('/managerprofile')
  //   .then(({ data })=> {
  //     	this.setState({
  //         department: data.department,
  //         student: data.student
  //       });
  //     })
  //     .catch((err)=> {})
  // }

  render() {
    return (
      <div id ='managerprofile'>
        <Menubar />
        <div>
          <label><b>Department</b></label>
          <p> Current department:{this.state.department} </p>
          <div>
            <button onClick={this.editDepartment} >Edit Department</button>
            {!this.state.isHidden && <editDepartment />}
          </div>
        </div>

        <div>
          <p><i>Enter your students usernames here to add them to your roster. It should be in the format of username@luther.edu</i></p>
          <label><b>Student</b></label>
          <input type="text" id ='student' placeholder="Enter Student Id" className="student" value ={this.state.student} onChange={this.updateInputValueStudent.bind(this)} required />

          <button type="submit" id='studentButton' onClick ={this.sendInfo.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }

  sendInfo(){
    var config = { headers: {
                      'Content-Type': 'application/json'}};
    axios.post('/api/managerprofile',{
      student: this.state.student,
      department: this.state.department
    }, config)
    .then(response => {
      if (response.data == 'error'){
        alert('Invalid student username. Please enter a different username');
      }
      else alert('Your changes have been saved');
      window.location = '/myprofile';
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default ManagerProfile;
