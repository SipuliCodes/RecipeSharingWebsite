import { testUsers} from '../fixtures/userDetails';

describe('reciphare', () => {
  beforeEach('Visit page', () => {
    cy.visit('');
  });

  it('Landing page', () => {
    cy.contains('Reciphare');
    cy.contains('Share and find great recipes');
  });

  it('Changing landing page language', () => {
    cy.contains('En').parent().click();

    cy.contains('Fi').click();
    cy.contains('Fi');

    cy.contains('Jaa ja löydä mahtavia reseptejä');
  });

  describe('Signupform', () => {
    beforeEach('Open signupform', () => {
      cy.contains('Sign up').click();
    });

    it('Signup form has correct input fields', () => {
      cy.get('input[placeholder="First name"]');
      cy.get('input[placeholder="Last name"]');
      cy.get('input[placeholder="Username"]');
      cy.get('input[placeholder="Email"]');
      cy.get('input[placeholder="Password"]');
      cy.get('input[placeholder="Confirm password"]');

      cy.contains('button', 'Create Account');
    });

    it('Singup form username error works', () => {
      cy.get('input[placeholder="Username"]').type('s');
      cy.contains('Username must be atleast 3 characters');
    });

    it('Singup form email error works', () => {
      cy.get('input[placeholder="Email"]').type('s');
      cy.contains('Email is not valid');
    });

    it('Singup form password errors work', () => {
      cy.get('input[placeholder="Password"]').click();
      cy.contains('Password must have atleast 8 characters, a number, a small letter, a big letter, a special character');
      cy.get('input[placeholder="Password"]').type('s');
      cy.contains(
        'Password must have atleast 8 characters, a number, a big letter, a special character'
      );
      cy.get('input[placeholder="Password"]').type('S');
      cy.contains(
        'Password must have atleast 8 characters, a number, a special character'
      );
      cy.get('input[placeholder="Password"]').type('#');
      cy.contains(
        'Password must have atleast 8 characters, a number'
      );
      cy.get('input[placeholder="Password"]').type('3');
      cy.contains(
        'Password must have atleast 8 characters'
      );
      cy.get('input[placeholder="Password"]').type('aaaa');
      cy.get('Password must have atleast 8 characters').should('not.exist');
    });

    it('Signup form closes correctly', () => {
      cy.get('#close-button').click();

      cy.contains('Share and find great recipes');
    });
  });

  describe('Loginform', () => {
    beforeEach('Open loginform', () => {
      cy.contains('Login').click();
    });
    
    it('Login form has correct input fields', () => {
      cy.get('input[placeholder="Username"]');
      cy.get('input[placeholder="Password"]');

      cy.contains('button', 'Login');
    });

    it('Login form closes correctly', () => {
      cy.get('#close-button').click();

      cy.contains('Share and find great recipes');
    });
  });
  describe('When users', () => {
    before('Reset database and add users', () => {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      cy.visit('');

      testUsers.forEach((user) => {
        cy.contains('Sign up').click();

        cy.get('input[placeholder="First name"]').should('not.be.disabled').type(user.firstName);
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

    describe('Login tests', () => {
      beforeEach('Open login form', () => {
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
      });
    });
  });
});