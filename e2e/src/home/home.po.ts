import { browser, by, element } from 'protractor';

export class HomePage {
  private transaction = {
      customerNumber: '10000',
      transferAmount: '1200',
      transferCurrency: 'EUR',
      beneficiaryBank: 'Canara Bank',
      beneficiaryAccountNumber: '1234567890',
      paymentDetails: 'Salary'
  };


  navigateTo() {
    return browser.get('/home'); // we can navigate to '/' for get pblic page since this is the default route
  }

  getPageTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getRecordValue() {
    return element(by.css('.transaction__name')).getText();
  }

  getPageSubTitleText() {
    return element(by.css('app-root h2')).getText();
  }

  newTransaction() {
    element(by.css('#newTransaction')).click();
  }
  viewTransaction() {
    element(by.css('#viewTransaction')).click();
  }
  filltransactionForm() {
    element(by.css('[formcontrolname="customerNumber"]')).sendKeys(this.transaction.customerNumber);
    element(by.css('[formcontrolname="transferAmount"]')).sendKeys(this.transaction.transferAmount);
    element(by.css('[formcontrolname="transferCurrency"]')).sendKeys(this.transaction.transferCurrency);
    element(by.css('[formcontrolname="beneficiaryBank"]')).sendKeys(this.transaction.beneficiaryBank);
    element(by.css('[formcontrolname="beneficiaryAccountNumber"]')).sendKeys(this.transaction.beneficiaryAccountNumber);
    element(by.css('[formcontrolname="paymentDetails"]')).sendKeys(this.transaction.paymentDetails);
    element(by.css('#createTransaction')).click();
    browser.waitForAngular();
  }
}
