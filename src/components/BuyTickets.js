import React, {Component} from 'react';


class BuyTickets extends Component {
    state = {
        selectedEvent: this.props.selectedEvent
    };

    handleSubmit() {

    }

    render() {
        console.log(this.state);
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Eventname:
                    <label> {this.state.selectedEvent[0].eventName}</label>
                </label>
                <br/>
                <label>
                    Artist:
                    <label> {this.state.selectedEvent[0].artists}</label>
                </label>
                <br/>
                <label>
                    Description:
                    <label> {this.state.selectedEvent[0].description}</label>
                </label>
                <br/>
                <label>
                    Category:
                    <label> {this.state.selectedEvent[0].category}</label>
                </label>
                <br/>
                <label>
                    Date:
                    <label> {this.state.selectedEvent[0].date}</label>
                </label>
                <br/>
                <label>
                    Location:
                    <label> {this.state.selectedEvent[0].location}</label>
                </label>
                <br/>
                <label>
                     Minimum Price:
                    <label> {this.state.selectedEvent[0].minPrice}</label>
                </label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        );

    }
}


export default BuyTickets;

