import { Component, OnInit } from '@angular/core';
import { TournamentRank } from 'src/app/models/tournamentRank/tournamentRank';
import User from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';
import { TournamentRankService } from 'src/app/services/tournament-rank.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private tournamentRankService: TournamentRankService
  ) { }

  leads!: TournamentRank[]
  // = [
  //   { userId: 1, },
  //   { userId: 2, isSelf: true },
  //   { userId: 3, },
  //   { userId: 4, },
  //   { userId: 5, },
  // ]

  user?: User

  ngOnInit(): void {

    this.accountService.user.subscribe(res => this.user = res);

    this.tournamentRankService.get()
      .subscribe(
        (res) => {
          this.leads = res.value;
        }
      )

  }

}
