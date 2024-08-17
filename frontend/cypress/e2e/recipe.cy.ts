import { testUsers } from '../fixtures/userDetails';
import { testRecipes } from '../fixtures/recipeDetails';

describe('Recipepage tests', () => {
  beforeEach(() => {
    cy.visit('');
    cy.contains('Login').click();
    cy.get('input[placeholder="Username"]').type(testUsers[0].username);
    cy.get('input[placeholder="Password"]').type(testUsers[0].password);
    cy.contains('button', 'Login').click();

    cy.contains('Recipes');
  });

  it('Add recipe works', () => {
    cy.contains('Add recipe').click();
    cy.contains('Add recipe');

    cy.get('#title').type(testRecipes[0].title);
    cy.get('#description').type(testRecipes[0].description);

    testRecipes[0].mealCategory.forEach(category => {
      cy.get('#category-select').click();
      cy.contains(category).click();
    });

    testRecipes[0].ingredients.forEach(ingredient => {
      cy.get('#ingredient').type(ingredient);
      cy.get('#add-ingredient-button').click();
    });
    testRecipes[0].steps.forEach((step) => {
      cy.get('#step').type(step);
      cy.get('#add-step-button').click();
    });

    cy.get('#image').type(testRecipes[0].image);

    cy.contains('button', 'Add recipe').click();
    cy.wait(500).reload(true);
    cy.contains(testRecipes[0].title);
    cy.contains('0 likes');
  });

  it('Cancel add recipe works', () => {
    cy.contains('Add recipe').click();
    cy.contains('Add recipe');

    cy.get('#title').type(testRecipes[1].title);
    cy.get('#description').type(testRecipes[1].description);

    testRecipes[1].mealCategory.forEach((category) => {
      cy.get('#category-select').click();
      cy.contains(category).click();
    });

    testRecipes[1].ingredients.forEach((ingredient) => {
      cy.get('#ingredient').type(ingredient);
      cy.get('#add-ingredient-button').click();
    });
    testRecipes[1].steps.forEach((step) => {
      cy.get('#step').type(step);
      cy.get('#add-step-button').click();
    });

    cy.get('#image').type(testRecipes[1].image);

    cy.contains('button', 'Cancel').click();
    cy.wait(500).reload(true).wait(500);
    cy.contains(testRecipes[1].title).should('not.exist');
  });

  describe('When multiple recipes', () => {
    before(() => {
      cy.visit('');
      cy.contains('Login').click();
      cy.get('input[placeholder="Username"]').type(testUsers[0].username);
      cy.get('input[placeholder="Password"]').type(testUsers[0].password);
      cy.contains('button', 'Login').click();
      testRecipes.slice(1).forEach(recipe => {
        cy.contains('Add recipe').click();
        cy.contains('Add recipe');

        cy.get('#title').type(recipe.title);
        cy.get('#description').type(recipe.description);

        recipe.mealCategory.forEach((category) => {
          cy.get('#category-select').click();
          cy.get('#category-select').children().contains(category).click();
        });

        recipe.ingredients.forEach((ingredient) => {
          cy.get('#ingredient').type(ingredient);
          cy.get('#add-ingredient-button').click();
        });
        recipe.steps.forEach((step) => {
          cy.get('#step').type(step);
          cy.get('#add-step-button').click();
        });

        cy.get('#image').type(recipe.image);

        cy.contains('button', 'Add recipe').click();
        cy.wait(500).reload(true);
        cy.contains(recipe.title);
        cy.contains('0 likes');
      });
      cy.get('#menu-button').click();
      cy.contains('Log out').click();
    });
    it('Like works', () => {
      cy.contains(testRecipes[3].title).siblings().find('#like-button').click();
      cy.contains(testRecipes[3].title)
        .siblings()
        .find('#likes')
        .should('contain', '1 likes');
      cy.get('#menu-button').click();
      cy.contains('Log out').click();
      cy.contains('Login').click();
      cy.get('input[placeholder="Username"]').type(testUsers[0].username);
      cy.get('input[placeholder="Password"]').type(testUsers[0].password);
      cy.contains('button', 'Login').click();
      cy.contains(testRecipes[3].title)
        .siblings()
        .find('#likes')
        .should('contain', '1 likes');
    });

    it('Liked recipe page works', () => {
      cy.get('#menu-button').click();
      cy.contains('Liked recipes').click();

      cy.contains('Liked recipes');
      cy.contains(testRecipes[3].title)
        .siblings()
        .find('#likes')
        .should('contain', '1 likes');
    });

    it('Recipe page filter works', () => {
      cy.get('#menu-button').click();
      cy.contains('Liked recipes').click();

      cy.get('#category-filter-select').click();
      cy.contains(testRecipes[3].mealCategory[0][0].toUpperCase() + testRecipes[3].mealCategory[0].slice(1)).click();

      cy.contains(testRecipes[3].title);

      cy.get('#category-filter-select').click();
      cy.contains('Breakfast').click();

      cy.get(testRecipes[3].title).should('not.exist');
    });

    it('Unliking works', () => {
      cy.contains(testRecipes[3].title).siblings().find('#like-button').click();
      cy.contains(testRecipes[3].title)
        .siblings()
        .find('#likes')
        .should('contain', '0 likes');
      cy.get('#menu-button').click();
      cy.contains('Log out').click();
      cy.contains('Login').click();
      cy.get('input[placeholder="Username"]').type(testUsers[0].username);
      cy.get('input[placeholder="Password"]').type(testUsers[0].password);
      cy.contains('button', 'Login').click();
      cy.contains(testRecipes[3].title)
        .siblings()
        .find('#likes')
        .should('contain', '0 likes');
    });

    it('Filter works on main page', () => {
      cy.get('#category-filter-select').click();
      cy.contains('Breakfast').click();
      cy.contains(testRecipes[4].title);
      cy.get(testRecipes[0].title).should('not.exist');
      cy.get(testRecipes[1].title).should('not.exist');
      cy.get(testRecipes[2].title).should('not.exist');
      cy.get(testRecipes[3].title).should('not.exist');

      cy.get('#category-filter-select').click();
      cy.contains('Lunch').click();
      cy.contains(testRecipes[0].title);
      cy.contains(testRecipes[2].title);
      cy.get(testRecipes[1].title).should('not.exist');
      cy.get(testRecipes[3].title).should('not.exist');
      cy.get(testRecipes[4].title).should('not.exist');

      cy.get('#category-filter-select').click();
      cy.contains('Snack').click();
      cy.contains(testRecipes[1].title);
      cy.get(testRecipes[0].title).should('not.exist');
      cy.get(testRecipes[2].title).should('not.exist');
      cy.get(testRecipes[4].title).should('not.exist');
      cy.get(testRecipes[3].title).should('not.exist');


      cy.get('#category-filter-select').click();
      cy.contains('Dinner').click();
      cy.contains(testRecipes[2].title);
      cy.get(testRecipes[0].title).should('not.exist');
      cy.get(testRecipes[1].title).should('not.exist');
      cy.get(testRecipes[4].title).should('not.exist');
      cy.get(testRecipes[3].title).should('not.exist');

      cy.get('#category-filter-select').click();
      cy.contains('Dessert').click();
      cy.contains(testRecipes[3].title);
      cy.get(testRecipes[0].title).should('not.exist');
      cy.get(testRecipes[2].title).should('not.exist');
      cy.get(testRecipes[4].title).should('not.exist');
      cy.get(testRecipes[1].title).should('not.exist');
    });

    it('Search works on main page', () => {
      cy.get('#search').type('Ch').wait(1000);
      cy.contains(testRecipes[3].title);
      cy.contains(testRecipes[1].title);
      cy.get(testRecipes[0].title).should('not.exist');
      cy.get(testRecipes[2].title).should('not.exist');
      cy.get(testRecipes[4].title).should('not.exist');
    });

    it('Search and filter works together', () => {
      cy.get('#category-filter-select').click();
      cy.contains('Lunch').click();
      cy.get('#search').type('Spa');
      cy.contains(testRecipes[0].title);
      cy.get(testRecipes[2].title).should('not.exist');
      cy.get(testRecipes[1].title).should('not.exist');
      cy.get(testRecipes[3].title).should('not.exist');
      cy.get(testRecipes[4].title).should('not.exist');
    });

    describe('Test single recipe\'s page', () => {
      beforeEach(() => {
        cy.contains(testRecipes[0].title).click();
      });
      
      it('All recipe data is shown', () => {
        cy.contains(testRecipes[0].title);
        cy.contains(testRecipes[0].description);
        cy.contains('Published by johnDoe123');
        testRecipes[0].ingredients.forEach(ingredient => {
          cy.contains(ingredient);
        });
        testRecipes[0].ingredients.forEach(step=> {
          cy.contains(step);
        });

        cy.contains('Comments');
        cy.contains('button', 'Add comment');
      });

      it('Commenting works', () => {
        cy.contains('button', 'Back').click();
        cy.get('#menu-button').click();
        cy.contains('Log out').click();

        cy.contains('Login').click();
        cy.get('input[placeholder="Username"]').type(testUsers[1].username);
        cy.get('input[placeholder="Password"]').type(testUsers[1].password);
        cy.contains('button', 'Login').click();
        cy.contains(testRecipes[0].title).click();

        cy.contains('button', 'Add comment').click();
        cy.get('#comment-box').type('Mmm, deliscious. Best pasta I have ever eaten.');
        cy.contains('button', 'Add').click();
        cy.wait(500).reload();
        cy.contains('Mmm, deliscious. Best pasta I have ever eaten.');
        cy.contains(testUsers[1].username);
      });

      it('Canceling comment works', () => {
        cy.contains('button', 'Back').click();
        cy.get('#menu-button').click();
        cy.contains('Log out').click();

        cy.contains('Login').click();
        cy.get('input[placeholder="Username"]').type(testUsers[1].username);
        cy.get('input[placeholder="Password"]').type(testUsers[1].password);
        cy.contains('button', 'Login').click();
        cy.contains(testRecipes[0].title).click();

        cy.contains('button', 'Add comment').click();
        cy.get('#comment-box').type(
          'This was so bad.'
        );
        cy.contains('button', 'Cancel').click();
        cy.contains('This was so bad.').should('not.exist');
      });

      it('Seeing comments', () => {
        cy.contains('Mmm, deliscious. Best pasta I have ever eaten.');
        cy.contains(testUsers[1].username);
      });

      it('Others don\'t see delete button', () => {
        cy.contains('button', 'Back').click();
        cy.get('#menu-button').click();
        cy.contains('Log out').click();

        cy.contains('Login').click();
        cy.get('input[placeholder="Username"]').type(testUsers[1].username);
        cy.get('input[placeholder="Password"]').type(testUsers[1].password);
        cy.contains('button', 'Login').click();
        cy.contains(testRecipes[0].title).click();
        cy.contains('Delete recipe').should('not.exist');
      });

      it('Publisher sees delete button and it works', () => {
        cy.on('window:confirm', () => true);
        cy.contains('button', 'Delete recipe').click();
        cy.contains('Recipes');
        cy.contains(testRecipes[0].title).should('not.exist');
      });
    });
  });
});