//StudentDash.js
import React, { Component } from 'react';
import { CardColumns } from 'reactstrap';
import CardDash from './children/CardDash'; 
import StudentMenubar from './children/StudentMenubar';
import './../../css/index.css'

class StudentDashboard extends Component {
  render() {
    var origin = window.location.origin;
    let pic = {
      uri : "https://fthmb.tqn.com/7cjfKKFOXeCFABIbpMoGWM3Mw2g=/1280x853/filters:no_upscale()/goats-resized-57bb57ee3df78c8763fba0c8.jpg"
    }; 
    return ( 
      <div>
        <StudentMenubar />
        <div className="Dashboard">
          <h3>Student Dashboard! </h3> 
        </div>
        
        <CardColumns>
          <CardDash source={require("./../../img/goat1.png")} title={"MyProfile"} descr={"Edit your profile"} linkto={"/studentprofile"}/>
          <CardDash source={require("./../../img/goat2.png")} title={"Availablilty"} descr={"Review Availability"} linkto={"/availability"}/>
          <CardDash source={require("./../../img/goat3.png")} title={"Schedule"} descr={"See Current Schedule"} linkto={"/studentschedule"}/>
        </CardColumns>
      </div>
    );
  }
}

export default StudentDashboard;