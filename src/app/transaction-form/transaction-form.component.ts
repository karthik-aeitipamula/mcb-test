import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import validation from '../_helpers/validators';
import { TransactionsListService } from '../_services/transactions-list.service';
import { transaction } from '../_interfaces'
@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  newTransaction: FormGroup;
  public customerData;
  currencies: any[] = ['AED', 'EUR', 'CHF', 'MUR', 'USD'];

  constructor(private formBuilder: FormBuilder,
              public apiService: UserService,
              public transactionService: TransactionsListService,
              public router: Router) { }

  ngOnInit() {
    this.setForm();
    this.getCustomerInfo();
    this.generateRefNumber();
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
      this.setCustomerInfo();
    });
  }
  /**
   * Setting up the new transaction fields in the form
   * prefill customer related data if customer number exits in api response
   */
  setForm() {
    this.newTransaction = this.formBuilder.group({
      reference: ['',
                    [ Validators.required,
                      Validators.maxLength(15)
                    ]
                  ],
      customerNumber: [this.checkCustomerData() && this.customerData[0].customerNumber ? this.customerData[0].customerNumber: '',
                        [ Validators.required,
                          Validators.maxLength(5),
                          Validators.minLength(5),
                          Validators.pattern(validation.numberValidation)
                        ]
                      ],
      customerName: [''],
      customerAddress: [''],
      customerPhone: [''],
      transferAmount: ['',
                        [ Validators.required,
                          Validators.pattern(validation.numberValidation)
                        ]
                      ],
      transferCurrency: ['', Validators.required],
      beneficiaryBank: ['',
                          [ Validators.required,
                            Validators.pattern(validation.charValidation)
                          ]
                        ],
      beneficiaryAccountNumber: ['', Validators.required],
      paymentDetails: ['',
                        [ Validators.required,
                          Validators.pattern(validation.charValidation)
                        ]
                      ]
    });

  }
  /**
   * Set customer info in the form
   * feteched from user api
   */
  setCustomerInfo() {
    this.newTransaction.get('customerName').setValue(this.checkCustomerData() && this.customerData[0].customerName ? this.customerData[0].customerName: '');
    this.newTransaction.get('customerAddress').setValue(this.checkCustomerData() && this.customerData[0].customerAddress ? this.customerData[0].customerAddress: '');
    this.newTransaction.get('customerPhone').setValue(this.checkCustomerData() && this.customerData[0].customerPhoneNumber ? this.customerData[0].customerPhoneNumber: '');
  }

  get userTransactionControls() {
    return this.newTransaction.controls;
  }

  checkCustomerData() {
    return this.customerData && this.customerData.length > 0;
  }
  /**
   * Generate Reference number
   * with CUS as prefix and random number consits (yyyymmdd) and sequence number
   * max length should be 15
   */
  generateRefNumber(){
    const date = new Date();
    const randomNumber = Math.floor(Math
      .random() * (99999 - 10000 + 1)) + 10000;
    const refPrefix = `CUS${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${randomNumber}`;
    this.newTransaction.get('reference').setValue(refPrefix);
  }

  /**
   * Submit the form
   * once validations are checked
   */
  submitTransactionForm() {
    console.log('this.newTransaction', this.newTransaction.value)
    this.transactionService.storeTransactions(this.newTransaction.value).subscribe((res: transaction) => {
      this.router.navigate(['allTansactions']);
    });

  }

}
