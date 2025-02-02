import LoginPage from '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';

describe('My test app', () => {
  it('should login with valid credentials', async () => {
    await LoginPage.open();

    await LoginPage.login('tomsmith', 'SuperSecretPassword!');
    expect(SecurePage.flashAlert).toBeExisting();
    expect(SecurePage.flashAlert).toHaveTextContaining(
      'You logged into a secure area!');
  });

  it('should not login with invalid credentials', async () => {
    await LoginPage.open();

    await LoginPage.login('tomsmith', 'bad password');
  });

  it('should not login with no credentials', async () => {
    await LoginPage.open();
    await LoginPage.login('', '');
  });

  it('should not login with no password', async () => {
    await LoginPage.open();
    await LoginPage.login('tomsmith', '');
  });

  it('should not login with no username', async () => {
    await LoginPage.open();
    await LoginPage.login('', 'SuperSecretPassword!');
  });

  it('should not login with no username and password', async () => {
    await LoginPage.open();
    await LoginPage.login('', '');
  });

  it('should not login with no username and invalid password', async () => {
    await LoginPage.open();
    await LoginPage.login('', 'bad password');
  });
});
