//SuggestList.js
import React, { Component } from 'react';
import {Label, Input, Col, Row} from 'reactstrap'; 

export default class SuggestList extends Component {
    constructor(props) {
        super(props); 

        this.handleScheduleChange = this.handleScheduleChange.bind(this); 
        this.state={
            selectedSchedule: "1"
        }
    }

    handleScheduleChange(event) {
        this.setState({
          selectedSchedule: event.target.value
        });
        this.props.changeSchedule(event.target.value); 
    }

    render() {
        return(
            <div>
                <h3>Schedule Options</h3> 
                <Col>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="1"
                  checked={this.state.selectedSchedule === "1"}
                  onChange={this.handleScheduleChange}
                  />
                  1
                </Label></Row>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="2"
                  checked={this.state.selectedSchedule === "2"}
                  onChange={this.handleScheduleChange}
                  />
                  2
                </Label></Row>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="3"
                  checked={this.state.selectedSchedule === "3"}
                  onChange={this.handleScheduleChange}
                  />
                  3
                </Label></Row>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="4"
                  checked={this.state.selectedSchedule === "4"}
                  onChange={this.handleScheduleChange}
                  />
                  4
                </Label></Row>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="5"
                  checked={this.state.selectedSchedule === "5"}
                  onChange={this.handleScheduleChange}
                  />
                  5
                </Label></Row>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="6"
                  checked={this.state.selectedSchedule === "6"}
                  onChange={this.handleScheduleChange}
                  />
                  6
                </Label></Row>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="7"
                  checked={this.state.selectedSchedule === "7"}
                  onChange={this.handleScheduleChange}
                  />
                  7
                </Label></Row>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="8"
                  checked={this.state.selectedSchedule === "8"}
                  onChange={this.handleScheduleChange}
                  />
                  8
                </Label></Row>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="9"
                  checked={this.state.selectedSchedule === "9"}
                  onChange={this.handleScheduleChange}
                  />
                  9
                </Label></Row>
                <Row><Label check>
                  <Input type="radio" name="radio1" value="10"
                  checked={this.state.selectedSchedule === "10"}
                  onChange={this.handleScheduleChange}
                  />
                  10
                </Label></Row>
                </Col> 
            </div>
        )
    }
}
