// Menubar.js
import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Switch, Route, Link } from 'react-router-dom'

export class Menubar extends Component {
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
        <NavbarBrand>NordicSHIFT</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink><Link to='/calendar'>Calendar</Link></NavLink>
            </NavItem>
            <NavItem>
                <NavLink><Link to='/dashboard'>Dashboard</Link></NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/my_profile">My Profile</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/log_out">Log Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Menubar