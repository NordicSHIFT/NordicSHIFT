//SuggestCal.js
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'; 
import axios from 'axios';
import moment from 'moment';  
import 'react-big-calendar/lib/css/react-big-calendar.css'; 

import { convertEvent } from './../../util.js'; 

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
var origin = window.location.origin;

export default class SuggestCal extends Component {
  constructor(props) {
    super(props);
    
    let timeRangeFormat = ({ start, end }, culture, local)=>
    local.format(start, 'h:mm', culture) +
      '-' + local.format(end,  'h:mm', culture)
    let dayFormat = 'ddd MM/DD'; 
    let formats = {
      dayFormat:dayFormat,
      eventTimeRangeFormat: timeRangeFormat
    }; 

    let scrollToTime = new Date().setHours(7); 

    let newStart = new Date(parseInt(this.props.startDate)); 

    this.state = {
      format: formats,
      scrollTime : scrollToTime,
      events: [{}],
      startDate: newStart
    };

    this.eventStyleGetter = this.eventStyleGetter.bind(this); 
  }  

  eventStyleGetter(event) {
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
          defaultDate={this.state.startDate}
          onSelectEvent={event => alert(event.title + event.hexColor)}
          eventPropGetter={(this.eventStyleGetter)}
        />
      </div>
    )
  }
}
