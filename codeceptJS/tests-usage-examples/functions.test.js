const testomat = require('@testomatio/reporter');

Feature('Testomat functions');

Scenario('Upload file', async () => {
  testomat.artifact('artifacts/artifact-test-text.txt');
});

Scenario('Upload image', async () => {
  testomat.artifact({
    path: 'artifacts/artifact-test-image.png',
  });
});

Scenario('Add Step to report', async () => {
  testomat.step('This is step message');
});

Scenario('Add log message to report', async () => {
  testomat.log('This is log message');
  testomat.log`This is log message with template literal`;
});
