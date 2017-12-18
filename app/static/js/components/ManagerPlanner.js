// Calendar.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import ManagerMenubar from './children/ManagerMenubar'; 
import ManagerCal from './children/ManagerCal'; 
import ShiftForm from './children/ShiftForm'; 
import EditShiftForm from './children/EditShiftForm'; 

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
  var days = {1:false,2:false,3:false,4:false,5:false,6:false,0:false}; 
  days[endDate.getDay()] = true; 
  const stateReturn =  {
    startDate: startDate, 
    endDate: endDate, 
    startHour: startHour.toString(), 
    startMinute: startMinute.toString(), 
    startPeriod: startPeriod, 
    endHour: endHour.toString(), 
    endMinute: endMinute.toString(), 
    endPeriod: endPeriod, 
    days: days
  }
  return stateReturn; 
}

function changeEventFromForm(form) {
    //convert start time
    var start = form.state.startDate; 
    start.setDate(start.getDate() - start.getDay()); 
    start.setMinutes(form.state.startMinute); 
    if (form.state.startPeriod == "AM") {
      start.setHours(form.state.startHour); 
    }
    else {
      const origStartHour = parseInt(form.state.startHour); 
      const startHour = (origStartHour == 12) ? origStartHour : origStartHour + 12; 
      start.setHours(startHour) ; 
    } 
    //convert end time
    var end = form.state.endDate; 
    end.setDate(end.getDate() - end.getDay()); 
    end.setMinutes(form.state.endMinute); 
    if (form.state.endPeriod == "AM") {
      end.setHours(form.state.endHour); 
    }
    else {
      const origEndHour = parseInt(form.state.endHour); 
      const endHour = (origEndHour == 12) ? origEndHour : origEndHour + 12;  
      end.setHours(endHour) ; 
    } 
    //create events list
    var events = []; 
    var i; 
    for (i = 0; i < 7; i++) { 
        if (form.state.days[i]) {
            start.setDate(start.getDate() - start.getDay());
            start.setDate(start.getDate() + i); 
            end.setDate(end.getDate() - end.getDay());
            end.setDate(end.getDate() + i); 
            var theEvent = {
                title: form.state.shiftTitle, 
                start: new Date(start),
                end: new Date(end), 
            }
            events = events.concat([theEvent]); 
        }
    }
    console.log(events); 
    return events
}

class ManagerPlanner extends Component {
  constructor() {
    super();
    this.state = {
      formInvisible: true, 
      deleteFormInvisible: true
    };
    this.slotInfoToForm = this.slotInfoToForm.bind(this);
    this.shiftToEdit = this.shiftToEdit.bind(this); 
    this.formInfoToCal = this.formInfoToCal.bind(this); 
    this.postEvents = this.postEvents.bind(this); 
    this.deleteShift = this.deleteShift.bind(this); 
    this.stopDelete = this.stopDelete.bind(this); 
  }

  slotInfoToForm(slotInfo) {
    console.log("slotInfoToForm"); 
    this.setState({formInvisible: false}); 
    if (this.state.shiftToDelete != null) {
      var event = this.state.shiftToDelete; 
      var theEvents = this.refs.calendar.state.events;
      const idx = theEvents.indexOf(event);  
      event.hexColor = "#f89406"; 
      theEvents.splice(idx,1,event); 
      this.refs.calendar.setState({events: theEvents}); 
    }
    this.refs.form.setState(extractEventDetails(slotInfo)); 
  }

  shiftToEdit(event) { 
    var theEvents = this.refs.calendar.state.events;
    const idx = theEvents.indexOf(event);  
    event.hexColor = "#f44242"; 
    theEvents.splice(idx,1,event); 
    this.refs.calendar.setState({events: theEvents}); 
    this.setState({shiftToDelete: event, formInvisible: true, deleteFormInvisible: false}); 
  }

  formInfoToCal() {
      //this is for adding a shift
    const theEvents = changeEventFromForm(this.refs.form); 
    this.postEvents(theEvents); 
    //TODO send to back end to add to DB 
  }

  stopDelete() {
    if (this.state.shiftToDelete != null) {
      const event = this.state.shiftToDelete; 
      var theEvents = this.refs.calendar.state.events;
      const idx = theEvents.indexOf(event);  
      event.hexColor = "#f89406"; //TODO or whatever color...
      theEvents.splice(idx,1,event); 
      console.log("theEvents", theEvents); 
      this.refs.calendar.setState({events: theEvents}); 
      this.setState({shiftToDelete: null, deleteFormInvisible: true});
    }

  }

  deleteShift() {
    var config = { headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
    }
    var theEvents = this.refs.calendar.state.events;
    const event = this.state.shiftToDelete; 
    const idx = theEvents.indexOf(event);  
    var theEvents = theEvents.splice(idx,1); 

    this.setState({
      events: theEvents,
      deleteFormInvisible: true,
      shiftToDelete: null
    })

    axios.post('/api/deleteEvent', {
      myEvent: event
    }, config) 
    .then( (response) => {
      //alert('event posted to db'); 
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  postEvents(theEvents) {
    var config = { headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
    }
    var respData = axios.post('/api/addEvents', {
      myEvents: theEvents
    }, config) 
    .then( (response) => {
      const responseData = response.data 
      var i, newEvent, theEvents; 
      theEvents = this.refs.calendar.state.events; 
      for (i = 0; i < responseData.length; i++) {
          newEvent = {
            title: responseData[i].title, 
            start: new Date(responseData[i].start),
            end: new Date(responseData[i].end), 
            hexColor: responseData[i].hexColor
          }
          theEvents = theEvents.concat([newEvent]); 
      }
      this.refs.calendar.setState({events: theEvents}); 
      //this.setState({formInvisible: true}); 
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  render() {
    return (
      <div className="Calendar">
        <ManagerMenubar /> 
        <Row>
          <Col xs="9"><ManagerCal id="calendar" ref="calendar" formCalInt = {this.slotInfoToForm} shiftToEdit = {this.shiftToEdit} removeToDelete={this.stopDelete}/></Col>
          {this.state.formInvisible ? 
            null
            : <Col xs="3"><ShiftForm id="form" ref="form" submitForm = {this.formInfoToCal} style={{hidden: true}} /></Col>} 
          {this.state.deleteFormInvisible ? 
            null
            : <Col xs="3"><EditShiftForm id="editForm" ref="editForm" submitForm={this.formInfoToCal} deleteShift={this.deleteShift} stopDelete={this.stopDelete}/></Col>}
          <a href="generateSchedule">
            <Button>Generate Schedule</Button>
          </a>
        </Row>
      </div>
    );
  }
}

export default ManagerPlanner;
