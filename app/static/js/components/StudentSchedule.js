// StudentSchedule.js
import React, { Component } from 'react';
import StudentCal from './children/StudentCal'; 
import StudentMenubar from './children/StudentMenubar'; 

class StudentSchedule extends Component {
  render() {
    return ( 
      <div className="Schedule">
        <StudentMenubar /> 
        <h3> Your Schedule and Availability </h3> 
        <StudentCal /> 
      </div>
    );
  }
}

export default StudentSchedule;