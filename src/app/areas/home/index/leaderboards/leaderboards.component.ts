import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {

  constructor() { }

  leads: any[] = [
    { userId: 1, },
    { userId: 2, isSelf: true },
    { userId: 3, },
    { userId: 4, },
    { userId: 5, },
  ]

  ngOnInit(): void {



  }

}
