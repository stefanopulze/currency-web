import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {UserService} from '../../service/user.service';
import {AppStorage} from '../../_helpers/app-storage';
import {Session} from "../../model/Session";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  section = 'profile';
  user: User;
  passwords = {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  };
  passwordErrorMessage = null;
  sessions: Session[];


  constructor(private storage: AppStorage, private service: UserService) {
  }

  ngOnInit() {
    this.user = this.storage.loadUser();
  }

  updateProfile() {
    this.service
      .updateProfile(this.user)
      .subscribe(this.updateProfileComplete.bind(this));
  }

  updateProfileComplete(user: User) {
    this.user = user;
    this.storage.persistUser(user);
  }

  showSection(section: string) {
    this.section = section;

    if (this.section === 'sessions') {
      this.loadSessions();
    }
  }

  updatePassword() {
    this.service.updatePassword(this.passwords)
      .subscribe(
        data => console.log(data),
        error => {
          console.log(error.json());
          this.passwordErrorMessage = error.json().message;
        }
      );
  }

  loadSessions() {
    this.service.getSessions().subscribe(
      sessions => this.sessions = sessions
    );
  }

}
