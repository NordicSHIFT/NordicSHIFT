// Calendar.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Menubar from './Menubar'; 
import ManagerCal from './ManagerCal'; 
import ShiftForm from './ShiftForm'; 

var origin = window.location.origin;

function extractEventDetails(slotInfo) {
  const startDate = new Date(slotInfo.start); 
  const endDate = new Date(slotInfo.end); 
  const startHour = startDate.getHours() > 12 ? startDate.getHours() - 12 : startDate.getHours(); 
  const startPeriod = startDate.getHours() > 11 ? "PM" : "AM"; 
  const startMinute = startDate.getMinutes(); 
  const endHour = endDate.getHours() > 12 ? endDate.getHours() - 12 : endDate.getHours(); 
  const endMinute = endDate.getMinutes(); 
  const endPeriod = endDate.getHours() > 11 ? "PM" : "AM"; 
  const stateReturn =  {
    startDate: startDate, 
    endDate: endDate, 
    startHour: startHour.toString(), 
    startMinute: startMinute.toString(), 
    startPeriod: startPeriod, 
    endHour: endHour.toString(), 
    endMinute: endMinute.toString(), 
    endPeriod: endPeriod
  }
  return stateReturn; 
}

function postEvent(theEvent) {
  var config = { headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'}
  }
  var respData = axios.post('/api/addEvent', {
    myEvent: theEvent
  }, config) 
  .then( (response) => {
    const responseData = response.data 
  })
  .catch(function (error) {
    console.log(error);
  });
}

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      res: []
    };
    this.slotInfoToForm = this.slotInfoToForm.bind(this);
    this.formInfoToCal = this.formInfoToCal.bind(this); 
  }

  slotInfoToForm(slotInfo) {
    this.refs.form.setState(extractEventDetails(slotInfo)); 
  }

  formInfoToCal() {
    //convert start time
    var start = this.refs.form.state.startDate; 
    start.setMinutes(this.refs.form.state.startMinute); 
    if (this.refs.form.state.startPeriod == "AM") {
      start.setHours(this.refs.form.state.startHour); 
    }
    else {
      const origStartHour = parseInt(this.refs.form.state.startHour); 
      const startHour = (origStartHour == 12) ? origStartHour : origStartHour + 12; 
      start.setHours(startHour) ; 
    } 
    //convert end time
    var end = this.refs.form.state.endDate; 
    end.setMinutes(this.refs.form.state.endMinute); 
    if (this.refs.form.state.endPeriod == "AM") {
      end.setHours(this.refs.form.state.endHour); 
    }
    else {
      const origEndHour = parseInt(this.refs.form.state.endHour); 
      const endHour = (origEndHour == 12) ? origEndHour : origEndHour + 12;  
      end.setHours(endHour) ; 
    } 
    console.log("shiftTitle", this.refs.form.state.shiftTitle); 
    const theEvent = {
      title: this.refs.form.state.shiftTitle, 
      start: start,
      end: end, 
    }; 
    //TODO send to back end to add to DB 
    var theevents = this.refs.calendar.state.events.concat([theEvent]);
    postEvent(theEvent); 
    this.refs.calendar.setState({events: theevents}); 
  }

  render() {
    return (
      <div className="Calendar">
        <Menubar /> 
        <Row>
          <Col xs="9"><ManagerCal id="calendar" ref="calendar" formCalInt = {this.slotInfoToForm} /></Col>
          <Col xs="3"><ShiftForm id="form" ref="form" submitForm = {this.formInfoToCal}/></Col>
        </Row>
      </div>
    );
  }
}

export default Calendar;
