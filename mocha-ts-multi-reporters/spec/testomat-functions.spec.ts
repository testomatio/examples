import { testomat, log,  } from '@testomatio/reporter';

describe('Testomat functions @S43849225', () => {
  it('attach image @T93dc3526', () => {

    testomat.artifact('artifacts/artifact-test-image.png');
  });

  it('log message @T6fdfc777', () => {
    log`This is log message`;
  });

  it('add step @T2fa88ab9', () => {
    testomat.step('This is step message');
  });
});
