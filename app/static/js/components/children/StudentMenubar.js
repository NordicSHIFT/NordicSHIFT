// StudentMenubar.js
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Switch, Route, Link } from 'react-router-dom'

export class StudentMenubar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        isOpen: false
    };
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand> <Link to="/studentdashboard" style={{ textDecoration: 'none', color:'black'}}>NordicSHIFT</Link></NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/studentdashboard">Dashboard</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/studentschedule">Schedule</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/availability">Availability</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/studentprofile">My Profile</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/logout">Log Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default StudentMenubar