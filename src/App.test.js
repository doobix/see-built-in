import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders Built In Jobs heading', () => {
render(
    <Router>
      <App />
    </Router>
  );
  const element = screen.getByText(/0 frontend jobs/i);
  expect(element).toBeInTheDocument();
});
