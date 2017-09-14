import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../model/user.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Session} from '../model/Session';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  updateProfile(user: User): Observable<User> {
    return this.http
      .put(environment.endpoint + '/user', user)
      .map(data => data.json());
  }

  updatePassword(password: any): Observable<any> {
    return this.http
      .put(environment.endpoint + '/user/password', password)
      .map(data => data.json());
  }

  getSessions(): Observable<Session[]> {
    return this.http
      .get(environment.endpoint + '/user/sessions')
      .map(data => data.json());
  }

}
