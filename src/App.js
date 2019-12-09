import './App.css';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

function App() {
  return (
    <Container>
      <h1>Culture Tickets Web Console</h1>
      <Button>Ant Design Button</Button>
    </Container>
  );
}

export default App;
