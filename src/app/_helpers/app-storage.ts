import {User} from '../model/user.model';
import _ from 'lodash';

export const USER_STORAGE_KEY = 'currency_user';

export class AppStorage {

  private user: User;

  constructor() {
    this.user = this.loadUser();
  }

  persistUser(user: User) {
    if (this.user != null) {
      user = _.merge(this.user, user);
    }

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    this.user = user;
  }

  loadUser(): User {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
  }

  clearUser() {
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  getAuthToken(): string {
    return this.user && this.user.token ? this.user.token : null;
  }

}
