import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { TransactionsListService } from '../_services/transactions-list.service';
import { transaction } from '../_interfaces';
import{ InitFormService } from '../_services/init-form.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  newTransaction;
  public customerData;
  currencies: any[] = ['AED', 'EUR', 'CHF', 'MUR', 'USD'];

  constructor(
              public apiService: UserService,
              public transactionService: TransactionsListService,
              public initFormService: InitFormService,
              public router: Router) { }

  ngOnInit() {
    this.setForm();
    this.getCustomerInfo();
  }

  /**
   * Fetching Customer data from api
   * passing the customerNumber and filtering the desired from list
   */
  getCustomerInfo() {
    this.newTransaction.controls['customerNumber'].valueChanges.subscribe(value => {
      this.customerData = this.apiService.getUsers().filter((user) => {
        if(user.customerNumber == value) {
          return user;
        }
      });
      this.initFormService.setCustomerInfo(this.customerData);
    });
  }
  /**
   * Setting up the new transaction fields in the form
   * prefill customer related data if customer number exits in api response
   */
  setForm() {
    this.newTransaction = this.initFormService.createTransactionForm(this.customerData);
    this.newTransaction.get('reference').setValue(this.initFormService.generateRefNumber());

  }

  get userTransactionControls() {
    return this.newTransaction.controls;
  }


  /**
   * Submit the form
   * once validations are checked
   */
  submitTransactionForm() {
    this.transactionService.storeTransactions(this.newTransaction.value).subscribe((res: transaction) => {
      this.router.navigate(['allTansactions']);
    });

  }

}
