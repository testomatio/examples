import CheckoutPage from '../pageobjects/CheckoutPage';
import { maybeFail } from '../helpers/RandomFailureHelper';
import { step, meta } from '@testomatio/reporter'


describe('Checkout UI Tests @S57513325', () => {
  const checkoutPage = new CheckoutPage();

  beforeEach(() => {
    checkoutPage.open();
    meta('FEATURE','Checkout UI');
    step('Open Checkout UI');
  });

  it('should display the checkout form @UI @Checkout @T02196791', async () => {
    expect(await checkoutPage.firstNameInput.isDisplayed()).toBe(true);
    step('Verified that checkout form is displayed');
  });

  it('should have a submit button @UI @Checkout @T4278d951', async () => {
    expect(await checkoutPage.submitButton.isDisplayed()).toBe(true);
    maybeFail(0.2);
    step('Verified that submit button is displayed');
  });

  it('should have country select options @UI @Checkout @Tcee6d39c', async () => {
    const options = await checkoutPage.countrySelect.$$('option');
    expect(options.length).toBeGreaterThan(1);
    step(`Country select has ${options.length} options`);
  });

  it('should have state select options @UI @Checkout @Td4ede6f6', async () => {
    const options = await checkoutPage.stateSelect.$$('option');
    expect(options.length).toBeGreaterThan(1);
    maybeFail(0.2);
    step(`State select has ${options.length} options`);
  });

  it('should update UI elements on focus @UI @Checkout @T801ce4d6', async () => {
    await checkoutPage.firstNameInput.click();
    await checkoutPage.firstNameInput.setValue('Test');
    step('First name input focused and updated');
    maybeFail(0.2);
  });
});
