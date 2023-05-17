import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders loading skeleton', () => {
  const { container } = render(
    <Router>
      <App />
    </Router>
  );
  const element = container.getElementsByClassName('MuiSkeleton-root');
  expect(element.length).toBe(40);
});
