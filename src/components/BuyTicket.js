import { Card, Checkbox, Col, Row, Spin } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const Bold = styled.span`
  font-weight: 900;
`;

class BuyTicket extends Component {
  state = {
    selectedPlaces: {},
  };

  selectPlace = event => {
    const tmpSelectedPlaces = this.state.selectedPlaces;
    if (event.target.checked) {
      tmpSelectedPlaces[event.target.data.placeCategoryId + '_' + event.target.data.placeId] = event.target.data;
    } else {
      tmpSelectedPlaces[event.target.data.placeCategoryId + '_' + event.target.data.placeId] = null;
    }
    this.setState({ selectedPlaces: tmpSelectedPlaces });
  };

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
              {
                event.placeCategories.map((placeCategory, index) => {
                  return (
                    <div key={index}>
                      <Bold>{placeCategory}</Bold> {event.prices[index]} €
                      <br/><br/>
                      {
                        Array.from(Array(event.placeCategoriesAmount[index])).map((x, i) => {
                          let sold = false;
                          tickets.forEach(ticket => {
                            if (ticket.categoryId === event.placeCategoriesId[index] && ticket.id === i + 1) {
                              sold = true;
                            }
                          });
                          return (
                            <Checkbox
                              data={{ placeId: i + 1, placeCategoryId: event.placeCategoriesId[index] }}
                              disabled={sold}
                              key={i}
                              onChange={this.selectPlace}
                            >
                              {i + 1}
                            </Checkbox>
                          );
                        })
                      }
                      <br/><br/>
                    </div>
                  );
                })
              }
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
