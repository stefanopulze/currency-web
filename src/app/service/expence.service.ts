import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {Transaction} from "../model/transaction.model";

@Injectable()
export class ExpenceService {

  constructor(private http: Http) { }

  findLast(size: number): Observable<Transaction[]> {
    return this.http
      .get(environment.endpoint + '/expence/last?size=' + size)
      .map(response => response.json())
      .map(transactions => {
        transactions.forEach(transaction => {
          transaction.$tags = transaction.tags.map(tag => {
            return tag.name;
          }).join(', ');
        });

        return transactions;
      });
  }

  getMonthlyValues(): Observable<any[]> {
    return this.http
      .get(environment.endpoint + '/expence/sum/monthly')
      .map(response => response.json());
  }

}
