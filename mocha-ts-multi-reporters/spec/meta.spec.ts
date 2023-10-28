import { testomat } from '@testomatio/reporter';

describe('Meta info @Saa571da4', () => {
  it('attach meta (key:value) to testrun @T75633e91', () => {
    testomat.meta({
      runType: 'smoke',
      browser: 'chrome',
      env: 'production',
    })
  });
});
