import { Button, DatePicker, Input, Table } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

const CustomInput = styled(Input)`
  width: 150px;
  margin-right: 20px;
`;

const CustomButton = styled(Button)`
  margin-left: 20px;
`;

const CustomTable = styled(Table)`
  margin-top: 20px;
`;

class ListEvents extends Component {
  state = {
    eventName: '',
    artist: '',
    location: '',
    date: null,
  };

  onDatePickerChange = date => {
    this.setState({ date });
  };

  onInputValueChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  search = () => {
    const { eventName, artist, location, date } = this.state;
    this.props.searchForEvents(eventName, artist, location, date);
  };

  render() {
    const columns = [
      {
        title: 'Event Name',
        key: 'eventId',
        render: event => <Link to={`/events/${event.eventId}`}>{event.eventName}</Link>,
      },
      {
        title: 'Artists',
        dataIndex: 'artists',
        key: 'artists',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Price',
        dataIndex: 'minPrice',
        key: 'minPrice',
      },
    ];
    return (
      <React.Fragment>
        <CustomInput
          name="eventName"
          onChange={this.onInputValueChanged}
          placeholder="Event Name"
          value={this.state.eventName}
        />
        <CustomInput
          name="artist"
          onChange={this.onInputValueChanged}
          placeholder="Artist"
          value={this.state.artist}
        />
        <CustomInput
          name="location"
          onChange={this.onInputValueChanged}
          placeholder="Location"
          value={this.state.location}
        />
        <DatePicker disabledTime={false} onChange={this.onDatePickerChange} value={this.state.date}/>
        <CustomButton onClick={this.search}>Search</CustomButton>
        <CustomTable
          columns={columns}
          dataSource={this.props.events}
          loading={this.props.events === null}
          pagination={false}
          rowKey="eventId"
        />
      </React.Fragment>
    );
  }
}

ListEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  searchForEvents: PropTypes.func.isRequired,
};

export default ListEvents;
