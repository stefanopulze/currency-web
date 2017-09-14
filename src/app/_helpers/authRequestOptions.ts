import {BaseRequestOptions, Headers} from '@angular/http';
import {AppStorage} from './app-storage';

const AUTHORIZATION_HEADER = 'Authorization';

export class AuthRequestOptions extends BaseRequestOptions {

  constructor(private storage: AppStorage) {
    super();
    this.attachToken();

    storage.getToken().subscribe(this.attachToken.bind(this));
  }

  private attachToken(token?: string): void {
    if (!this.headers) {
      this.headers = new Headers();
    }

    if (!token) {
      token = this.storage.getAuthToken();
    }

    if (!token) {
      this.headers.delete(AUTHORIZATION_HEADER);
    } else {
      this.headers.set(AUTHORIZATION_HEADER, 'Bearer ' + token);
    }
  }

}
