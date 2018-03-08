//StudentProfile.js
import axios from 'axios';
import React, { Component } from 'react';
import { Col, Input, InputGroup, InputGroupButton, Button } from 'reactstrap'; 
import StudentMenubar from './children/StudentMenubar'; 

const style = {
  backgroundColor:"#f1f1f1"
};

class StudentProfile extends Component {
  constructor(props){
   super(props);
   this.state={department: "", student: "", hours: "", isHoursHidden: true, newHours: ""};

   this.retrieveDepartment = this.retrieveDepartment.bind(this); 
   this.retrieveHours = this.retrieveHours.bind(this);

   this.editHoursClick = this.editHoursClick.bind(this); 
   this.updateInputValueHours = this.updateInputValueHours.bind(this); 
   this.sendHoursNew = this.sendHoursNew.bind(this); 

   this.retrieveDepartment(); 
   this.retrieveHours(); 
  }

  handleClick(){
    console.log("value of department: "+this.state.department);
    console.log("value of student"+this.state.student);
  }

  updateInputValueHours(evt){
    this.setState({newHours: evt.target.value});
  }

  editHoursClick(){
    this.setState({isHoursHidden: !this.state.isHoursHidden});
  }

  render() {
    return (
      <div id ='myprofile' >
        <StudentMenubar />
        <Col xs="9" sm="12" md={{ size: 6, offset: 1 }}> 
        <h5><b>Department: </b>{this.state.department}</h5>
        <p><i>Your manager has control over which department you belong to.</i></p>
        <hr />
        <h5><b>Hours Requested: </b>{this.state.hours}</h5>
        <Button onClick={this.editHoursClick} size="sm">Edit Number of Hours</Button>
        {this.state.isHoursHidden ? null : 
        <InputGroup>
          <Input type="text" id ='hours' placeholder="Enter Hours Requested" className="hours" value = {this.state.newHours} onChange={this.updateInputValueHours} required />
          <InputGroupButton color="success" type="submit" id='hoursButton' onClick ={this.sendHoursNew}>Submit</InputGroupButton>
        </InputGroup> }
        </Col>
      </div>
    );
  }

  retrieveDepartment(){
    //console.log("getting department"); 
    axios.get('/api/getStudentDept')
    .then(res => {
      //console.log(res); 
      this.setState({ department: res.data }); 
    })
    .catch(function (error) {
      console.log(error);
    });  
  }

  retrieveHours(){
    axios.get('/api/getStudentHours')
    .then(res => {
      //console.log(res); 
      this.setState({ hours: res.data }); 
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  sendHoursNew(){
    var config = { headers: {
                      'Content-Type': 'application/json'}};
    axios.post('/api/setStudentHours',{
      hours: this.state.newHours
    }, config)
    .then(response => {
      console.log("this.state: ", this.state);
      //window.location = '/myprofile';
      this.setState({hours: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default StudentProfile;
