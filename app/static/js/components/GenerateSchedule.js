//GenerateSchedule.js
import axios from 'axios';
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
    this.generateSchedule = this.generateSchedule.bind(this);
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



  generateSchedule() {
    var config = { headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
    }

    axios.get(origin + '/api/generateSchedule', config)
    .then( (response) => {
      alert('response made it back');
      // console.log("response.data.items: ",response.data.items);
      // this.setState({schedule: String(response.data.items)});
      console.log("schedules:", response.data);
    })
    .catch(function (error) {
      console.log(error);
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
        <Form>
        <FormGroup>
          <Col>
            <Button onClick={this.generateSchedule}>Create Schedule!</Button>
          </Col>
        </FormGroup>

        </Form>
        <p>{this.state.schedule}</p>
      </div>)
  }

}

export default GenerateSchedule;
