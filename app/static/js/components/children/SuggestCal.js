//SuggestCal.js
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'; 
import axios from 'axios';
import moment from 'moment';  
import 'react-big-calendar/lib/css/react-big-calendar.css'; 

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
var origin = window.location.origin;

function convertEvent(event) {
  return {
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
    hexColor: event.hexColor
  }
}

class SuggestCal extends Component {
  constructor() {
    super();
    
    let timeRangeFormat = ({ start, end }, culture, local)=>
    local.format(start, 'h:mm', culture) +
      '-' + local.format(end,  'h:mm', culture)
    let dayFormat = 'ddd MM/DD'; 
    let formats = {
      dayFormat:dayFormat,
      eventTimeRangeFormat: timeRangeFormat
    }; 

    let scrollToTime = new Date().setHours(7); 

    this.state = {
      format: formats,
      scrollTime : scrollToTime,
      events: [{}]
    };

    this.eventStyleGetter = this.eventStyleGetter.bind(this); 
  }  

  eventStyleGetter(event) {
    console.log(event);
    var backgroundColor = event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
  }

  render() {
    const now = moment(); 
    return (
      <div height="100px">
        <BigCalendar
          defaultView='week'
          popup='true'
          events={this.state.events}
          style={{height: 500}}
          formats={this.state.format}
          scrollToTime={this.state.scrollTime}
          onSelectEvent={event => alert(event.title + event.hexColor)}
          eventPropGetter={(this.eventStyleGetter)}
        />
      </div>
    )
  }
}

export default SuggestCal; 