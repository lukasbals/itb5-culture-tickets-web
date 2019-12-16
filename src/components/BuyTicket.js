import { Card, Col, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const Bold = styled.span`
  font-weight: 900;
`;

class BuyTicket extends Component {
  render() {
    const { tickets, event } = this.props;
    if (tickets && event) {
      return (
        <Row gutter={20}>
          <Col span={12}>
            <Card title="Event details">
              <p>Name: <Bold>{event.eventName}</Bold></p>
              <p>Category: <Bold>{event.category}</Bold></p>
              <p>Location: <Bold>{event.location}</Bold></p>
              <p>Date: <Bold>{event.date}</Bold></p>
              <p>Description: <Bold>{event.description}</Bold></p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Select places">
              To be done
            </Card>
          </Col>
        </Row>
      );
    }
    return <Spin/>;
  }
}

BuyTicket.propTypes = {
  event: PropTypes.object,
  tickets: PropTypes.array,
};

export default BuyTicket;
