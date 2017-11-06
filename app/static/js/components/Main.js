import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import ManagerPlanner from './ManagerPlanner'
import StudentDashboard from './StudentDash'
import ManagerDashboard from './ManagerDash'
import Availability from './Availability'
import ManagerProfile from './ManagerProfile'
import StudentProfile from './StudentProfile'
import StudentSchedule from './StudentSchedule'
import ManagerSchedule from './ManagerSchedule'
import Login from './Login'
import Signup from './Signup'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/planner' component={ManagerPlanner}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/studentdashboard' component={StudentDashboard}/>
      <Route path='/managerdashboard' component={ManagerDashboard}/>
      <Route path='/availability' component={Availability}/>
      <Route path='/myprofile' component={ManagerProfile}/>
      <Route path='/studentschedule' component={StudentSchedule}/>
      <Route path='/managerschedule' component={ManagerSchedule}/>
      <Route path='/studentprofile' component={StudentProfile}/>
    </Switch>
  </main>
)

export default Main
