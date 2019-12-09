import { render } from '@testing-library/react';
import App from './App';
import React from 'react';

test('App should render correctly', () => {
  const { baseElement } = render(<App/>);
  expect(baseElement).toMatchSnapshot();
});
