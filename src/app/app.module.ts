import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { LayoutComponent } from './areas/shared/layout/layout.component';
import { HeaderComponent } from './areas/shared/layout/header/header.component';
import { FooterComponent } from './areas/shared/layout/footer/footer.component';
import { IndexComponent } from './areas/home/index/index.component';
import { LoginComponent } from './areas/account/login/login.component';
import { SignupComponent } from './areas/account/signup/signup.component';
import { NotFoundComponent } from './areas/shared/err/not-found/not-found.component';
import { UserLayoutComponent } from './areas/user/user-layout/user-layout.component';
import { AccountLayoutComponent } from './areas/account/account-layout/account-layout.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    UserLayoutComponent,
    AccountLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
