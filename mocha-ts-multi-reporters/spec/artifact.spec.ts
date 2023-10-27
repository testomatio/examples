import { testomat } from '@testomatio/reporter';

describe('Artifacts', () => {
  it('attach image @Tc4cf0c7e', () => {
    testomat.artifact('artifacts/artifact-test-image.png');
  });

  it('attach text', () => {
    testomat.artifact('artifacts/artifact-test-text.txt');
  });
});
