import { testomat } from '@testomatio/reporter';


describe('suite name @Sf862948e', () => {
  it('artifact with path as string is uploaded @Tca2c7cc5', async function () {
    testomat.artifact('artifacts/artifact-test-text.txt');
  });
  
  it('artifact with path as object is uploaded @Tcf89ae3e', async function () {
    testomat.artifact({
      path: 'artifacts/artifact-test-image.png',
    });
  });

})
