// Calendar.js
import React, { Component } from 'react';
import axios from 'axios';
import MyCalendar from './MyCalendar'; 

var origin = window.location.origin;

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      res: []
    };
  }

  componentDidMount() {
    var url =  origin + '/api/calendar'
    axios.get(url)
    .then(res => {
      const results = res.data.calData
      this.setState({ results });
    });
      
  }  

  render() {
    var myEventsList = {
      events: [
          {
              title: 'Event1',
              start: '2017-04-04'
          },
          {
              title: 'Event2',
              start: '2017-05-05'
          }
          // etc...
      ],
      color: 'yellow',   // an option!
      textColor: 'black' // an option!
    };

    return ( 
      <div className="Calendar">
        <h3> Your calendar! </h3> 
        <h1></h1>
        <ul>
            <li key={this.state.results}>{this.state.results}</li>
        </ul>
        <MyCalendar myEvents={myEventsList}/>
      </div>
    );
  }
}

export default Calendar;