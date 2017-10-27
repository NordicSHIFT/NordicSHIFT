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
    // var url =  origin + '/api/calendar'
    // axios.get(url)
    // .then(res => {
    //   const results = res.data.calData
    //   this.setState({ results });
    // });
      
  }  

  render() {

    return ( 
      <div className="Calendar">
        <MyCalendar /> 
      </div>
    );
  }
}

export default Calendar;