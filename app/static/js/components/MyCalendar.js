//MyCalendar.js
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'; 
import moment from 'moment'; 

BigCalendar.momentLocalizer(moment);

class MyCalendar extends Component {
  render() {
     

    return (
      <div>
      <BigCalendar
        selectable
        events={this.props.myEvents.events}
        startAccessor='startDate'
        endAccessor='endDate'
        />
      </div>
    )
  }
}
