// Schedule.js
import React, { Component } from 'react';
import StudentCal from './StudentCal'; 

class Schedule extends Component {
  render() {
    return ( 
      <div className="Schedule">
        <h3> Schedule! </h3> 
        <StudentCal /> 
      </div>
    );
  }
}

export default Schedule;