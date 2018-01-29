// ManagerDash.js
import React, { Component } from 'react';
import { CardColumns } from 'reactstrap';
import CardDash from './children/CardDash'; 
import ManagerMenubar from './children/ManagerMenubar';
import './../../css/index.css'

class ManagerDashboard extends Component {
  render() {
    return ( 
      <div>
        <ManagerMenubar />
        {/* <div className="Dashboard">
          <h3>Your Manager Dashboard</h3> 
        </div> */}
        
        <CardColumns>
          <CardDash source={require("./../../img/profile.jpg")} title={"MyProfile"} descr={"Edit your profile"} linkto={"/managerprofile"} width="30%"/>
          <CardDash source={require("./../../img/schedule.jpg")} title={"Schedule"} descr={"See Current Schedule"} linkto={"/managerschedule"} width="30%"/>
          <CardDash source={require("./../../img/planning.jpg")} title={"Shift Planner"} descr={"Add and Remove desired Shifts"} linkto={"/selectweek"} width="30%"/>
        </CardColumns>
      </div>
    );
  }
}

export default ManagerDashboard;
