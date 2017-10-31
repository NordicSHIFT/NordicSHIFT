// ShiftForm.js
import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';

class ShiftForm extends Component {

  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
        <InputGroup>
          <InputGroupAddon>Title</InputGroupAddon>
          <Input placeholder="Shift" /> 
        </InputGroup>
        </ListGroupItem>
        <ListGroupItem>
        <InputGroup>
          <InputGroupAddon>Start</InputGroupAddon>
          <Input />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>End</InputGroupAddon>
          <Input />
        </InputGroup>
        </ListGroupItem>
        </ListGroup>
      </div>) 
  }
}

export default ShiftForm; 