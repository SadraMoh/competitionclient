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
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
