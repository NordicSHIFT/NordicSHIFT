// SelectSchedules.js
import axios from 'axios';
import React, { Component } from 'react';
import ManagerMenubar from './../children/ManagerMenubar';
import SuggestCal from './../children/SuggestCal'; 
import SuggestList from './../children/SuggestList'; 
import { Row, Col, Button } from 'reactstrap'; 

var origin = window.location.origin;

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

export default class SelectSchedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assignedShift: [],
      unassignedShift: [],
      scheduleIndex: 1, 
      basePublishPath: "/managerschedule/" + this.props.match.params.startDate,
      publishPath: "/managerschedule/" + this.props.match.params.startDate + "/0" 
    }
    this.generateSchedule = this.generateSchedule.bind(this);
    this.setStateAssignedShift = this.setStateAssignedShift.bind(this);
    this.setStateUnassignedShift = this.setStateUnassignedShift.bind(this);
    this.setAllSchedules = this.setAllSchedules.bind(this); 
    this.changeSchedule = this.changeSchedule.bind(this); 

    this.generateSchedule(); 
  }

  setStateAssignedShift(shifts){
    this.setState({"assignedShift":shifts});
    var events = convertShiftstoEvents(shifts);  
    //console.log("assigned events", events);
    const theevents = this.refs.calendar.state.events.concat(events); 
    this.refs.calendar.setState({events: theevents}); 

  }

  setStateUnassignedShift(shifts){
    this.setState({"unassignedShift":shifts}); 
    var events = convertShiftstoEvents(shifts);  
    //console.log("unassigned events", events); 
    const theevents = this.refs.calendar.state.events.concat(events); 
    this.refs.calendar.setState({events: theevents});  
  }

  setAllSchedules(schedules) {
      this.setState({"schedules":schedules}); 
  }

  changeSchedule(scheduleNum) {
      console.log("CHANGING SCHEDULE"); 
      let scheduleIndex = parseInt(scheduleNum);  //TODO change to -1
      let publishPath = this.state.basePublishPath + "/" + scheduleIndex; 
      this.setState({"scheduleIndex": scheduleIndex, "publishPath": publishPath}); 
      let newSched = this.state.schedules[scheduleIndex]; 
      this.setStateAssignedShift(newSched['assigned shifts']); 
      this.setStateUnassignedShift(newSched['unassigned shifts']); 

      //console.log("this.state: ", this.state); 
    //   console.log("new schedule index: ", scheduleIndex); 
  }

  generateSchedule() {
    var config = { headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
    }

    axios.get(origin + '/api/generateSchedule', config)
    .then( (response) => {
      // alert('response made it back');
      // console.log("response.data.items: ",response.data.items);
      // this.setState({schedule: String(response.data.items)});
      console.log("schedules:", response.data[0]);
      console.log("schedules: ",response.data[1]); 
      this.setStateAssignedShift(response.data[0]['assigned shifts']);
      this.setStateUnassignedShift(response.data[0]['unassigned shifts']); 
      this.setAllSchedules(response.data); 

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="selectSchedule">
        <ManagerMenubar />
        <h3> Suggested Schedules </h3>
        <Row>
          <Col xs="9">
            <SuggestCal id="calendar" ref="calendar" startDate={this.props.match.params.startDate} />
          </Col>
          <Col xs="3">
            <SuggestList changeSchedule={this.changeSchedule}/> 
            <a href={this.state.basePublishPath}>
                <Button>Publish this Schedule</Button>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}
