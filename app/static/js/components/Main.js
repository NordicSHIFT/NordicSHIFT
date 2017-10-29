import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Calendar from './Calendar'
import Dashboard from './Dashboard'
import StudentDashboard from './StudDash'
import Availability from './Availability'
import MyProfile from './MyProfile'
import Schedule from './Schedule'
import Login from './Login'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/calendar' component={Calendar}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/login' component={Login}/>
      <Route path='/studentdashboard' component={StudentDashboard}/>
      <Route path='/availability' component={Availability}/>
      <Route path='/myprofile' component={MyProfile}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)

export default Main
