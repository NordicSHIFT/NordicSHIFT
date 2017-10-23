// Calendar.js
import React, { Component } from 'react';
import axios from 'axios';

var origin = window.location.origin;

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      res: []
    };
  }

  componentDidMount() {
    var url =  origin + '/calendar2'
    axios.get(url)
    .then(res => {
      const results = res.data.calData
      this.setState({ results });
    });
  }  

  render() {

    return ( 
      <div className="Calendar">
        <h3> Your calendar! </h3> 
        <h1></h1>
        <ul>
            <li key={this.state.results}>{this.state.results}</li>
        </ul>
      </div>
    );
  }
}

export default Calendar;