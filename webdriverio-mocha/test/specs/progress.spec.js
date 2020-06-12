import progressPage from '../pages/progress.page';

describe('Progress page', function () {

  it('Should open the progress page in browser', () => {
    progressPage.open()
  });

  it('Should able to click start button', () => {
    progressPage
      .open()
      .startButton.click()

    expect(progressPage.getProgress()).toEqual('25%', { wait: 2000 });
  })

  it('Should progress change', () => {
    progressPage
      .open()
      .startButton.click()
    
    progressPage.waitForProgress(27, 20000);
  })

  it('Should wait for 75%', () => {
    progressPage
      .open()
      .startButton.click()
    
    progressPage.waitForProgress(75, 20000);
  })

});
