Feature('Test feature name');

Scenario('test something',  ({ I }) => {
  I.amOnPage('https://www.google.com/');
  I.see('Google');
});
