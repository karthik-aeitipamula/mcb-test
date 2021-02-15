import { browser, by, element } from 'protractor';

export class PublicPage {
  navigateTo() {
    return browser.get('/home'); // we can navigate to '/' for get pblic page since this is the default route
  }

  getPageTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  logOut() {
    return element(by.css('a[href="/login"]')).click();
  }
}
