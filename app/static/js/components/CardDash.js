import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

class CardDash extends Component {
  render() { return (
    <div width="30%">
      <a href={this.props.linkto}>
      <Card inverse>
        <CardImg width="30%" src={this.props.source} alt="Card image cap" />
        <CardImgOverlay>
          <CardTitle>{this.props.title}</CardTitle>
          <CardText>
            <small className="text-muted">{this.props.descr}</small>
          </CardText>
        </CardImgOverlay>
      </Card>
      </a>
    </div>
  )};
};

/* when you call card, pass in imgsrc, cardTitle, and cardText */

export default CardDash;