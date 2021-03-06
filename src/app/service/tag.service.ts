import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Tag} from "../model/tag.model";

@Injectable()
export class TagService {

  constructor(private http: Http) { }

  getMostUsed(): Observable<any> {
    return this.http
      .get(environment.endpoint + '/tag/most-used')
      .map(data => data.json());
  }

  getTags(): Observable<Tag[]> {
    return this.http
      .get(`${environment.endpoint}/user/tags`)
      .map(data => data.json());
  }

}
