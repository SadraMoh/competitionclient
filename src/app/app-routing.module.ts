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
import { ChangePasswordComponent } from './areas/user/change-password/change-password.component';
import { EditProfileComponent } from './areas/user/edit-profile/edit-profile.component';
import { ProfileComponent } from './areas/user/profile/profile.component';
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
          // user 
          {
            path: 'user', component: UserLayoutComponent, children: [
              { path: 'profile', component: ProfileComponent },
              { path: 'editProfile', component: EditProfileComponent },
              { path: 'changePassword', component: ChangePasswordComponent},
              { path: '**', redirectTo: 'profile' },
            ]
          },
          // contact 
          { path: 'contact', component: ContactComponent }
        ]
      },
      // tournament
      {
        path: 'tournament', redirectTo: '', children: []
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
