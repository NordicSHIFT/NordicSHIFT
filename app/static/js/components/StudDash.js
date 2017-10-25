// Dashboard.js
import React, { Component } from 'react';
import CardDash from './CardDash'; 
//importing images, figure out how to implement image-webpack-loader
/*import goat1 from './../../img/goat1.png'
import goat2 from './../../img/goat2.png'
import goat3 from './../../img/goat3.png'*/

class StudentDashboard extends Component {
  render() {
    var origin = window.location.origin;
    let pic = {
      uri : "https://fthmb.tqn.com/7cjfKKFOXeCFABIbpMoGWM3Mw2g=/1280x853/filters:no_upscale()/goats-resized-57bb57ee3df78c8763fba0c8.jpg"
    }; 
    return ( 
      <div>
      <div className="Dashboard">
        <h3>Student Dashboard! </h3> 
      </div>
      
      <CardDash source={pic.uri}/>
      <CardDash source={pic.uri}/>
      <CardDash source={pic.uri}/>
      </div>
    );
  }
}

export default StudentDashboard;