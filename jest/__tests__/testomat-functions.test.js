import { testomat } from '@testomatio/reporter';

describe('suite name', () => {
  it('artifact is uploaded', async function () {
    testomat.artifact('artifacts/artifact-test-text.txt');
  });

  it('log', async function () {
    testomat.log`This is log message`;
  });

  it('step', async function () {
    testomat.step('This is step');
  });
})
