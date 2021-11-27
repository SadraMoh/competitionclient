import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tournament-info',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.scss']
})
export class TournamentInfoComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  joinChallenge(): void {
    this.router.navigateByUrl('/tournament/challenge')    
  }
  
}
