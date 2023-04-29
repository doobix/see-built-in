import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Built In Jobs heading', () => {
  render(<App />);
  const element = screen.getByText(/Built In Jobs/i);
  expect(element).toBeInTheDocument();
});
