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
          <CardDash source={require("./../../img/schedulesquare.jpg")} title={"Schedule"} descr={"See Current Schedule"} 
          className={"text-right text-dark"} linkto={"/managerschedule"} width="30%"/>
          <CardDash source={require("./../../img/profilesquareflip.jpg")} title={"MyProfile"} descr={"Edit your profile"}
          className={"text-right text-outline"} linkto={"/managerprofile"} width="30%"/>
          <CardDash source={require("./../../img/planningsquare.jpg")} title={"Shift Planner"}
          className={"text-right text-dark text-outline"} descr={"Add and Remove desired Shifts"} linkto={"/selectweek"} width="30%"/>
        </CardColumns>
      </div>
    );
  }
}

export default ManagerDashboard;
