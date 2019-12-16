import { BASE_URL } from './constants';
import { withRouter } from 'react-router-dom';
import BuyTicket from './BuyTicket';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';

class CBuyTicket extends Component {
    state = {
      event: null,
      tickets: null,
    };

    componentDidMount = () => {
      this.getAvailableTickets();
      this.getEvent();
    };

    getEvent = () => {
      axios.get(BASE_URL + `/events/${this.props.match.params.eventId}`).then(response => {
        this.setState({ event: response.data });
      });
    };

    getAvailableTickets = () => {
      axios.get(BASE_URL + `/data/tickets/${this.props.match.params.eventId}`).then(response => {
        this.setState({ tickets: response.data });
      });
    };

    render() {
      return <BuyTicket event={this.state.event} tickets={this.state.tickets}/>;
    }
}

CBuyTicket.propTypes = {
  match: PropTypes.object,
};

export default withRouter(CBuyTicket);
