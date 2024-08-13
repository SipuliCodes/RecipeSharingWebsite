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