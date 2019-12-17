import { BASE_URL } from './constants';
import ListEvents from './ListEvents';
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class CListEvents extends Component {
  state = {
    events: null,
  };

  componentDidMount = () => {
    this.getAllEvents();
  };

  getAllEvents = () => {
    axios.get(BASE_URL + '/events').then(response => {
      this.setState({ events: response.data });
    });
  };

  searchForEvents = (eventName, artist, location, date) => {
    this.setState({ events: null });
    let url = `/events?eventName=${eventName}&artist=${artist}&location=${location}`;
    if (date) {
      url = url + `&y=${moment(date).format('YYYY')}&m=${moment(date).format('MM')}&d=${moment(date).format('DD')}`;
    }
    axios.get(BASE_URL + url).then(response => {
      this.setState({ events: response.data });
    });
  };

  render() {
    return <ListEvents events={this.state.events} searchForEvents={this.searchForEvents}/>;
  }
}

export default CListEvents;
