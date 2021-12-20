import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { LayoutComponent } from './areas/shared/layout/layout.component';
import { HeaderComponent } from './areas/shared/layout/header/header.component';
import { FooterComponent } from './areas/shared/layout/footer/footer.component';
import { IndexComponent } from './areas/home/index/index.component';
import { LoginComponent } from './areas/account/login/login.component';
import { SignupComponent } from './areas/account/signup/signup.component';
import { NotFoundComponent } from './areas/shared/err/not-found/not-found.component';
import { AccountLayoutComponent } from './areas/account/account-layout/account-layout.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MobileNavigationComponent } from './areas/shared/layout/mobile-navigation/mobile-navigation.component';
import { ContactComponent } from './areas/home/contact/contact.component';
import { ProfileComponent } from './areas/user/profile/profile.component';
import { TournamentsComponent } from './areas/home/index/tournaments/tournaments.component';
import { LeaderboardsComponent } from './areas/home/index/leaderboards/leaderboards.component';
import { HistoryComponent } from './areas/home/index/history/history.component';
import { TournamentComponent } from './areas/home/index/tournaments/tournament/tournament.component';
import { EditProfileComponent } from './areas/user/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './areas/user/change-password/change-password.component';
import { UserLayoutComponent } from './areas/user/user-layout/user-layout.component';
import { TournamentLayoutComponent } from './areas/tournament/tournament-layout/tournament-layout.component';
import { TournamentInfoComponent } from './areas/tournament/tournament-info/tournament-info.component';
import { ChallengeComponent } from './areas/tournament/challenge/challenge.component';
import { TimerComponent } from './areas/tournament/challenge/timer/timer.component';
import { SecondsPipe } from './utility/pipes/seconds.pipe';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TelnoDirective } from './utility/validators/telno/telno.directive';
import { ConfirmComponent } from './areas/account/confirm/confirm.component';
import { ForgotPasswordComponent } from './areas/account/forgot-password/forgot-password.component';
import { DifficultyPipe } from './utility/pipes/difficulty.pipe';
import { ViewProfileComponent } from './areas/user/view-profile/view-profile.component';
import { MatchDirective } from './utility/validators/match/match.directive';
import { OffersComponent } from './areas/home/offers/offers.component';
import { PendingChangesGuard } from './utility/guards/pending-changes.guard';
import { FallbackImageDirective } from './utility/directives/fallback-image.directive';
import { RemainingPipe } from './utility/pipes/remaining.pipe';
import { DeadlinePipe } from './utility/pipes/deadline.pipe';
import { CountdownComponent } from './utility/atomic/countdown/countdown.component';
import { PurchaseComponent } from './areas/home/purchase/purchase.component';
import { ModalComponent } from './utility/atomic/modal/modal.component';
import { ModalContainerComponent } from './utility/atomic/modal-container/modal-container.component';

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
    AccountLayoutComponent,
    MobileNavigationComponent,
    ContactComponent,
    ProfileComponent,
    TournamentsComponent,
    LeaderboardsComponent,
    HistoryComponent,
    TournamentComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    UserLayoutComponent,
    TournamentLayoutComponent,
    TournamentInfoComponent,
    ChallengeComponent,
    TimerComponent,
    SecondsPipe,
    TelnoDirective,
    ConfirmComponent,
    ForgotPasswordComponent,
    DifficultyPipe,
    ViewProfileComponent,
    MatchDirective,
    OffersComponent,
    FallbackImageDirective,
    RemainingPipe,
    DeadlinePipe,
    CountdownComponent,
    PurchaseComponent,
    ModalComponent,
    ModalContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    JwtHelperService,
    PendingChangesGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
