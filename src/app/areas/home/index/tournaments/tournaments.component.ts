import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament/Tournament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {

  tournaments: Tournament[] = [
    {
      imageUrl: '',
      isMultiPlayer: false,
      title: 'نام اول',
      fee: 100,
    },
    {
      imageUrl: '',
      isMultiPlayer: false,
      title: 'نام دوم',
      fee: 250,
    },
    {
      imageUrl: '',
      isMultiPlayer: true,
      title: 'نام سوم',
      fee: 350,
    },
    {
      imageUrl: '',
      isMultiPlayer: true,
      title: 'نام چهارم',
      fee: 300,
    },
    {
      imageUrl: '',
      isMultiPlayer: true,
      title: 'نام پنجم',
      fee: 150,
    },
  ]
  
  get multiplayer() : Tournament[] {
    return this.tournaments.filter(i => i.isMultiPlayer);
  }

  get test(): Tournament[] {
    return this.tournaments.filter(i => !i.isMultiPlayer);
  }

  multi: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
