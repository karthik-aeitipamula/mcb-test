import { browser, by, element } from 'protractor';

export class LoginPage {
  private credentias = {
    username: 'user',
    password: 'user'
  };

  navigateTo() {
    return browser.get('/login');
  }
  logOut() {
    element(by.css('#logoutbutton')).click();
  }
  fillCredentials(credentias: any = this.credentias) {
    element(by.css('[formcontrolname="username"]')).sendKeys(credentias.username);
    element(by.css('[formcontrolname="password"]')).sendKeys(credentias.password);
    element(by.css('#loginbutton')).click();
  }

  getPageTitleText() {
    return element(by.css('app-root .mat-card-title')).getText();
  }
}
