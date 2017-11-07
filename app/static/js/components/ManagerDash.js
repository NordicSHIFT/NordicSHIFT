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
        <div className="Dashboard">
          <h3>Your Manager Dashboard</h3> 
        </div>
        
        <CardColumns>
          <CardDash source={require("./../../img/goat1.png")} title={"MyProfile"} descr={"Edit your profile"} linkto={"/managerprofile"}/>
          <CardDash source={require("./../../img/goat2.png")} title={"Schedule"} descr={"See Current Schedule"} linkto={"/managerschedule"}/>
          <CardDash source={require("./../../img/goat3.png")} title={"Shift Planner"} descr={"Add and Remove desired Shifts"} linkto={"/planner"}/>
        </CardColumns>
      </div>
    );
  }
}

export default ManagerDashboard;