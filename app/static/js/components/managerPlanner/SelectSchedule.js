// SelectSchedules.js
import axios from 'axios';
import React, { Component } from 'react';
import ManagerMenubar from './../children/ManagerMenubar';
import SuggestCal from './../children/SuggestCal'; 
import SuggestList from './../children/SuggestList'; 
import { Row, Col, Button } from 'reactstrap'; 

import * as util from './../../util.js'; 
var origin = window.location.origin;

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
    this.setStateShifts = this.setStateShifts.bind(this);
    this.setAllSchedules = this.setAllSchedules.bind(this); 
    this.changeSchedule = this.changeSchedule.bind(this); 

    this.generateSchedule(); 
  }

  setStateShifts(shifts){
    this.setState({"assignedShift":shifts});
    var events = util.convertShiftstoEvents(shifts);  
    //console.log("assigned events", events);
    //const theevents = this.refs.calendar.state.events.concat(events); 
    this.refs.calendar.setState({events: events}); 

  }

  setAllSchedules(schedules) {
      this.setState({"schedules":schedules}); 
  }

  changeSchedule(scheduleNum) {
      console.log("CHANGING SCHEDULE"); 
      let scheduleIndex = parseInt(scheduleNum)- 1;  //TODO change to -1
      let publishPath = this.state.basePublishPath + "/" + scheduleIndex; 
      this.setState({"scheduleIndex": scheduleIndex, "publishPath": publishPath}); 
      if (scheduleNum == "3") {
        this.setStateShifts([]); 
        console.log("scheduleIndex == 3"); 
        //this.setStateUnassignedShift([]); 
      } else {
        let newSched = this.state.schedules[scheduleIndex]; 
        let newShifts = newSched['assigned shifts'].concat(newSched['unassigned shifts'])
        this.setStateShifts(newShifts); 
        //this.setStateUnassignedShift(newSched['unassigned shifts']);
        console.log("newShifts", newShifts); 
      }
       

      console.log("this: ", this); 
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
      this.setStateShifts(response.data[0]['assigned shifts'].concat(response.data[0]['unassigned shifts']));
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
            <a href={this.state.publishPath}>
                <Button>Publish this Schedule</Button>
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}
