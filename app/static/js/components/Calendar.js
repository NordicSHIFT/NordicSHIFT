// Calendar.js
import React, { Component } from 'react';
import axios from 'axios';
import ManagerCal from './ManagerCal'; 

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
        <ManagerCal /> 
      </div>
    );
  }
}

export default Calendar;