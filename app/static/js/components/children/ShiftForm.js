// ShiftForm.js
import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class ShiftForm extends Component {
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
        <h1>Add shift</h1> 
        <Form>
        <FormGroup>
          <Label for="shiftTitle">Title</Label>
          <Input name="shiftTitle" id="shiftTitle" placeholder="Shift" value={this.state.shiftTitle} onChange={this.updateShiftTitle}/>
        </FormGroup>
        <FormGroup>
        <Label for="startTime">Start</Label>
          <Row>
          <Col>
            <select type="select" name="startHour" id="startHour" value={this.state.startHour} onChange={this.changeStartHour}>
              <option></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
          </Col>
          <Col>
            <select type="select" name="startMinute" id="startMinute" value={this.state.startMinute} onChange={this.changeStartMinute}>>
              <option></option>
              <option>00</option>
              <option>15</option>
              <option>30</option>
              <option>45</option>
            </select>
          </Col>
          <Col>
            <select type="select" name="startPeriod" id="startPeriod" value={this.state.startPeriod} onChange={this.changeStartPeriod}>>
              <option></option>
              <option>AM</option>
              <option>PM</option>
            </select>
          </Col>
        </Row>
      </FormGroup>
        <FormGroup>
          <Label for="endTime">End</Label>
            <Row>
            <Col>
              <select type="select" name="endHour" id="endHour" value={this.state.endHour} onChange={this.changeEndHour}>
                <option></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </Col>
            <Col>
              <select type="select" name="endMinute" id="endMinute" value={this.state.endMinute} onChange={this.changeEndMinute}>
                <option></option>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </select>
            </Col>
            <Col>
              <select type="select" name="endPeriod" id="endPeriod" value={this.state.endPeriod} onChange={this.changeEndPeriod}>
                <option></option>
                <option>AM</option>
                <option>PM</option>
              </select>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label for="comment">Comments</Label>
          <Input name="email" id="comment" placeholder="busy shift"/>
        </FormGroup>
        <FormGroup>
          <Col>
            <Button onClick={this.props.submitForm}>Submit</Button>
          </Col>
        </FormGroup>
        </Form> 
      </div>) 
  }
}

export default ShiftForm; 