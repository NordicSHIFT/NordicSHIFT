// ManagerViewAvailability.js
import moment from 'moment';
import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'reactstrap'; 
import ManagerMenubar from './children/ManagerMenubar';


import * as util from './../util.js'; 

var origin = window.location.origin;

//create a different calendar for this page
export default class ManagerViewAvailability extends Component {

  constructor(props) {
    super(props);
    var username = "";
    var name = ""; 
    var calendarurl = "<%= asset_url('https://calendar.google.com/calendar/embed?showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=gadeta01%40luther.edu&amp;color=%231B887A&amp;ctz=America%2FChicago') %>";
    if (this.props.match.params.username) {
        username = this.props.match.params.username; 
    }
    if (this.props.match.params.name) {
        name = this.props.match.params.name; 
    }
    this.state = {
        username: username,
        name: name,
        calendarurl: calendarurl
    }
    console.log(this); 
  }


  render() {
    return ( 
      <div className="Schedule" ref="Schedule">
        <ManagerMenubar /> 
        <h3> Availability of {this.state.name} </h3> 
        <iframe src="https://calendar.google.com/calendar/embed?showPrint=0&amp;showTabs=0&amp;showTz=0&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=gadeta01%40luther.edu&amp;color=%231B887A&amp;ctz=America%2FChicago" width="800" height="600" frameborder="0" scrolling="no"></iframe>
      </div>
    );
  }
}
