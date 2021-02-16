import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { tap, take, } from 'rxjs/operators';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { List } from '../_interfaces/index'

const ANONYMOUS_LIST: List = {
  reference: '',
  customerName: '',
  transferAmount:  0,
  transferCurrency:  '',
};


@Injectable({
  providedIn: 'root'
})
export class TransactionsListService {

  private transactionList = new BehaviorSubject<[List]>(null);

  list$: Observable<[List]> = this.transactionList.asObservable();

  public postUrl = `https://jsonplaceholder.typicode.com/posts`;

  constructor(private http: HttpClient) { }

  storeTransactions(transaction) {
    return this.http.post(this.postUrl, transaction).pipe(
      tap(
        (data: List) => {
          this.transactionList.pipe(take(1)).subscribe((current:any) => {
            if(!current) {
              current = [];
            }
            current.push(data)
            this.transactionList.next(current)

          });
        },
        error => console.warn(error)
      )
    );
  }

}
