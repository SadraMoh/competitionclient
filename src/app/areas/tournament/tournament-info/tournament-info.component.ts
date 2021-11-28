import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TournamentService } from 'src/app/services/tournament.service';
import { Location } from "@angular/common";
import { switchMap } from 'rxjs/operators';
import { Tournament } from 'src/app/models/tournament/Tournament';

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
    private location: Location
  ) { }

  tournament!: Tournament

  ngOnInit(): void {

    const tournamentId = Number(this.route.snapshot.params['id']);
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

  joinChallenge(): void {
    this.router.navigate(['tournament', 'challenge', { id: this.tournament.id }])
  }

}
