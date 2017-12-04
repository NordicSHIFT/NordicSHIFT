//GenerateSchedule.js
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import ManagerMenubar from './children/ManagerMenubar';

import 'react-datepicker/dist/react-datepicker.css';

var origin = window.location.origin;

class GenerateSchedule extends Component {
  constructor() {
    super();
    this.state = {
      startDate: moment(),
      endDate: moment(),

    }
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
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
        <h3>Would you like to generate the schedule?</h3>
        <a href="suggestedSchedules">
            <Button>See suggested schedules.</Button>
        </a>
        <p>{this.state.schedule}</p>
      </div>)
  }

}

export default GenerateSchedule;
