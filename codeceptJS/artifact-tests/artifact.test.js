const { testomat } = require('@testomatio/reporter');

Feature('Upload artifacts @Sc8396536');

Scenario('Upload file @T4d645caf', async () => {
  testomat.artifact('artifacts/artifact-test-text.txt');
});

Scenario('Upload image @T806d42e4', async () => {
  testomat.artifact({
    path: 'artifacts/artifact-test-image.png',
  });
});

Scenario('Do nothing @T83595926', async () => {
  console.log('do nothing');
});
