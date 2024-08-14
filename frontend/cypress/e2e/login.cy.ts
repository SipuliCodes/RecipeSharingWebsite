import { testUsers } from '../fixtures/userDetails';

describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('');
    cy.contains('Login').click();
  });

  it('Login fails with false password', () => {
    cy.get('input[placeholder="Username"]').type(testUsers[0].username);
    cy.get('input[placeholder="Password"]').type('wrong');

    cy.contains('button', 'Login').click();
    cy.contains('Password or username was wrong');
  });

  it('Login works with correct password', () => {
    cy.get('input[placeholder="Username"]').type(testUsers[0].username);
    cy.get('input[placeholder="Password"]').type(testUsers[0].password);

    cy.contains('button', 'Login').click();
    cy.contains('Recipes');
  });
});
