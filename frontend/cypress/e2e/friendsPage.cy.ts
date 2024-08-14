import { testUsers } from '../fixtures/userDetails';

describe('When logged in', () => {
  beforeEach(() => {
    cy.visit('');
    cy.contains('Login').click();
    cy.get('input[placeholder="Username"]').type(testUsers[0].username);
    cy.get('input[placeholder="Password"]').type(testUsers[0].password);

    cy.contains('button', 'Login').click();
  });

  it('Friends page is working', () => {
    cy.get('#menu-button').click();
    cy.contains('Friends').click();
    cy.contains('Friends');
  });

  it('Changing language works', () => {
    cy.get('#menu-button').click();
    cy.contains('Friends').click();
    cy.contains('Friends');

    cy.wait(500).contains('En').parent().click();

    cy.contains('Fi').click();
    cy.contains('Fi');

    cy.contains('Ystävät');
  });

  describe('Testing friends page', () => {
    beforeEach(() => {
      cy.get('#menu-button').click();
      cy.contains('Friends').click();
    });

    it('Sending friend request', () => {
      cy.get('input[placeholder="search"]').type('alice');
      cy.contains('Send request').click();
      cy.contains('Request sent');
    });

    it('Sent friend request should be shown', () => {
      cy.contains('Alice'),
      cy.contains('Johnson'),
      cy.contains('aliceJohnson789'),
      
      cy.contains('Waiting...');
    });


    it('Alice should see friend request', () => {
      cy.get('#menu-button').click();
      cy.contains('Log out').click();

      cy.contains('Login').click();
      cy.get('input[placeholder="Username"]').type(testUsers[2].username);
      cy.get('input[placeholder="Password"]').type(testUsers[2].password);
      cy.contains('button', 'Login').click();
      cy.get('#menu-button').click();
      cy.contains('Friends').click();
      cy.contains('John');
      cy.contains('Doe');
      cy.contains('johnDoe123');

      cy.contains('Accept');
      cy.contains('Decline');
    });

    it('Alice declining and not seeing friend request anymore', () => {
      cy.get('#menu-button').click();
      cy.contains('Log out').click();

      cy.contains('Login').click();
      cy.get('input[placeholder="Username"]').type(testUsers[2].username);
      cy.get('input[placeholder="Password"]').type(testUsers[2].password);
      cy.contains('button', 'Login').click();
      cy.get('#menu-button').click();
      cy.contains('Friends').click();
      cy.contains('Decline').click();

      cy.get('John').should('not.exist');
      cy.get('Doe').should('not.exist');
      cy.get('johnDoe123').should('not.exist');
    });

    it('Alice sending friend request', () => {
      cy.get('#menu-button').click();
      cy.contains('Log out').click();

      cy.contains('Login').click();
      cy.get('input[placeholder="Username"]').type(testUsers[2].username);
      cy.get('input[placeholder="Password"]').type(testUsers[2].password);
      cy.contains('button', 'Login').click();
      cy.get('#menu-button').click();
      cy.contains('Friends').click();
      cy.get('input[placeholder="search"]').type('john');
      cy.contains('Send request').click();
      cy.contains('Request sent');
    });

    it('Accepting friend request', () => {
      cy.contains('Accept').click();
    });

    it('Should see show recipes when searching Alice', () => {
      cy.get('input[placeholder="search"]').type('alice');
      cy.contains('Show recipes');
    });

    it('Should have Alice as friend', () => {
      cy.contains('Alice');
      cy.contains('Johnson');
      cy.contains('aliceJohnson789');
      cy.contains('Remove friend');
      cy.contains('Show recipes');
    });

    it('Delete Alice as friend', () => {
      cy.contains('Remove friend').click();

      cy.get('Alice').should('not.exist');
      cy.get('Johnson').should('not.exist');
      cy.get('aliceJohnson789').should('not.exist');
    });

    it('Alice not seeing John as friend anymore', () => {
      cy.get('#menu-button').click();
      cy.contains('Log out').click();

      cy.contains('Login').click();
      cy.get('input[placeholder="Username"]').type(testUsers[2].username);
      cy.get('input[placeholder="Password"]').type(testUsers[2].password);
      cy.contains('button', 'Login').click();
      cy.get('#menu-button').click();
      cy.contains('Friends').click();

      cy.get('John').should('not.exist');
      cy.get('Doe').should('not.exist');
      cy.get('johnDoe123').should('not.exist');
    });
  });
});
