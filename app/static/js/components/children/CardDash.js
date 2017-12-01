import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';

class CardDash extends Component {
  render() { return (
    <div width={this.props.width}>
      <a href={this.props.linkto}>
      <Card inverse>
        <CardImg src={this.props.source} alt="Card image cap" />
        <CardImgOverlay>
          <CardTitle className="text-outline">{this.props.title}</CardTitle>
          <CardText>
            <small className="text-muted text-outline">{this.props.descr}</small>
          </CardText>
        </CardImgOverlay>
      </Card>
      </a>
    </div>
  )};
};

/* when you call card, pass in imgsrc, cardTitle, and cardText */

export default CardDash;