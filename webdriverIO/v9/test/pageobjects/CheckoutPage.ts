import { step, meta } from '@testomatio/reporter'; 
export default class CheckoutPage {

  public async open(): Promise<void> {
    await browser.url('https://getbootstrap.com/docs/5.1/examples/checkout/');
  }

  get firstNameInput() { return $('#firstName'); }
  get lastNameInput() { return $('#lastName'); }
  get usernameInput() { return $('#username'); }
  get emailInput() { return $('#email'); }
  get addressInput() { return $('#address'); }
  get countrySelect() { return $('#country'); }
  get stateSelect() { return $('#state'); }
  get zipInput() { return $('#zip'); }
  get submitButton() { return $('button[type="submit"]'); }

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

    step(`Filled checkout form with ${firstName} ${lastName}`);
      meta('Form Data',
        JSON.stringify({ firstName, lastName, username, email, address, country, state, zip }),
        'application/json'
      );
  }

  public async submitForm(): Promise<void> {
    await this.submitButton.click();
    step('Submitted the checkout form');
  }
}
