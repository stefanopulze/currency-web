import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ExpenceService {

  constructor(private http: Http) { }

  findLast(size: number) {
    return this.http
      .get(environment.endpoint + '/expence/last?size=' + size)
      .map(response => response.json());

  }

  getMonthlyValues(): Observable<any[]> {
    return this.http
      .get(environment.endpoint + '/expence/sum/monthly')
      .map(response => response.json());
  }

}
