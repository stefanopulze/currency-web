import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  errorMessage: String;

  readonly appVersion: String = environment.version;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }


  login() {
    this.auth.login(this.username, this.password)
      .subscribe(
        (user) => {
          console.log(`user logged in as: ${user.username}`);
          this.router.navigate(['/']);
        },
        (error) => {
          let message;
          const ex = error.json() || {};

          if (error.status === 0) {
            message = 'Impossibile contattare il server';
          } else if (error.status === 401) {
            message = ex.message || 'Credenziali errate';
          } else {
            message = 'Errore interno del server';
          }

          this.errorMessage = message;
        }
      );
  }

}
