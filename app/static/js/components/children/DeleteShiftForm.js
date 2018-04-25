// ShiftForm.js
import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class DeleteShiftForm extends Component {
  constructor(props){
    super(props);
    this.state={
      shiftTitle: "Shift", 
      startHour: "", 
      startMinute: "",
      startPeriod:"",
      endHour: "", 
      endMinute: "", 
      endPeriod:"",
      comments:""};

    this.updateShiftTitle = this.updateShiftTitle.bind(this); 
    this.changeStartHour = this.changeStartHour.bind(this); 
    this.changeStartMinute = this.changeStartMinute.bind(this); 
    this.changeStartPeriod = this.changeStartPeriod.bind(this); 

    this.changeEndHour = this.changeEndHour.bind(this); 
    this.changeEndMinute = this.changeEndMinute.bind(this); 
    this.changeEndPeriod = this.changeEndPeriod.bind(this);
  }

  updateShiftTitle(evt){
    this.setState({shiftTitle: evt.target.value});
  }
  changeStartHour(event) {
    this.setState({startHour : event.target.value});
  }
  changeStartMinute(event) {
    this.setState({startMinute : event.target.value});
  }
  changeStartPeriod(event) {
    this.setState({startPeriod : event.target.value});
  }
  changeEndHour(event) {
    this.setState({endHour : event.target.value});
  }
  changeEndMinute(event) {
    this.setState({endMinute : event.target.value});
  }
  changeEndPeriod(event) {
    this.setState({endPeriod : event.target.value});
  }

  render() {
    return (
      <div>
        <Form className='text-center'>
        <FormGroup>
          <Col>
            <Button onClick={this.props.deleteShift}>Delete</Button>
            <Button onClick={this.props.stopDelete}>Keep Shift</Button>
          </Col>
        </FormGroup>
        
        </Form> 
      </div>) 
  }
}

export default DeleteShiftForm; 