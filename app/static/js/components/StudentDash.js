//StudentDash.js
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import CardDash from './children/CardDash'; 
import StudentMenubar from './children/StudentMenubar';
import './../../css/index.css'

class StudentDashboard extends Component {
  render() {
    return ( 
      <div>
        <StudentMenubar />
        {/* <div className="Dashboard">
          <h3>Student Dashboard! </h3> 
        </div> */}
        
        <Row>
        <Col sm="6">
            <CardDash source={require("./../../img/profile3to2.jpg")} title={"MyProfile"} descr={"Edit your profile"} 
            className={"text-right text-outline"} linkto={"/studentprofile"} width="50%"/>
            {/* <CardDash source={require("./../../img/goat2.png")} title={"Availablilty"} descr={"Review Availability"} linkto={"/availability"}/> */}
        </Col>  
        <Col>  
            <CardDash source={require("./../../img/schedule3to2.jpg")} title={"Schedule and Availability"} descr={"See Current Schedule"}
            className={"text-right text-dark text-outline"} linkto={"/studentschedule"} width="50%"/>
        </Col>
        </Row> 
      </div>
    );
  }
}

export default StudentDashboard;