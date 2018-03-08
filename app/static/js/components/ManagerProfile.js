//ManagerProfile.js
import axios from 'axios';
import React, { Component } from 'react';
import { Row, Col, Button, Label, Input, InputGroup, InputGroupAddon, InputGroupButton, Table, Form, FormGroup} from 'reactstrap';
import ManagerMenubar from './children/ManagerMenubar';
import RosterTable from './children/RosterTable';

const style = {
  backgroundColor:"#f1f1f1"
};


export default class ManagerProfile extends Component {
  constructor(props){
   super(props);

   this.state={
       department: "",
       student: "",
       existingStudents: [],
       studentRemove:"",
       isHidden: true,
       isHiddenStud: true,
       isHiddenRemove: true,
       existingDepartments: [] };
   this.sendDepartmentNew = this.sendDepartmentNew.bind(this);
   this.sendDepartmentExisting = this.sendDepartmentExisting.bind(this);
   this.sendDepartmentChange = this.sendDepartmentChange.bind(this);
   this.sendNewStudent = this.sendNewStudent.bind(this);
   this.updateInputValueDepartment = this.updateInputValueDepartment.bind(this);
   this.updateInputValueStudent = this.updateInputValueStudent.bind(this);
   this.onRemoveStudentSelected = this.onRemoveStudentSelected.bind(this);
   this.retrieveDepartment = this.retrieveDepartment.bind(this);
   this.editDepartmentClick = this.editDepartmentClick.bind(this);
   this.addStudentClick = this.addStudentClick.bind(this);
   this.retrieveExistingDepartments = this.retrieveExistingDepartments.bind(this);
   this.onDepartmentDropdownSelected = this.onDepartmentDropdownSelected.bind(this);
   this.tableChanged = this.tableChanged.bind(this);
   this.sendStudentChanges = this.sendStudentChanges.bind(this);
   this.removeStudentClick = this.removeStudentClick.bind(this);
   this.sendRemoveStudent = this.sendRemoveStudent.bind(this);
   this.retrieveExistingStudents = this.retrieveExistingStudents.bind(this);

   this.retrieveDepartment();
   this.retrieveExistingDepartments();
   this.retrieveExistingStudents();
  }

  handleClick(){
    console.log("value of department: "+this.state.department);
    console.log("value of student"+this.state.student);
  }

  updateInputValueDepartment(evt){
    this.setState({newDepartment: evt.target.value});
  }

  updateInputValueStudent(evt){
    this.setState({student: evt.target.value});
  }

  onRemoveStudentSelected(evt){
    this.setState({studentRemove: evt.target.value});
  }

  onDepartmentDropdownSelected(e) {
    //console.log("THE VAL", e.target);
    this.setState({selectDept: e.target.value});
    //here you will see the current selected value of the select input
  }

  editDepartmentClick(){
    this.setState({isHidden: !this.state.isHidden});
  }

  addStudentClick(){
    this.setState({isHiddenStud: !this.state.isHiddenStud})
  }

  removeStudentClick(){
    this.setState({isHiddenRemove: !this.state.isHiddenRemove})
  }

  tableChanged(){
    this.setState({studTableChanged: true});
  }

  render() {
    return (
      <div id ='managerprofile'>
        <ManagerMenubar />
        <Col xs="9">
          <h5><b>Department: </b>{this.state.department}</h5>
          <div width="50%">
            <Button onClick={this.editDepartmentClick} size="sm">Edit Department</Button>
            {this.state.isHidden ? null :
              <div id="editDepartment" xs="6">
              <InputGroup>
              <InputGroupAddon addonType="prepend">Select Existing</InputGroupAddon>
                <Input type="select" onChange={this.onDepartmentDropdownSelected} label="Department Select">
                <option key="" value=""></option>
                {this.state.existingDepartments}
                </Input>
                <InputGroupAddon color="success" type="submit" id='departmentButton' onClick ={this.sendDepartmentExisting}>Submit</InputGroupAddon>
              </InputGroup>
              <InputGroup>
                <Input type="text" id ='department' placeholder="Enter New Department" className="department" value = {this.state.newDepartment} onChange={this.updateInputValueDepartment} required />
                <InputGroupAddon color="success" type="submit" id='departmentButton' onClick ={this.sendDepartmentNew}>Submit</InputGroupAddon>
              </InputGroup>
              </div>}
          </div>
        </Col>
        <br></br>
          <Row>
            <Col xs="9">
              <h5><b>Students: </b> </h5>
              <div>
              <Button onClick={this.addStudentClick} size="sm">Add a Student</Button>
                {this.state.isHiddenStud ? null :
                    <div>
                    <p><i>Enter your students usernames here to add them to your roster. It should be in the format of username@luther.edu</i></p>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">Student</InputGroupAddon>
                    <Input type="text" id ='student' placeholder="Enter Student Id" className="student" value ={this.state.student} onChange={this.updateInputValueStudent} required />
                    <InputGroupAddon color="success" addonType="append" type="submit" id='studentButton' onClick ={this.sendNewStudent.bind(this)}>Submit</InputGroupAddon>
                    </InputGroup>
                    </div>
                }
              </div>
              </Col>
              <Col xs="9">
              <div>
              <Button onClick={this.removeStudentClick} size="sm">Remove a Student</Button>
                {this.state.isHiddenRemove ? null :
                    <div>
                    <p><i>Choose student remove them to your roster. It should be in the format of username@luther.edu</i></p>
                    // <InputGroup>
                    // <InputGroupAddon addonType="prepend">Student</InputGroupAddon>
                    // <Input type="text" id ='removedStudent' placeholder="Enter Student Id" className="studentRemove" value ={this.state.studentRemove} onChange={this.updateInputValueStudentDelete.bind(this)} required />
                    // <InputGroupAddon color="success" addonType="append" type="submit" id='removeStudentButton' onClick ={this.sendRemoveStudent.bind(this)}>Submit</InputGroupAddon>
                    // </InputGroup>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">Select Existing</InputGroupAddon>
                    <Input type="select" onChange={this.onRemoveStudentSelected} label="Student Select">
                    <option key="" value=""></option>
                    {this.state.existingStudents}
                    </Input>
                    <InputGroupAddon color="success" type="submit" id='departmentButton' onClick ={this.sendRemoveStudent}>Submit</InputGroupAddon>
                    </InputGroup>
                    </div>
                }
              </div>
             </Col>
           </Row>
         <br></br>
          <Col xs="11">
            {!this.state.studTableChanged ? null :
            <Button onClick={this.sendStudentChanges} color="danger" size="sm">Save changes</Button>
            }
            <RosterTable ref="studentTable" tableChanged={this.tableChanged}/>
          </Col>
      </div>
    );
  }

