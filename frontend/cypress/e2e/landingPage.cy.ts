describe('Landing page works', () => {
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
});

