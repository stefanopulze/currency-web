import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Transaction} from '../model/transaction.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class TransactionService {

  constructor(private http: Http) { }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post(environment.endpoint + '/transaction', transaction)
      .map(data => data.json());
  }

  remove(transaction: Transaction): Observable<any> {
    return this.http
      .delete(`${environment.endpoint}/transaction/${transaction.id}`)
      .map(data => data.json());
  }

}
