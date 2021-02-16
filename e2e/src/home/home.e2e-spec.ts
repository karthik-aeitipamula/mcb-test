import { HomePage } from './home.po';
import { LoginPage } from '../login/login.po';

describe('protractor-tutorial - Public page', () => {
  let page: HomePage;
  let login: LoginPage;

  beforeEach(() => {
    page = new HomePage();
    login = new LoginPage();
  });
  it('should login user', () => {
    login.navigateTo();
    login.fillCredentials();
    expect(page.getPageTitleText()).toEqual('Welcome User!');
  });

  it('should display heading saying Welcome to MCB!', () => {
    page.navigateTo();
    expect(page.getPageTitleText()).toEqual('Welcome User!');
  });

  it('should go to create transaction page', () => {
    page.navigateTo();
    page.newTransaction();
    expect(page.getPageSubTitleText()).toEqual('Create New Transaction');
  });

  it('should go to list page', () => {
    page.navigateTo();
    page.viewTransaction();
    expect(page.getPageTitleText()).toEqual('Transaction Details');
  });
  it('should go to new transaction and create a transaction', () => {
    page.navigateTo();
    page.newTransaction();
    expect(page.getPageSubTitleText()).toEqual('Create New Transaction');
    page.filltransactionForm();
    expect(page.getPageTitleText()).toEqual('Transaction Details');
  });
  it('should go to new transaction and create a transaction and save the record', () => {
    page.navigateTo();
    page.newTransaction();
    expect(page.getPageSubTitleText()).toEqual('Create New Transaction');
    page.filltransactionForm();
    expect(page.getRecordValue()).toEqual('Ashley');
  });
});
