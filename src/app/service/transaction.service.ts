import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Transastion} from '../model/transaction.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class TransactionService {

  constructor(private http: Http) { }

  createTransaction(transaction: Transastion): Observable<Transastion> {
    return this.http
      .post(environment.endpoint + '/transaction', transaction)
      .map(data => data.json());
  }

}
