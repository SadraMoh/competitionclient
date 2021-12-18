import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TournamentService } from 'src/app/services/tournament.service';
import { Location } from "@angular/common";
import { switchMap } from 'rxjs/operators';
import { Tournament } from 'src/app/models/tournament/Tournament';
import { TournamentInfo } from 'src/app/models/tournament/TournamentInfo';
import { AccountService } from 'src/app/services/account.service';
import User from 'src/app/models/user/User';
import { Round } from 'src/app/models/tournament/Round';

@Component({
  selector: 'app-tournament-info',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.scss']
})
export class TournamentInfoComponent implements OnInit {

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private accountService: AccountService
  ) { }

  tournament: Tournament = {} as Tournament;

  public user?: User


  public get firstAvailableRound(): Round | undefined {
    return this.tournament.rounds?.find(i => !i.hasAttended);
  }


  ngOnInit(): void {

    this.accountService.user.subscribe((res) => this.user = res);

    const tournamentId = Number(this.route.snapshot.params['id']);
    this.tournament.id = tournamentId;
    this.tournamentService.find(tournamentId)
      .subscribe(
        (res) => {
          this.tournament = res.value;
        },
        (err) => {
          this.location.back();
        }
      );
  }

  startRound(round: Round): void {
    if (round.hasAttended) {
      this.tournamentService.repeatRound(round.id)
        .subscribe(
          res => {
            this.router.navigate(['tournament', 'challenge', this.tournament.id, round.id])
          },
          rej => {
            this.router.navigate(['offers', { nofunds: true }])
          });
    }
    else
      this.router.navigate(['tournament', 'challenge', this.tournament.id, round.id])
  }

  repeatTournament(): void {

    debugger

    if ((this.user?.spoils?.coins ?? 0) < this.tournament.fee) {
      // insufficient funds
      this.router.navigate(['offers', { nofunds: true }])
      return;
    }

    this.tournamentService.repeatTournament(this.tournament.id)
      .subscribe(
        (res) => {
          this.ngOnInit();
        },
        (rej) => {
          this.router.navigate(['offers', { nofunds: true }])
        }
      )

  }

}
