import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import CListEvents from './components/CListEvents';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

function App() {
  return (
    <Container>
      <h1>Culture Tickets Web Console</h1>
      <Router>
        <Switch>
          <Route path="/">
            <CListEvents/>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
