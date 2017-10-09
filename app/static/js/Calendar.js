// Calendar.js
import React, { Component } from 'react';
import { Menubar } from './components/Menubar';
import { Jumbotron, Button } from 'reactstrap';

class Calendar extends Component {
  render() {
    return (
      <div className="Calendar">
        <Menubar/>


        <iframe src="https://calendar.google.com/calendar/embed?src=nguyli03%40luther.edu&ctz=America/Chicago" width="800" height="600" frameborder="0" scrolling="no"></iframe> 

      </div>
    );
  }
}

export default Calendar;