import { Button, Card, Checkbox, Col, Form, Input, Row, Spin, message } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const Bold = styled.span`
  font-weight: 900;
`;

const CustomCard = styled(Card)`
  margin-bottom: 20px;
`;

const help = {
  name: 'Please insert your name',
  address: 'Please insert your address',
  zipCity: 'Please insert your ZIP and city',
  creditCard: 'Please insert a valid credit card number',
};

const initialState = {
  name: '',
  address: '',
  zipCity: '',
  creditCard: '',
  selectedPlaces: {},
  validInputs: false,
  validation: {},
};

class BuyTicket extends Component {
  state = initialState;

  handleSubmit = () => {
    this.validate(valid => {
      console.log(valid);
    });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validate = callback => {
    setTimeout(() => {
      const tmpValidation = this.state.validation;
      tmpValidation.name = this.state.name !== '';
      tmpValidation.address = this.state.address !== '';
      tmpValidation.zipCity = this.state.zipCity !== '';
      tmpValidation.creditCard = this.state.creditCard !== '' && /^\d{16}$/.test(this.state.creditCard);
      this.setState({ validation: tmpValidation });
      const placesSelected = Object.keys(this.state.selectedPlaces).length > 0;
      if (!placesSelected) {
        message.error('Please select your places');
      }
      callback(
        tmpValidation.name &&
          tmpValidation.address &&
          tmpValidation.zipCity &&
          tmpValidation.creditCard &&
          placesSelected
      );
    }, 100);
  };

  selectPlace = event => {
    const tmpSelectedPlaces = this.state.selectedPlaces;
    if (event.target.checked) {
      tmpSelectedPlaces[event.target.data.placeCategoryId + '_' + event.target.data.placeId] = event.target.data;
    } else {
      delete tmpSelectedPlaces[event.target.data.placeCategoryId + '_' + event.target.data.placeId];
    }
    this.setState({ selectedPlaces: tmpSelectedPlaces });
  };

  render() {
    const { tickets, event } = this.props;
    const { validation } = this.state;
    if (tickets && event) {
      return (
        <React.Fragment>
          <Row gutter={20}>
            <Col md={12}>
              <CustomCard title="Event details">
                <p>Name: <Bold>{event.eventName}</Bold></p>
                <p>Category: <Bold>{event.category}</Bold></p>
                <p>Location: <Bold>{event.location}</Bold></p>
                <p>Date: <Bold>{event.date}</Bold></p>
                <p>Description: <Bold>{event.description}</Bold></p>
              </CustomCard>
              <CustomCard title="Contact information">
                <Form.Item
                  hasFeedback help={validation.name === false ? help.name : ''}
                  validateStatus={validation.name === false ? 'error' : ''}
                >
                  <Input
                    addonBefore="Name"
                    name="name"
                    onChange={this.handleInput}
                    placeholder="Michael Smith"
                    value={this.state.name}
                  />
                </Form.Item>
                <Form.Item
                  hasFeedback help={validation.address === false ? help.address : ''}
                  validateStatus={validation.address === false ? 'error' : ''}
                >
                  <Input addonBefore="Address" name="address" onChange={this.handleInput} placeholder="Mainstreet 1"/>
                </Form.Item>
                <Form.Item
                  hasFeedback help={validation.zipCity === false ? help.zipCity : ''}
                  validateStatus={validation.zipCity === false ? 'error' : ''}
                >
                  <Input
                    addonBefore="ZIP / City"
                    name="zipCity"
                    onChange={this.handleInput}
                    placeholder="1234 New York"
                  />
                </Form.Item>
                <Form.Item
                  hasFeedback help={validation.creditCard === false ? help.creditCard : ''}
                  validateStatus={validation.creditCard === false ? 'error' : ''}
                >
                  <Input
                    addonBefore="Credit number"
                    name="creditCard"
                    onChange={this.handleInput}
                    placeholder="16 digits number"
                  />
                </Form.Item>
              </CustomCard>
            </Col>
            <Col md={12}>
              <CustomCard title="Select places">
                {
                  event.placeCategories.map((placeCategory, index) => {
                    return (
                      <div key={index}>
                        <Bold>{placeCategory}</Bold> {event.prices[index]} €<br/><br/>
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
              </CustomCard>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button onClick={this.cancle} style={{ marginRight: 20 }}>Cancel</Button>
              <Button onClick={this.handleSubmit} type="primary">Buy Tickets</Button>
            </Col>
          </Row>
        </React.Fragment>
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
