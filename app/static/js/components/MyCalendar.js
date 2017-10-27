//MyCalendar.js
import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'; 
import moment from 'moment'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const myevents = [{
  title: 'First Shift',
  start:  new Date(2017, 9, 25, 7, 30),
  end: new Date(2017, 9, 25, 9),
},
{
  title: 'First Shift',
  start:  new Date(2017, 9, 25, 7, 30),
  end: new Date(2017, 9, 25, 9, 30),
},
{
  title: 'First Shift',
  start:  new Date(2017, 9, 25, 9),
  end: new Date(2017, 9, 25, 10, 30),
},
{
  title: 'First Shift',
  start:  new Date(2017, 9, 25, 10, 30),
  end: new Date(2017, 9, 25, 12, 15),
},
{
  title: 'Hidden Shift',
  start:  new Date(2017, 9, 26, 9, 15),
  end: new Date(2017, 9, 26, 11),
},
{
  title: 'Hidden Shift',
  start:  new Date(2017, 9, 26, 9, 11),
  end: new Date(2017, 9, 26, 12, 15),
},
{
  title: 'Hidden Shift',
  start:  new Date(2017, 9, 26, 12, 16),
  end: new Date(2017, 9, 26, 1, 30),
},
{
  title: 'Second Shift',
  start:  new Date(2017, 9, 26, 9),
  end: new Date(2017, 9, 26, 12),
},
{
  title: 'Second Shift',
  start:  new Date(2017, 9, 26, 9),
  end: new Date(2017, 9, 26, 12),
},
{
  title: 'Third Shift',
  start:  new Date(2017, 9, 26, 9, 15),
  end: new Date(2017, 9, 26, 11),
}]

class MyCalendar extends Component {
  constructor() {
    super(); 
    let timeRangeFormat = ({ start, end }, culture, local)=>
      local.format(start, 'h:mm', culture) +
      '-' + local.format(end,  'h:mm', culture)
    let formats = {
      dayFormat:'ddd MM/DD',
      eventTimeRangeFormat: timeRangeFormat
    }; 
    let scrollToTime = new Date().setHours(7); 
    this.state = {
      format: formats,
      scrollTime : scrollToTime
    };
  }  

  render() {
    const now = moment(); 
    return (
      <div height="100px">
        <BigCalendar
          selectable
          defaultView='week'
          popup='true'
          selectable
          events={myevents}
          style={{height: 500}}
          formats={this.state.format}
          scrollToTime={this.state.scrollTime}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}`
          )}
        />
      </div>
    )
  }
}

export default MyCalendar; 