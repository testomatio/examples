import clickPage from '../pages/click.page';

describe('Click page', function() {
  it('Should able to click the button', function() {
    clickPage
        .open()
      .clickButton.click();
    
      expect(clickPage.clickButton.getText()).toEqual('Button That Ignores DOM Click Event', { wait: 2000 });
  });
});
