import { testUsers } from '../fixtures/userDetails';

describe('Setup Users and Database', () => {
  it('Reset database and add users', () => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    testUsers.forEach((user) => {
      cy.visit('/'); 
      cy.contains('Sign up').click();
      cy.get('input[placeholder="First name"]').type(user.firstName);
      cy.get('input[placeholder="Last name"]').type(user.lastName);
      cy.get('input[placeholder="Username"]').type(user.username);
      cy.get('input[placeholder="Email"]').type(user.email);
      cy.get('input[placeholder="Password"]').type(user.password);
      cy.get('input[placeholder="Confirm password"]').type(user.password);
      cy.contains('button', 'Create Account').click();
      cy.get('#menu-button').click();
      cy.contains('Log out').click();
    });
  });
});
