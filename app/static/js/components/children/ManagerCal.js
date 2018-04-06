//ManagerCal.js
import axios from 'axios';
import moment from 'moment'; 
import HTML5Backend from 'react-dnd-html5-backend'; 

import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'; 
import { DragDropContext } from 'react-dnd'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import { convertEvent } from './../../util.js'; 

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
var origin = window.location.origin;

const DragAndDropCalendar = withDragAndDrop(BigCalendar);


class ManagerCal extends Component {
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

    this.retrieveEvents = this.retrieveEvents.bind(this);
    this.addEvent = this.addEvent.bind(this); 
    this.eventStyleGetter = this.eventStyleGetter.bind(this); 
    this.moveEvent = this.moveEvent.bind(this); 
    this.retrieveEvents(); 
  }  


  retrieveEvents() { 
    axios.get('/api/calendar')
    .then(res => {
      var jsevents = res.data.events.map(
                        event => convertEvent(event)); 
      var newevents = this.state.events.concat(jsevents); 
      this.setState({ events: newevents }); 
    })
    .catch(function (error) {
      console.log(error);
    });  
  }

  addEvent(slotInfo) { 
      //TODO: add check if it is in correct date range
    if (slotInfo.action == 'select') { 
      const theEvent = this.props.formCalInt(slotInfo);   
    }
  }

  eventStyleGetter(event) {
    var backgroundColor = event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
  }

  moveEvent({ event, start, end }) {
    //TODO: add check if it is dropped on a valid day
    var config = { headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'}
    }
    this.props.removeToDelete(); 
    axios.post('/api/moveEvent', {
      myEvent: event,
      oldStart: event.start, 
      oldEnd: event.end,
      newStart: start,
      newEnd: end
    }, config) 
    .then( (response) => {
      //alert('event posted to db'); 
    })
    .catch(function (error) {
      console.log(error);
    }); 

    const theEvents = this.state.events;
    const idx = theEvents.indexOf(event); 
    event.start = start; 
    event.end = end; 
    theEvents.splice(idx, 1, event); 

    this.setState({
      events: theEvents
    })
    //alert(`${event.title} was dropped onto ${event.start}`);
  }

  render() {
    const now = moment(); 
    return (
      <div height="100px">
        <DragAndDropCalendar
          selectable
          defaultView='week'
          popup='true'
          step = {15}
          timeslots = {4}
          toolbar={false}
          style={{height: 500}}
          events={this.state.events}
          formats={this.state.format}
          scrollToTime={this.state.scrollTime}
          onSelectEvent={event => this.props.showDeleteForm(event)}
          onSelectSlot={(slotInfo) => this.addEvent(slotInfo)}
          defaultDate={this.state.startDate}
          eventPropGetter={(this.eventStyleGetter)}
          onEventDrop={this.moveEvent}
        />
      </div>
    )
  }
}


export default ManagerCal; 