import React, {Component} from 'react';
import PropTypes from "prop-types";


class BuyTickets extends Component {
    state = {
        eventName: '',
        artist: '',
        location: '',
        date: null,
        disabled : true
    };

    handleSubmit() {

    }

    render() {
        console.log(this.state);
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Eventname:
                    <label>{this.state.eventName}</label>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );

    }
}

BuyTickets.propTypes = {
    selectedEvent: PropTypes.arrayOf(PropTypes.object),
};


export default BuyTickets;

