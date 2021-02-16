import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TransactionsListService } from '../_services/transactions-list.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent  {
  transactionList$ = this.transactionService.list$;
  constructor(public transactionService: TransactionsListService) { }
}
