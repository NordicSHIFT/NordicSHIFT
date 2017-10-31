// Calendar.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import ManagerCal from './ManagerCal'; 
import ShiftForm from './ShiftForm'; 

var origin = window.location.origin;

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      res: []
    };
    this.formCalInteraction = this.formCalInteraction.bind(this);
  }

  formCalInteraction(slotInfo) {
    alert(
      `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
      `\nend: ${slotInfo.end.toLocaleString()}` + ` ${slotInfo.action} `
    );
    console.log("this.refs", this.refs); 
    // console.log("this.refs.calobj", ReactDOM.findDOMNode(this.refs.calobj)); 
    const theEvent = {
      title: "Event created from Calendar.js", 
      start: new Date(slotInfo.start),
      end: new Date(slotInfo.end),
    }; 
    var theevents = this.refs.calendar.state.events.concat([theEvent]);
    this.refs.calendar.setState({events: theevents}); 
  }

  render() {

    return (
      <div className="Calendar">
        <Row>
          <Col xs="9"><ManagerCal id="calendar" ref="calendar" formCalInt = {this.formCalInteraction} /></Col>
          <Col xs="3" id="form" ref="form"><ShiftForm /></Col>
        </Row>
      </div>
    );
  }
}

export default Calendar;
