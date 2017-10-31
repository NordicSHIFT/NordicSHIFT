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
    return theEvent; 
  }

  componentDidMount() {
    // var url =  origin + '/api/calendar'
    // axios.get(url)
    // .then(res => {
    //   const results = res.data.calData
    //   this.setState({ results });
    // });
      
  }  

  render() {

    return (
      <div className="Calendar">
        <Row>
          <Col xs="9"><ManagerCal id="calobj" ref="calobj" formCalInt = {this.formCalInteraction} /></Col>
          <Col xs="3"><ShiftForm /></Col>
        </Row>
      </div>
    );
  }
}

export default Calendar;
