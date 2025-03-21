import CheckoutPage from '../pageobjects/CheckoutPage';
import { maybeFail } from '../helpers/RandomFailureHelper';
import { step, log, meta } from '@testomatio/reporter'; 


describe('Checkout Form Tests @S1c73cab5', () => {
  const checkoutPage = new CheckoutPage();

  before(() => {
    checkoutPage.open();
      meta('FEATURE','Checkout Form');
    step('Open Checkout Form');
  });

  it('should fill the form with valid data @Form @Checkout @T8fbcec6a', async () => {
    await checkoutPage.fillForm('John', 'Doe', 'johndoe', 'john@example.com', '123 Main St', 'United States', 'California', '90210');
    step('Form filled with valid data');
  });

  it('should not allow empty first name @Form @Checkout @Validation @T42ebd463', async () => {
    await checkoutPage.fillForm('', 'Doe', 'johndoe', 'john@example.com', '123 Main St', 'United States', 'California', '90210');
    maybeFail(0.2);
    step('Checked validation for empty first name');
  });

  it('should not allow invalid email @Form @Checkout @Validation @Tadf94695', async () => {
    await checkoutPage.fillForm('John', 'Doe', 'johndoe', 'invalid-email', '123 Main St', 'United States', 'California', '90210');
    maybeFail(0.2);
    step('Checked validation for invalid email');
  });

  it('should submit the form successfully @Form @Checkout @T9d742a2d', async () => {
    await checkoutPage.fillForm('Jane', 'Smith', 'janesmith', 'jane@example.com', '456 Elm St', 'United States', 'New York', '10001');
    await checkoutPage.submitForm();
    step('Form submitted successfully');
  });

  it('should handle form submission error gracefully @Form @Checkout @Error @Te11c7947', async () => {
    try {
      await checkoutPage.fillForm('Alice', 'Brown', 'alicebrown', 'alice@example.com', '789 Oak St', 'United States', 'Texas', '73301');
      maybeFail(0.5);
      await checkoutPage.submitForm();
      step('Form submitted, but expected failure did not occur');
    } catch (error) {
      log`Form submission failed as expected: ${error instanceof Error ? error.message : 'Unknown error'}`;
      expect(error).toBeInstanceOf(Error);
      
    }
  });
});
