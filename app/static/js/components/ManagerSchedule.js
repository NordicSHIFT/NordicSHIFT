// StudentSchedule.js
import React, { Component } from 'react';
import StudentCal from './children/StudentCal'; 
import ManagerMenubar from './children/ManagerMenubar'; 
//create a different calendar for this page
class ManagerSchedule extends Component {
  render() {
    return ( 
      <div className="Schedule">
        <ManagerMenubar /> 
        <h3> This is where the currently planned schedule will go </h3> 
        <StudentCal /> 
      </div>
    );
  }
}

export default ManagerSchedule;