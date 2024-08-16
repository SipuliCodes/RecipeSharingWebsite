import { testUsers } from '../fixtures/userDetails';

describe('Testing settings page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.contains('Login').click();
    cy.get('input[placeholder="Username"]').type(testUsers[0].username);
    cy.get('input[placeholder="Password"]').type(testUsers[0].password);

    cy.contains('button', 'Login').click();
    cy.get('#menu-button').click();
    cy.contains('Settings').click();
  });

  it('Setting page shows correctly', () => {
    cy.contains('Settings');
    cy.contains('Username: ' + testUsers[0].username);
    cy.contains('Change user details');

    cy.contains('Current first name: ' + testUsers[0].firstName);
    cy.get('input[placeholder="New first name"]');
    cy.contains('Current last name: ' + testUsers[0].lastName);
    cy.get('input[placeholder="New last name"]');
    cy.contains('Current email: ' + testUsers[0].email);
    cy.get('input[placeholder="New email"]');
    cy.contains('button', 'Confirm changes');

    cy.contains('Change password');
    cy.get('input[placeholder="Current password');
    cy.get('input[placeholder="New password');
    cy.get('input[placeholder="New password again');
    cy.contains('button', 'Confirm new password');
  });

  it('Userdetails changed succesfully', () => {
    cy.get('input[placeholder="New first name"]').type('Jake');
    cy.get('input[placeholder="New last name"]').type('Dober');
    cy.get('input[placeholder="New email"]').type('jober@example.com');
    cy.contains('button', 'Confirm changes').click();

    cy.contains('Current first name: Jake');
    cy.contains('Current last name: Dober');
    cy.contains('Current email: jober@example.com');
  });

  it('Userdetails changed back successfully', () => {
    cy.get('input[placeholder="New first name"]').type(testUsers[0].firstName);
    cy.get('input[placeholder="New last name"]').type(testUsers[0].lastName);
    cy.get('input[placeholder="New email"]').type(testUsers[0].email);
    cy.contains('button', 'Confirm changes').click();

    cy.contains('Current first name: ' + testUsers[0].firstName);
    cy.contains('Current last name: ' + testUsers[0].lastName);
    cy.contains('Current email: ' + testUsers[0].email);
  });

  it('Password changed succesfully', () => {
    cy.get('input[placeholder="Current password').type(testUsers[0].password);
    cy.get('input[placeholder="New password').type(testUsers[0].password);
    cy.get('input[placeholder="New password again').type(testUsers[0].password);
    cy.contains('button', 'Confirm new password').click();

    cy.contains('Password changed');
  });

  it('Password changed unsuccesfully', () => {
    cy.get('input[placeholder="Current password').type('troll');
    cy.get('input[placeholder="New password').type('Test12#!');
    cy.get('input[placeholder="New password again').type('Test12#!');
    cy.contains('button', 'Confirm new password').click();

    cy.contains('Failed to change password');
  });

  it('Back button works on settings page', () => {
    cy.contains('button', 'Back').click();
    cy.contains('Recipes');
  });

});