  retrieveExistingDepartments() {
    //TODO axios call to get departments
    //console.log("getting department");
    axios.get('/api/getAllDepartments')
    .then(res => {
      //console.log("res.data",res.data);
      let items = [];
      for (let i = 0; i < res.data.length; i++) {
           items.push(<option key={res.data[i][0]} value={res.data[i][1]}>{res.data[i][1]}</option>);
           //console.log(res.data[i]);
           //here I will be creating my options dynamically based on
           //what props are currently passed to the parent component
      }
      this.setState({existingDepartments: items});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  retrieveDepartment(){
    //console.log("getting department");
    axios.get('/api/getManagerDept')
    .then(res => {
      //console.log(res);
      this.setState({ department: res.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  sendDepartmentExisting(){
    this.sendDepartmentChange("",this.state.selectDept);
  }

  sendDepartmentNew() {
    this.sendDepartmentChange("",this.state.newDepartment)
  }

  sendDepartmentChange(newStudent, newDepartment){
    var config = { headers: {
                      'Content-Type': 'application/json'}};
    axios.post('/api/managerprofile',{
      student: newStudent,
      department: newDepartment
    }, config)
    .then(response => {
      if (response.data == 'error'){
        alert('Invalid student username. Please enter a different username');
      }
      else //alert('Your changes have been saved');
      this.setState({department: response.data});
      this.refs.studentTable.createRows();
      //TODO update students when dept changes
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  retrieveExistingStudents(){
    axios.get('/api/getStudents')
    .then(res => {
      //console.log("res.data",res.data);
      let items = [];
      for (let i = 0; i < res.data.length; i++) {
           items.push(<option key={res.data[i][0]} value={res.data[i][1]}>{res.data[i][1]}</option>);
           //console.log(res.data[i]);
           //here I will be creating my options dynamically based on
           //what props are currently passed to the parent component
      }
      this.setState({existingStudents: items});
      console.log("existing students is loaded");
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  sendNewStudent(){
    var config = { headers: {
                      'Content-Type': 'application/json'}};
    axios.post('/api/managerprofile',{
      student: this.state.student,
      department: this.state.newDepartment
    }, config)
    .then(response => {
      if (response.data == 'error'){
        alert('Invalid student username. Please enter a different username');
      }
      else //alert('Your changes have been saved');
      //this.setState({student: response.data});
      console.log("response.data", response.data);
      this.refs.studentTable.createRows();
      //window.location = '/myprofile';
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  sendRemoveStudent(){
    console.log('send student');
    console.log(this.state.studentRemove);
    var config = { headers: {
                      'Content-Type': 'application/json'}};
    axios.post('/api/removeStudent',{
      student: this.state.studentRemove,
      department: this.state.department
    }, config)
    .then(response => {
      if (response.data == 'error'){
        alert('Invalid student username. Please enter a different username');
      }
      else //alert('Your changes have been saved');
      //this.setState({student: response.data});
      console.log("response.data", response.data);
      this.refs.studentTable.createRows();
      //window.location = '/myprofile';
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  sendStudentChanges() {
      var config = { headers: {
        'Content-Type': 'application/json'}};
      axios.post('/api/studentUpdates', {
        students: this.refs.studentTable.state.rows
      }, config)
      .then( (response) => {
        this.setState({studTableChanged: false});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}
