import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {AppStorage} from "./_helpers/app-storage";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  router: Router;

  constructor(private injector: Injector, private storage: AppStorage) {
  }

  handleError(error) {

    if (error.status === 401) {
      if (!this.router) {
        this.router = this.injector.get(Router);
      }

      this.storage.clearUser();
      this.router.navigate(['/login']);
      return;
    }

    console.log('Hio', error.status)
    throw error;
  }

}
