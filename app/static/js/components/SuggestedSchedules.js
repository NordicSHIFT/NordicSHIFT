// SuggestedSchedules.js
import React, { Component } from 'react';
import ManagerMenubar from './children/ManagerMenubar';

class SuggestedSchedules extends Component {

  constructor() {
    super();
    this.state = {
      assignedShift: [],
      unassignedShift: [],

    }
    this.generateSchedule = this.generateSchedule.bind(this);
    this.setStateAssignedShift = this.setStateAssignedShift.bind(this);
    this.setStateUnassignedShift = this.setStateUnassignedShift.bind(this);
  }

  setStateAssignedShift(shifts){
    this.setState({"assignedShift":shifts})
  }

  setStateUnassignedShift(shifts){
    this.setState({"unassignedShift":shifts})
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
      this.setStateAssignedShift(response.data[0]['assigned shifts']);
      this.setStateUnassignedShift(response.data[0]['unassigned shifts'])

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="suggestedSchedules">
        <ManagerMenubar />
        <h3> Suggested Schedules </h3>

      </div>
    );
  }
}

export default SuggestedSchedules;
