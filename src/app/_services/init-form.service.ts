import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validation from '../_helpers/validators';
@Injectable({
  providedIn: 'root'
})
export class InitFormService {
  newTransaction: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  createTransactionForm(customerData) {
   return this.newTransaction = this.formBuilder.group({
      reference: ['',
                    [ Validators.required,
                      Validators.maxLength(15)
                    ]
                  ],
      customerNumber: [this.checkCustomerData(customerData) && customerData[0].customerNumber ? customerData[0].customerNumber: '',
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
  checkCustomerData(customerData) {
    return customerData && customerData.length > 0;
  }

  /**
   * Set customer info in the form
   * feteched from user api
   */
  setCustomerInfo(customerData) {
    this.newTransaction.get('customerName').setValue(this.checkCustomerData(customerData) && customerData[0].customerName ? customerData[0].customerName: '');
    this.newTransaction.get('customerAddress').setValue(this.checkCustomerData(customerData) && customerData[0].customerAddress ? customerData[0].customerAddress: '');
    this.newTransaction.get('customerPhone').setValue(this.checkCustomerData(customerData) && customerData[0].customerPhoneNumber ? customerData[0].customerPhoneNumber: '');
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
    return refPrefix;
  }
}
