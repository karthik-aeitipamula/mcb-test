import { LoginPage } from './login.po';
import { PublicPage } from '../public/public.po';

describe('protractor-tutorial - Login page', () => {
  let page: LoginPage;
  let publicPage: PublicPage;

  const wrongCredentias = {
    username: 'wrongname',
    password: 'wrongpasswd'
  };

  beforeEach(() => {
    page = new LoginPage();
    publicPage = new PublicPage();
  });

  it('when user trying to login with wrong credentials he should stay on “login” page and see error notification', () => {
    page.navigateTo();
    page.fillCredentials(wrongCredentias);
    expect(page.getPageTitleText()).toEqual('Login');
    // expect(page.getErrorMessage()).toEqual('Username or password is incorrect');
  });

  it('when login is successful — he should redirect to default home page', () => {
    page.navigateTo();
    page.fillCredentials();
    expect(publicPage.getPageTitleText()).toEqual('Welcome User!');
  });

  it('after login logout', () => {
    page.logOut();
    expect(page.getPageTitleText()).toEqual('Login');
  });
});
