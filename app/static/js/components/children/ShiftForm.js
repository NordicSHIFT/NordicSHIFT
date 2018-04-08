// ShiftForm.js
import React, { Component } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class ShiftForm extends Component {
  constructor(props){
    super(props);
    var daysState  = {1:false,2:false,3:false,4:false,5:false,6:false,0:false}; 
    this.state={
      shiftTitle: "Shift", 
      startHour: "", 
      startMinute: "",
      startPeriod:"",
      endHour: "", 
      endMinute: "", 
      endPeriod:"",
      comments:"", 
      days: daysState
    };

    this.updateShiftTitle = this.updateShiftTitle.bind(this); 
    this.changeStartHour = this.changeStartHour.bind(this); 
    this.changeStartMinute = this.changeStartMinute.bind(this); 
    this.changeStartPeriod = this.changeStartPeriod.bind(this); 

    this.changeEndHour = this.changeEndHour.bind(this); 
    this.changeEndMinute = this.changeEndMinute.bind(this); 
    this.changeEndPeriod = this.changeEndPeriod.bind(this);

    this.toggleMon = this.toggleMon.bind(this); 
    this.toggleTues = this.toggleTues.bind(this); 
    this.toggleWed = this.toggleWed.bind(this); 
    this.toggleThur = this.toggleThur.bind(this); 
    this.toggleFri = this.toggleFri.bind(this); 
    this.toggleSat = this.toggleSat.bind(this); 
    this.toggleSun = this.toggleSun.bind(this); 

  }

  onSubmit(event) {
    event.preventDefault();
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

  toggleMon(event) { 
      this.state.days[1] = !this.state.days[1]; 
      this.setState({days: this.state.days}); 
  }
  toggleTues(event) {
    this.state.days[2] = !this.state.days[2]; 
    this.setState({days: this.state.days}); 
  }
  toggleWed(event) {
    this.state.days[3] = !this.state.days[3]; 
    this.setState({days: this.state.days}); 
  }
  toggleThur(event) {
    this.state.days[4] = !this.state.days[4]; 
    this.setState({days: this.state.days}); 
  }
  toggleFri(event) {
    this.state.days[5] = !this.state.days[5]; 
    this.setState({days: this.state.days}); 
  }
  toggleSat(event) {
    this.state.days[6] = !this.state.days[6]; 
    this.setState({days: this.state.days}); 
  }
  toggleSun(event) {
    this.state.days[0] = !this.state.days[0]; 
    this.setState({days: this.state.days}); 
  }

  render() {
    return (
      <div>
        <Form>
        <div>
          <Label for="shiftTitle">Title</Label>
          <Input name="shiftTitle" id="shiftTitle" placeholder="Shift" value={this.state.shiftTitle} onChange={this.updateShiftTitle}/>
        </div>
        <div>
        <Label for="startTime">Start</Label>
          <Row>
          <Col>
            <Input type="select" name="startHour" id="startHour" value={this.state.startHour} onChange={this.changeStartHour}>
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
            </Input>
          </Col>
          <Col>
            <Input type="select" name="startMinute" id="startMinute" value={this.state.startMinute} onChange={this.changeStartMinute}>>
              <option></option>
              <option>00</option>
              <option>15</option>
              <option>30</option>
              <option>45</option>
            </Input>
          </Col>
          <Col>
            <Input type="select" name="startPeriod" id="startPeriod" value={this.state.startPeriod} onChange={this.changeStartPeriod}>>
              <option></option>
              <option>AM</option>
              <option>PM</option>
            </Input>
          </Col>
        </Row>
      </div>
        <div>
          <Label for="endTime">End</Label>
            <Row>
            <Col>
              <Input type="select" name="endHour" id="endHour" value={this.state.endHour} onChange={this.changeEndHour}>
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
              </Input>
            </Col>
            <Col>
              <Input type="select" name="endMinute" id="endMinute" value={this.state.endMinute} onChange={this.changeEndMinute}>
                <option></option>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </Input>
            </Col>
            <Col>
              <Input type="select" name="endPeriod" id="endPeriod" value={this.state.endPeriod} onChange={this.changeEndPeriod}>
                <option></option>
                <option>AM</option>
                <option>PM</option>
              </Input>
            </Col>
          </Row>
        </div>
        <div>
            <Label>Repeat On:</Label>
            <Row>
            <Col check inline>
                <Label check>
                    <Input type="checkbox" id="sunday" checked={this.state.days[0]} onClick={this.toggleSun}/>S
                </Label>
            </Col>
            <Col check inline>
                <Label check>
                    <Input type="checkbox" id="monday" checked={this.state.days[1]} onClick={this.toggleMon} />M
                </Label>
            </Col>
            <Col check inline>
                <Label check>
                    <Input type="checkbox" id="tuesday" checked={this.state.days[2]} onClick={this.toggleTues}/>T
                </Label>
            </Col>
            <Col check inline>
                <Label check>
                    <Input type="checkbox" id="wednesday" checked={this.state.days[3]} onClick={this.toggleWed}/>W
                </Label>
            </Col>
            <Col check inline>
                <Label check>
                    <Input type="checkbox" id="thursday" checked={this.state.days[4]} onClick={this.toggleThur}/>Th
                </Label>
            </Col>
            <Col check inline>
                <Label check>
                    <Input type="checkbox" id="friday" checked={this.state.days[5]} onClick={this.toggleFri}/>F
                </Label>
            </Col>
            <Col check inline>
                <Label check>
                    <Input type="checkbox" id="saturday" checked={this.state.days[6]} onClick={this.toggleSat}/>S
                </Label>
            </Col>
            </Row>
        </div>
        <div>
          <Label for="comment">Comments</Label>
          <Input name="email" id="comment" placeholder="busy shift"/>
        </div>
        <div>
          <Col>
            <Button onClick={this.props.submitForm}>Submit</Button>
          </Col>
        </div>
        </Form> 
      </div>) 
  }
}

export default ShiftForm; 