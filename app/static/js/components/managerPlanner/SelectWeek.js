//SelectWeek.js
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import ManagerMenubar from './../children/ManagerMenubar';

import 'react-datepicker/dist/react-datepicker.css';

var origin = window.location.origin;

class SelectWeek extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      endDate: moment(),
      startPath: "/selectshifts/" + moment() 

    }
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date,
      startPath: "/selectshifts/" + date
    });
    console.log("this.state.startPath", this.state.startPath); 
  }
  handleChangeEnd(date) {
    this.setState({
      endDate: date
    });
  }

  render() {
    return (
      <div>
        <ManagerMenubar />
        <h3>Select a period for which you would like to create the schedule.</h3>
        <p>It should align with the days you entered your desired shifts and the dates your workers filled their calendars</p>
          Start
          <DatePicker
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={this.handleChangeStart}
          />
        <Label>End</Label>
        <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
        />

        <a href={this.state.startPath}>
            <Button>Enter needed shifts.</Button>
        </a>
      </div>)
  }

}

export default SelectWeek;
