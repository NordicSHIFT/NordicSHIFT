// StudentSchedule.js
import moment from 'moment';
import axios from 'axios';
import React, { Component } from 'react';
import StudentCal from './children/StudentCal'; 
import ManagerMenubar from './children/ManagerMenubar';
import SuggestCal from "./children/SuggestCal"; 

import * as util from './../util.js'; 

var origin = window.location.origin;

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

    //when a schedule index is not passed via url 
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
