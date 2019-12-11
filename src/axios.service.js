import axios from 'axios';

const url = 'http://localhost:8080/itb5-culture-tickets-1.0-SNAPSHOT/rest/';

// is used to get all EventDetailViewDTOs from API
function getAllListEvents() {
  return axios.get(url + 'searchEvents?artist=""&location=""&date=""')
    .then(response => {
      response.data;
    });
}

// example: http://localhost:8080/itb5-culture-tickets-1.0-SNAPSHOT/rest/searchEvents?artist=""&location=spiel
function getSearchedListEvents(artist, location, date) {
  return axios.get(url + 'searchEvents?artist=' + artist + '&location=' + location + '&date=' + date)
    .then(response => {
      response.data;
    });
}

// is used to update an event
function updateTicket(eventId, event) {
  return axios.put(url + '/data/tickets/' + eventId, event);
}

export default { getAllListEvents, getSearchedListEvents, updateTicket };
