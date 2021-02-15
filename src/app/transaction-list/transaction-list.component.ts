import { Component, OnInit } from '@angular/core';
import { TransactionsListService } from '../_services/transactions-list.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactionList;
  constructor(public transactionService: TransactionsListService) { }

  ngOnInit() {
    this.transactionList = this.transactionService.getTransactionsList();
  }

}
