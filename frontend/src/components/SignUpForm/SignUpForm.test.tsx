import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SignUpForm from './SignUpForm';


test('renders SignUpForms header, input fields and create button correctly', () => {
  render(<SignUpForm />);

  expect(screen.getByText('Sign Up'));

  expect(screen.getAllByPlaceholderText('First name'));
  expect(screen.getAllByPlaceholderText('Last name'));
  expect(screen.findAllByPlaceholderText('Username'));
  expect(screen.getAllByPlaceholderText('Email'));
  expect(screen.getAllByPlaceholderText('Password'));
  expect(screen.findAllByPlaceholderText('Confirm password'));

  expect(screen.getByRole('button', { name: 'Create' }));
});