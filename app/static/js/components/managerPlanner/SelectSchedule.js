// SelectSchedules.js
import axios from 'axios';
import React, { Component } from 'react';
import ManagerMenubar from './../children/ManagerMenubar';
import SuggestCal from './../children/SuggestCal'; 
import SuggestList from './../children/SuggestList'; 
import { Row, Col, Button } from 'reactstrap'; 

import * as util from './../../util.js'; 
import './../../../css/index.css'
var origin = window.location.origin;

export default class SelectSchedule extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assignedShift: [],
      unassignedShift: [],
      scheduleIndex: 1, 
      basePublishPath: "/managerschedule/" + this.props.match.params.startDate,
      publishPath: "/managerschedule/" + this.props.match.params.startDate + "/0",

      startDate: this.props.match.params.startDate,
      send_emails:false, 
      loading: true
    }
    this.generateSchedule = this.generateSchedule.bind(this);
    this.setStateShifts = this.setStateShifts.bind(this);
    this.setAllSchedules = this.setAllSchedules.bind(this); 
    this.changeSchedule = this.changeSchedule.bind(this); 
    this.chooseSchedule = this.chooseSchedule.bind(this); 
    this.toggleEmail = this.toggleEmail.bind(this);

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
      let newSched = this.state.schedules[scheduleIndex]; 
      let newShifts = newSched['assigned shifts'].concat(newSched['unassigned shifts'])
      this.setStateShifts(newShifts); 
      //this.setStateUnassignedShift(newSched['unassigned shifts']);
      console.log("newShifts", newShifts); 
      console.log("this: ", this); 
    //   console.log("new schedule index: ", scheduleIndex); 
  }

  chooseSchedule(scheduleIndex) {
    var config = { headers: {
        'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      //TODO pass needed info with this. 
      axios.post(origin + '/api/chooseSchedule', {
        schedule: this.state.schedules[this.state.scheduleIndex],
        email: this.state.send_emails
        },  config)
      .then( (response) => {
        console.log(response)
        console.log("response", response); 
        return window.location = '/managerschedule';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  generateSchedule() {
    var config = { headers: {
      'Content-Type': 'application/json'},
      withCredentials: true
    }

    axios.post(origin + '/api/generateSchedule', {
      startDate: this.state.startDate
    }, config)
    .then( (response) => {
      // alert('response made it back');
      // console.log("response.data.items: ",response.data.items);
      // this.setState({schedule: String(response.data.items)});
      console.log("schedules:", response.data[0]);
      console.log("schedules: ",response.data[1]); 
      this.setState({loading: false});
      this.setStateShifts(response.data[0]['assigned shifts'].concat(response.data[0]['unassigned shifts']));
      this.setAllSchedules(response.data); 
    }
    )
    .catch(function (error) {
      console.log(error);
    });
  }

  toggleEmail(event) { 
    this.state.send_emails = !this.state.send_emails;
    this.setState({send_emails: this.state.send_emails});
  }

  render() {
    return (
      <div className="selectSchedule">
        <ManagerMenubar />
        {this.state.loading ? 
        <div>
        <h3> Generating a schedule to meet your staffing needs... </h3> 
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <div class="loader"></div>
        </Col>
        </div> :
        <div>
        <h3> Suggested Schedules </h3>
        <Row>
          <Col xs="9">
            <SuggestCal id="calendar" ref="calendar" startDate={this.props.match.params.startDate} />
          </Col>
          <Col xs="3">
            <SuggestList changeSchedule={this.changeSchedule}/>
            <div>
              <input type="checkbox" id="toggle_email" checked={this.state.send_emails} onClick={this.toggleEmail}/>
              <label for="toggle_email">Send email notification</label>
            </div>
            <Button onClick={this.chooseSchedule}>Publish this Schedule</Button>
          </Col>
        </Row>
        </div>
        }
      </div>
    );
  }
}