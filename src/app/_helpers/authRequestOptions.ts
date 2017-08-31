import {BaseRequestOptions, Headers} from '@angular/http';
import {AppStorage} from './app-storage';

const AUTHORIZATION_HEADER = 'Authorization';

export class AuthRequestOptions extends BaseRequestOptions {

  constructor(private storage: AppStorage) {
    super();
    this.attachToken();
  }

  private attachToken(): void {
    if (!this.headers) {
      this.headers = new Headers();
    } else {
      this.headers.delete(AUTHORIZATION_HEADER);
    }

    const token = this.storage.getAuthToken();
    if (token) {
      this.headers.append(AUTHORIZATION_HEADER, 'Bearer ' + token);
    }
  }

}
