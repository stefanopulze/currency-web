import {User} from '../model/user.model';
import _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";

export const USER_STORAGE_KEY = 'currency_user';

export class AppStorage {

  private _user: User;

  private token: Subject<String>;
  private user: Subject<User>;

  constructor() {
    this.loadUser();
    this.token = new Subject<String>();
    this.user = new Subject<User>();
  }

  persistUser(user: User) {
    const tokenChanged = (this._user && this._user.token !== user.token) || true;

    if (this._user != null) {
      this._user = _.merge(this._user, user);
    } else {
      this._user = user;
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this._user));

    this.user.next(this._user);

    if (tokenChanged) {
      this.token.next(this._user.token);
    }
  }

  loadUser(): User {
    return this._user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
  }

  clearUser() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.user.next(null);
  }

  getAuthToken(): string {
    return this._user && this._user.token ? this._user.token : null;
  }

  getToken(): Observable<string> {
    return this.token;
  }

  getUser(): Subject<User> {
    return this.user;
  }

}
