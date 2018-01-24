// StudentSchedule.js
import moment from 'moment';
import axios from 'axios';
import React, { Component } from 'react';
import StudentCal from './children/StudentCal'; 
import ManagerMenubar from './children/ManagerMenubar';
import SuggestCal from "./children/SuggestCal"; 


//TODO figure out how to have these imported
import * as util from './../util.js'; 
function convertShiftstoEvents (shifts) {
    var events = []; 
    var shift, index; 
    for (index in shifts) {
        shift = shifts[index]; 
        event = {
            title: shift.student,
            start: new Date(shift.start),
            end: new Date(shift.end),
            hexColor: "#" + intToRGB(hashCode(shift.student))
        }
        events.push(event); 
    }
    return events; 
}

//Taken from stack overflow -> should be revised... 
//https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

//create a different calendar for this page
export default class ManagerSchedule extends Component {

  constructor(props) {
    super(props);
    var startDate; 
    if (this.props.match.params.startDate) {
        startDate = this.props.match.params.startDate; 
    }
    else {
        //TODO figure out how to get the right startDate, 
        //will be used when coming from the dashboard, or not 
        //the planning screens 
        startDate = new Date().getTime(); 
    }
    this.state = {
        startDate: startDate
    }
    console.log(this.props); 

    this.retrieveSchedule = this.retrieveSchedule.bind(this); 
    this.setStateAssignedShift = this.setStateAssignedShift.bind(this);
    this.setStateUnassignedShift = this.setStateUnassignedShift.bind(this);

    this.retrieveSchedule(); 
  }

  setStateAssignedShift(shifts){
    this.setState({"assignedShift":shifts});
    var events = util.convertShiftstoEvents(shifts);  
    //console.log("assigned events", events);
    const theevents = this.refs.calendar.state.events.concat(events); 
    this.refs.calendar.setState({events: theevents}); 

  }

  setStateUnassignedShift(shifts){
    this.setState({"unassignedShift":shifts}); 
    var events = util.convertShiftstoEvents(shifts);  
    //console.log("unassigned events", events); 
    const theevents = this.refs.calendar.state.events.concat(events); 
    this.refs.calendar.setState({events: theevents});  
  }

  retrieveSchedule() {
    var config = { headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
    }

    axios.get('/api/retrieveSchedule', config)
    .then( (response) => {
      // alert('response made it back');
      // console.log("response.data.items: ",response.data.items);
      // this.setState({schedule: String(response.data.items)});
      console.log("response", response); 
      this.setStateAssignedShift(response.data['assigned shifts']);
      this.setStateUnassignedShift(response.data['unassigned shifts']);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return ( 
      <div className="Schedule">
        <ManagerMenubar /> 
        <h3> This is the currently planned schedule. </h3> 
        <SuggestCal id="calendar" ref="calendar" startDate={this.state.startDate} /> 
      </div>
    );
  }
}
