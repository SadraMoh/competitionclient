import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Tournament } from 'src/app/models/tournament/Tournament';
import { TournamentDifficulty } from 'src/app/models/tournament/TournamentDifficulty';
import { TournamentService } from 'src/app/services/tournament.service';
import { ModalComponent } from 'src/app/utility/atomic/modal/modal.component';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {

  tournaments: Tournament[] = [
    // {
    //   id: 0,
    //   imageUrl: '',
    //   isMultiPlayer: false,
    //   title: 'نام اول',
    //   fee: 100,
    //   difficulty: TournamentDifficulty.easy,
    //   participantsCount: 7,
    // },
    // {
    //   id: 0,
    //   imageUrl: '',
    //   isMultiPlayer: false,
    //   title: 'نام دوم',
    //   fee: 250,
    //   difficulty: TournamentDifficulty.hard,
    //   participantsCount: 20,
    // },
    // {
    //   id: 0,
    //   imageUrl: '',
    //   isMultiPlayer: true,
    //   title: 'نام سوم',
    //   fee: 350,
    //   difficulty: TournamentDifficulty.medium,
    //   participantsCount: 123,
    // },
    // {
    //   id: 0,
    //   imageUrl: '',
    //   isMultiPlayer: true,
    //   title: 'نام چهارم',
    //   fee: 300,
    //   difficulty: TournamentDifficulty.medium,
    //   participantsCount: 12,
    // },
    // {
    //   id: 0,
    //   imageUrl: '',
    //   isMultiPlayer: true,
    //   title: 'نام پنجم',
    //   fee: 150,
    //   difficulty: TournamentDifficulty.easy,
    //   participantsCount: 10,
    // },
  ]

  get multiplayer(): Tournament[] {
    return this.tournaments.filter(i => i.isMultiPlayer);
  }

  get test(): Tournament[] {
    return this.tournaments.filter(i => !i.isMultiPlayer);
  }

  /** is the user viewing multiplayer tournaments */
  multi: boolean = true;

  constructor(
    private tournamentService: TournamentService
  ) { }

  isHydrated: boolean = false;

  @Output('hydrate') 
  public hydrate: EventEmitter<void> = new EventEmitter();
  
  ngOnInit(): void {

    // hydrate tournaments
    this.tournamentService.get()
      .subscribe(
        (res) => {
          this.tournaments = res.value;
          this.isHydrated = true;
          this.hydrate.emit();
        },
        (err) => { }
      )

  }

}
