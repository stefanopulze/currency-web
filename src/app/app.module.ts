import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, RequestOptions} from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './ui/header/header.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import {routing} from './app.routing';
import {ExpenceService} from './service/expence.service';
import {GlobalErrorHandler} from './globalErrorHandler.handler';
import {AuthService} from './service/auth.service';
import {AuthRequestOptions} from './_helpers/authRequestOptions';
import {AppStorage} from "./_helpers/app-storage";
import { ProfileComponent } from './page/profile/profile.component';
import {UserService} from "./service/user.service";
import {TagService} from "./service/tag.service";
import { FastExpenceComponent } from './ui/fast-expence/fast-expence.component';
import {TransactionService} from "./service/transaction.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ProfileComponent,
    FastExpenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AppStorage,
    AuthService,
    ExpenceService,
    UserService,
    TagService,
    TransactionService,
    { provide: ErrorHandler,  useClass: GlobalErrorHandler },
    {
      provide: RequestOptions,
      deps: [AppStorage],
      useFactory: AuthRequestFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function AuthRequestFactory(storage: AppStorage) {
  return new AuthRequestOptions(storage);
}
