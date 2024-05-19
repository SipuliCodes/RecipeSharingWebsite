import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SignUpForm from './SignUpForm';


test('renders SignUpForms header, input fields and create button correctly', () => {
  render(<SignUpForm />);

  screen.getByText('Sign Up');

  screen.getAllByPlaceholderText('First name');
  screen.getAllByPlaceholderText('Last name');
  screen.findAllByPlaceholderText('Username');
  screen.getAllByPlaceholderText('Email');
  screen.getAllByPlaceholderText('Password');
  screen.findAllByPlaceholderText('Confirm password');

  screen.getByRole('button', { name: 'Create User' });
});