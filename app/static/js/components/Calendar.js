// Calendar.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Menubar from './Menubar'; 
import ManagerCal from './ManagerCal'; 
import ShiftForm from './ShiftForm'; 
import EditShiftForm from './EditShiftForm'; 

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

function changeEventFromForm(form) {
    //convert start time
    console.log("form", form); 
    var start = form.state.startDate; 
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
    end.setMinutes(form.state.endMinute); 
    if (form.state.endPeriod == "AM") {
      end.setHours(form.state.endHour); 
    }
    else {
      const origEndHour = parseInt(form.state.endHour); 
      const endHour = (origEndHour == 12) ? origEndHour : origEndHour + 12;  
      end.setHours(endHour) ; 
    } 
    console.log("shiftTitle", form.state.shiftTitle); 
    const theEvent = {
      title: form.state.shiftTitle, 
      start: start,
      end: end, 
    }; 
    return theEvent

}

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      formInvisible: true, 
      deleteFormInvisible: true
    };
    this.slotInfoToForm = this.slotInfoToForm.bind(this);
    this.shiftToEdit = this.shiftToEdit.bind(this); 
    this.formInfoToCal = this.formInfoToCal.bind(this); 
    this.postEvent = this.postEvent.bind(this); 
    this.deleteShift = this.deleteShift.bind(this); 
    this.stopDelete = this.stopDelete.bind(this); 
  }

  slotInfoToForm(slotInfo) {
    console.log("in slotInfoToForm"); 
    this.setState({formInvisible: false}); 
    console.log("this.refs", this.refs); 
    console.log("this.state", this.state); 
    console.log("this.refs.form",this.refs.form); 
    if (this.state.shiftToDelete != null) {
      var event = this.state.shiftToDelete; 
      var theEvents = this.refs.calendar.state.events;
      const idx = theEvents.indexOf(event);  
      event.hexColor = "#f89406"; 
      theEvents.splice(idx,1,event); 
      console.log("theEvents", theEvents); 
      this.refs.calendar.setState({events: theEvents}); 
    }
    this.refs.form.setState(extractEventDetails(slotInfo)); 
  }

  shiftToEdit(event) {
    console.log("in shift to edit"); 
    var theEvents = this.refs.calendar.state.events;
    const idx = theEvents.indexOf(event);  
    event.hexColor = "#f44242"; 
    theEvents.splice(idx,1,event); 
    console.log("theEvents", theEvents); 
    this.refs.calendar.setState({events: theEvents}); 
    this.setState({shiftToDelete: event, formInvisible: true, deleteFormInvisible: false}); 
  }

  formInfoToCal() {
    console.log("this.state.form", this.refs.form); 
    const theEvent = changeEventFromForm(this.refs.form); 
    this.postEvent(theEvent); 
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
      deleteFormInvisible: true
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

  postEvent(theEvent) {
    var config = { headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
    }
    var respData = axios.post('/api/addEvent', {
      myEvent: theEvent
    }, config) 
    .then( (response) => {
      const responseData = response.data 
      const newEvent = {
        title: responseData.title, 
        start: new Date(responseData.start),
        end: new Date(responseData.end), 
        hexColor: responseData.hexColor
      }
      console.log("newEvent: ", newEvent); 
      console.log("this.refs.calendar.state", this.refs.calendar.state); 
      const theevents = this.refs.calendar.state.events.concat([newEvent]); 
      this.refs.calendar.setState({events: theevents}); 
      //this.setState({formInvisible: true}); 
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  

  render() {
    return (
      <div className="Calendar">
        <Menubar /> 
        <Row>
          <Col xs="9"><ManagerCal id="calendar" ref="calendar" formCalInt = {this.slotInfoToForm} shiftToEdit = {this.shiftToEdit} removeToDelete={this.stopDelete}/></Col>
          {this.state.formInvisible ? 
            null
            : <Col xs="3"><ShiftForm id="form" ref="form" submitForm = {this.formInfoToCal} style={{hidden: true}} /></Col>} 
          {this.state.deleteFormInvisible ? 
            null
            : <Col xs="3"><EditShiftForm id="editForm" ref="editForm" submitForm={this.formInfoToCal} deleteShift={this.deleteShift} stopDelete={this.stopDelete}/></Col>}
        </Row>
      </div>
    );
  }
}

export default Calendar;
