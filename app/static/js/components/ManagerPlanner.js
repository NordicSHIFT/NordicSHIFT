// Calendar.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import ManagerMenubar from './children/ManagerMenubar'; 
import ManagerCal from './children/ManagerCal'; 
import ShiftForm from './children/ShiftForm'; 
import DeleteShiftForm from './children/DeleteShiftForm'; 

var origin = window.location.origin;

function convertSlotToForm(slotInfo) {
  /*
    convertSlotToForm takes the information from dragging a slot and puts it into the form. 
    It also converts from 24 hour time to 12 hour time
  */
  //get information
  const startDate = slotInfo.start; 
  const endDate = slotInfo.end; 
  const startHour = startDate.getHours() > 12 ? startDate.getHours() - 12 : startDate.getHours(); 
  const startPeriod = startDate.getHours() > 11 ? "PM" : "AM"; 
  const startMinute = startDate.getMinutes(); 
  const endHour = endDate.getHours() > 12 ? endDate.getHours() - 12 : endDate.getHours(); 
  const endMinute = endDate.getMinutes(); 
  const endPeriod = endDate.getHours() > 11 ? "PM" : "AM";  
  var days = {1:false,2:false,3:false,4:false,5:false,6:false,0:false}; 
  days[endDate.getDay()] = true; 
  //return object
  return {
    startDate: slotInfo.start, 
    endDate: slotInfo.end, 
    startHour: startHour.toString(), 
    startMinute: startMinute.toString(), 
    startPeriod: startPeriod, 
    endHour: endHour.toString(), 
    endMinute: endMinute.toString(), 
    endPeriod: endPeriod, 
    days: days
  }
}

function convertFormToEvents(form) {
    /*
    convertFormToEvents takes the form and returns a list of new shifts
    First, it sets the start and end date and time to the Sunday of the week displayed.
    Then, it goes through the array which corresponds to the days of the week. If the day
    is checked, it creates and event for that day and adds it to the list. It does this by 
    setting the date to that day. (For example, if it is Tuesday, it adds 2 to the date, if
    it was Wednesday it would add 3.)
    */
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
    return events
}

function postEvents(theEvents) {
    var config = { headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
    }
    var respData = axios.post('/api/addEvents', {
      myEvents: theEvents
    }, config) 
    .then( (response) => {
        console.log("addEvents was a ", response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

class ManagerPlanner extends Component {
  constructor(props) {
    super(props);
    let suggestedPath = "/suggestedSchedules/" + this.props.match.params.startDate; 
    this.state = {
      formInvisible: true, 
      deleteFormInvisible: true, 
      suggestedPath: suggestedPath
    };
    this.slotInfoToForm = this.slotInfoToForm.bind(this);
    this.processNewShiftForm = this.processNewShiftForm.bind(this); 
    this.showDeleteForm = this.showDeleteForm.bind(this); 
    this.deleteShift = this.deleteShift.bind(this); 
    this.stopDelete = this.stopDelete.bind(this); 
  }

  slotInfoToForm(slotInfo) {
    //remove to delete if it was visible
    this.stopDelete(); 
    //make form visible
    this.setState({formInvisible: false}); 
    //put slot info into form
    this.refs.form.setState(convertSlotToForm(slotInfo)); 
  }

  processNewShiftForm() {  
    //convert form to events 
    var theNewEvents = convertFormToEvents(this.refs.form); 
    //write new events to the database
    postEvents(theNewEvents); 
    //add new events to the calendar on the screen
    var theEvents = this.refs.calendar.state.events.concat(theNewEvents); 
    this.refs.calendar.setState({events: theEvents}); 
  }

  showDeleteForm(event) { 
    this.stopDelete(); 
    var theEvents = this.refs.calendar.state.events;
    const idx = theEvents.indexOf(event);  
    event.hexColor = "#f44242"; 
    theEvents.splice(idx,1,event); 
    this.refs.calendar.setState({events: theEvents}); 
    this.setState({shiftToDelete: event, formInvisible: true, deleteFormInvisible: false}); 
  }

  stopDelete() {
    if (this.state.shiftToDelete != null) {
      const event = this.state.shiftToDelete; 
      var theEvents = this.refs.calendar.state.events;
      const idx = theEvents.indexOf(event);  
      event.hexColor = null; //TODO or whatever color...
      theEvents.splice(idx,1,event); 
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

  render() {
    return (
      <div className="Calendar">
        <ManagerMenubar /> 
        <Row>
          <Col xs="9">
            <ManagerCal id="calendar" ref="calendar" formCalInt = {this.slotInfoToForm} showDeleteForm = {this.showDeleteForm} 
            removeToDelete={this.stopDelete} startDate={this.props.match.params.startDate} />
          </Col>
          {!this.state.formInvisible &&
             <Col xs="3"><ShiftForm id="form" ref="form" submitForm = {this.processNewShiftForm} style={{hidden: true}} /></Col>} 
          {!this.state.deleteFormInvisible &&
             <Col xs="3"><DeleteShiftForm id="deleteForm" ref="deleteForm" deleteShift={this.deleteShift} stopDelete={this.stopDelete}/></Col>}
          <a href={this.state.suggestedPath}>
            <Button>Generate Schedule</Button>
          </a>
        </Row>
      </div>
    );
  }
}

export default ManagerPlanner;
