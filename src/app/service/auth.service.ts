import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {User} from '../model/user.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import {AppStorage} from '../_helpers/app-storage';



@Injectable()
export class AuthService {

  private user: User;

  constructor(private http: Http, private router: Router, private storage: AppStorage) {
    this.user = this.storage.loadUser();
  }

  isLogged(): boolean {
    return this.user != null && this.user.token != null;
  }

  isLoggedOrLogin(): void {
    if (!this.isLogged()) {
      this.navigateToLogin();
    }
  }

  login(username: String, password: String): Observable<any> {
    return this.http
      .post(environment.endpoint + '/login', {username, password})
      .map(response => response.json())
      .map(data => {
        this.user = new User();
        this.user.id = data.user_id;
        this.user.email = data.email;
        this.user.username = data.username;
        this.user.token = data.token;
        this.user.name = data.name;
        this.user.surname = data.surname;

        this.storage.persistUser(this.user);

        return this.user;
      });
  }

  logout() {
    this.storage.clearUser();
    this.user = null;
    this.navigateToLogin();
  }

  private navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  getUser(): User {
    return this.storage.loadUser();
  }

}
