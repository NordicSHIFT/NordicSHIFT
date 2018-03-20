import React, { Component } from 'react';
import { Card, CardTitle, CardSubtitle, CardBody, CardText, CardImg, CardImgOverlay } from 'reactstrap';

class CardDash extends Component {
  render() { return (
    <div width={this.props.width}>
      <a href={this.props.linkto}>
      <Card inverse>
        <CardImg src={this.props.source} alt="Card image cap" />
        <CardImgOverlay>
          <CardTitle className={this.props.className}>{this.props.title}</CardTitle>
          <CardText className="text-right">
            <small className={this.props.className}>{this.props.descr}</small>
          </CardText>
        </CardImgOverlay>
      </Card>
      </a>
    </div>
  )};
};

/* when you call card, pass in imgsrc, cardTitle, and cardText */

export default CardDash;