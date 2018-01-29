//SelectWeek.js
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import ManagerMenubar from './../children/ManagerMenubar';

import 'react-datepicker/dist/react-datepicker.css';

var origin = window.location.origin;

export default class SelectWeek extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      startPath: "/selectshifts/" + moment() 

    }
    this.handleChangeStart = this.handleChangeStart.bind(this);
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date,
      startPath: "/selectshifts/" + date
    });
    console.log("this.state.startPath", this.state.startPath); 
  }

  render() {
    return (
      <div>
        <ManagerMenubar />
        <h5>Select the Sunday when you would like to start your schedule.</h5>
        <p>It should align with the dates your workers filled in their calendars</p>
          Start
          <DatePicker
              selected={this.state.startDate}
              startDate={this.state.startDate}
              onChange={this.handleChangeStart}
          />
        {/* <Label>End</Label>
        <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
        /> */}

        <a href={this.state.startPath}>
            <Button>Next</Button>
        </a>
      </div>)
  }

}

