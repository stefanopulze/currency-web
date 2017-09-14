import {Component, OnInit} from '@angular/core';
import {AppStorage} from '../../_helpers/app-storage';
import {User} from '../../model/user.model';
import {Menu} from '../../model/menu.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private user: User;
  private menus: Menu[] = [
    {title: 'Dashboard', icon: 'dashboard', link: 'dashboard'},
    {title: 'Tags', icon: 'tags', link: 'tags'}
  ]

  constructor(private storage: AppStorage) { }

  ngOnInit() {
    this.user = this.storage.loadUser();
    this.storage.getUser().subscribe(user => {
      console.log('Update user');
      this.user = user;
    });
  }

}
