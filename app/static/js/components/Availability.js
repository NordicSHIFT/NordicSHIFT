// Availability.js
import React, { Component } from 'react';
import StudentMenubar from './children/StudentMenubar'

class Availability extends Component {
  render() {
    return ( 
      <div className="Availability">
        <StudentMenubar />
        <h3> Availability! (for students)</h3> 
      </div>
    );
  }
}

export default Availability;