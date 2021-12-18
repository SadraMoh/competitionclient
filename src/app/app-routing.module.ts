import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AccountLayoutComponent } from './areas/account/account-layout/account-layout.component';
import { ConfirmComponent } from './areas/account/confirm/confirm.component';
import { ForgotPasswordComponent } from './areas/account/forgot-password/forgot-password.component';
import { LoginComponent } from './areas/account/login/login.component';
import { SignupComponent } from './areas/account/signup/signup.component';
import { ContactComponent } from './areas/home/contact/contact.component';
import { IndexComponent } from './areas/home/index/index.component';
import { OffersComponent } from './areas/home/offers/offers.component';
import { PurchaseComponent } from './areas/home/purchase/purchase.component';
import { NotFoundComponent } from './areas/shared/err/not-found/not-found.component';
import { LayoutComponent } from './areas/shared/layout/layout.component';
import { ChallengeComponent } from './areas/tournament/challenge/challenge.component';
import { TournamentInfoComponent } from './areas/tournament/tournament-info/tournament-info.component';
import { TournamentLayoutComponent } from './areas/tournament/tournament-layout/tournament-layout.component';
import { ChangePasswordComponent } from './areas/user/change-password/change-password.component';
import { EditProfileComponent } from './areas/user/edit-profile/edit-profile.component';
import { ProfileComponent } from './areas/user/profile/profile.component';
import { UserLayoutComponent } from './areas/user/user-layout/user-layout.component';
import { ViewProfileComponent } from './areas/user/view-profile/view-profile.component';
import { AuthGuard } from './utility/guards/auth.guard';
import { PendingChangesGuard } from './utility/guards/pending-changes.guard';

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
          { path: 'confirm/:telNo', component: ConfirmComponent},
          // 
          { path: 'forgotPassword', component: ForgotPasswordComponent},

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
              // allow access to other people's profile even when not logged in
              { path: 'profile/:id', component: ViewProfileComponent },
              { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
              { path: 'editProfile', component: EditProfileComponent, canActivate: [AuthGuard] },
              { path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuard] },
              { path: '**', redirectTo: 'profile' },
            ]
          },
          // contact 
          { path: 'contact', component: ContactComponent },

          // coins
          { path: 'offers', component: OffersComponent , canActivate: [AuthGuard] },
          { path: 'Purchase', component: PurchaseComponent},
        ]
      },
      // tournament
      {
        path: 'tournament', component: TournamentLayoutComponent, children: [
          { path: 'info/:id', component: TournamentInfoComponent, },
          { path: 'challenge/:tournamentId/:roundId', component: ChallengeComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] },
          { path: '**', redirectTo: '../' },
        ]
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
