import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

const mockSetLeftContent = jest.fn();

jest.mock('../../../constants', () => ({
  apiUrl: 'http://localhost:3003/api',
}));

test('renders Loginforms header, input fields and login button correclty', () => {
  render(<LoginForm setLeftContent={mockSetLeftContent} />);

  screen.getByRole('heading', {name: 'Login'});

  screen.getByPlaceholderText('Username or email');
  screen.getByPlaceholderText('Password');

  screen.getByRole('button', { name: 'Login' });
});