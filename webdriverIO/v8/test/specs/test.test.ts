import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'

describe('My Login application', () => {
  it('username input should be visible', async () => {
    await LoginPage.open()

    await expect(LoginPage.inputUsername).toBeExisting()
  });

  it('should login with valid credentials', async () => {
    await LoginPage.open()

    await LoginPage.login('tomsmith', 'SuperSecretPassword!')
    await expect(SecurePage.flashAlert).toBeExisting()
    await expect(SecurePage.flashAlert).toHaveTextContaining(
      'You logged into a secure area!')
  });
})
