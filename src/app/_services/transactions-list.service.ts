import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsListService {
  public transactionList = [];
  public postUrl = `https://jsonplaceholder.typicode.com/posts`;

  constructor(private http: HttpClient) { }

  storeTransactions(transaction) {
    return this.http.post(this.postUrl, transaction).pipe(
      tap( // Log the result or error
        data => this.transactionList.push(data),
        error => console.warn(error)
      )
    );
  }
  getTransactionsList() {
    return this.transactionList;
  }
}
