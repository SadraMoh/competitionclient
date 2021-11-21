import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AccountLayoutComponent } from './areas/account/account-layout/account-layout.component';
import { LoginComponent } from './areas/account/login/login.component';
import { SignupComponent } from './areas/account/signup/signup.component';
import { ContactComponent } from './areas/contact/contact.component';
import { IndexComponent } from './areas/home/index/index.component';
import { NotFoundComponent } from './areas/shared/err/not-found/not-found.component';
import { LayoutComponent } from './areas/shared/layout/layout.component';
import { UserLayoutComponent } from './areas/user/user-layout/user-layout.component';

const routes: Routes = [
  {
    // app
    path: '', component: AppComponent, children: [
      // account
      {
        path: 'account', component: AccountLayoutComponent, children: [
          // login
          { path: 'login', component: LoginComponent },
          { path: 'signin', redirectTo: 'login' },
          // signup 
          { path: 'signup', component: SignupComponent },
          { path: 'register', redirectTo: 'signup' },

          { path: '**', redirectTo: 'login' },
        ]
      },
      // main 
      {
        path: '', component: LayoutComponent, children: [
          { path: '', component: IndexComponent },
          { path: 'home', redirectTo: '/' },
          // profile 
          {
            path: 'profile', component: UserLayoutComponent, children: []
          },
          // contact 
          {
            path: 'contact', component: ContactComponent, children: []
          }
        ]
      },
      // tournament
      {
        path: 'tournament', redirectTo: '', children: [ ]
      }
    ]
  },
  // err
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
