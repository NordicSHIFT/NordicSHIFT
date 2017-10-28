//MyCalendar.js
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

function postEventHelper (eventInfo) {
  var eventResponse = postEvent(eventInfo); 
  console.log("eventResponse", eventResponse); 
  // return axios.all([postEvent(eventInfo)])
  // .then(function(arr){
  //   console.log("ARRG", arr); 
  //   return {
  //     title: arr[0].data.eventTitle,
  //   }
  // })

  
}

class MyCalendar extends Component {
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

    this.retrieveEvents();  
    this.state = {
      format: formats,
      scrollTime : scrollToTime,
      events: [{}]
    };

    this.retrieveEvents = this.retrieveEvents.bind(this);
    this.addEvent = this.addEvent.bind(this); 
    this.eventStyleGetter = this.eventStyleGetter.bind(this); 
  }  

  retrieveEvents() {
    console.log("Before Axios call"); 
    var url =  origin + '/api/calendar';  
    axios.get(url)
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
    // alert(
    //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
    //   `\nend: ${slotInfo.end.toLocaleString()}` + ` ${slotInfo.action} `
    // );  
    if (slotInfo.action == 'select') { 
      var config = { headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}
      }
      var respData = axios.post('/api/addEvent', {
        myEvent: slotInfo
      }, config) 
      .then( (response) => {
        const responseData = response.data 
        console.log(responseData); 
        const theEvent = {
          title: responseData.title,
          hexColor: responseData.hexColor, 
          start: new Date(responseData.start),
          end: new Date(responseData.end),
        }; 
        var theevents = this.state.events.concat([theEvent]);
        this.setState({events: theevents}); 
      })
      .catch(function (error) {
        console.log(error);
      });
      
      //TODO add interaction with backend, to save event to the db  
      //TODO possibly a pop-up form to enter in other details of shift 
      //TODO ask if you want to create the shift or not  
    }
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
          selectable
          defaultView='week'
          popup='true'
          events={this.state.events}
          style={{height: 500}}
          formats={this.state.format}
          scrollToTime={this.state.scrollTime}
          onSelectEvent={event => alert(event.title + event.hexColor)}
          onSelectSlot={(slotInfo) => this.addEvent(slotInfo)}
          eventPropGetter={(this.eventStyleGetter)}
        />
        <p>{this.state.results}</p>
      </div>
    )
  }
}

export default MyCalendar; 