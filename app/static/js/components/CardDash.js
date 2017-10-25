import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

class CardDash extends Component {
  render() { return (
    <div width="30%">
      <Card inverse>
        <CardImg width="30%" src={this.props.source} alt="Card image cap" />
        <CardImgOverlay>
          <CardTitle>Card Title</CardTitle>
          <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
          <CardText>
            <small className="text-muted">Last updated 3 mins ago</small>
          </CardText>
        </CardImgOverlay>
      </Card>
    </div>
  )};
};

/* when you call card, pass in imgsrc, cardTitle, and cardText */

export default CardDash;