import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I open the GitHub home page', () => {
  cy.visit('https://github.com');
});

Then('I should see correct h1', () => {
  cy.get('h1')
    .next()
    .should(
      'have.text',
      'Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.'
    );
});
