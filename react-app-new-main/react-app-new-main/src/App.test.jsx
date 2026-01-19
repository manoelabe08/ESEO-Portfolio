import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders counter and increments on button click', async () => {
  render(<App />);
  const button = screen.getByText(/incrémenter/i);
  expect(screen.getByText(/compteur : 0/i)).toBeInTheDocument();
  fireEvent.click(button);
  expect(screen.getByText(/compteur : 1/i)).toBeInTheDocument();
});
