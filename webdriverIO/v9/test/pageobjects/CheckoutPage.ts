import type AllureReporter from '@wdio/allure-reporter';

declare const allure: typeof AllureReporter;

export default class CheckoutPage {
  // Відкриває сторінку Checkout
  public async open(): Promise<void> {
    await browser.url('https://getbootstrap.com/docs/5.1/examples/checkout/');
  }

  // Селектори
  get firstNameInput() { return $('#firstName'); }
  get lastNameInput() { return $('#lastName'); }
  get usernameInput() { return $('#username'); }
  get emailInput() { return $('#email'); }
  get addressInput() { return $('#address'); }
  get countrySelect() { return $('#country'); }
  get stateSelect() { return $('#state'); }
  get zipInput() { return $('#zip'); }
  get submitButton() { return $('button[type="submit"]'); }

  // Заповнює форму з переданими даними
  public async fillForm(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    address: string,
    country: string,
    state: string,
    zip: string
  ): Promise<void> {
    await this.firstNameInput.waitForDisplayed({ timeout: 5000 });
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.usernameInput.setValue(username);
    await this.emailInput.setValue(email);
    await this.addressInput.setValue(address);
    await this.countrySelect.selectByVisibleText(country);
    await this.stateSelect.selectByVisibleText(state);
    await this.zipInput.setValue(zip);

    // Advanced Allure reporter: додаємо крок та вкладення
    if (typeof allure !== 'undefined') {
      allure.addStep(`Filled checkout form with ${firstName} ${lastName}`);
      allure.addAttachment(
        'Form Data',
        JSON.stringify({ firstName, lastName, username, email, address, country, state, zip }),
        'application/json'
      );
    }
  }

  // Натискає кнопку сабміту
  public async submitForm(): Promise<void> {
    await this.submitButton.click();
    if (typeof allure !== 'undefined') {
      allure.addStep('Submitted the checkout form');
    }
  }
}
