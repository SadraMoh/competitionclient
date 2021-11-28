import { Component, OnInit } from '@angular/core';
import { HelperEnum } from 'src/app/models/tournament/HelperEnum';
import { QuestionOption } from 'src/app/models/tournament/QuestionOption';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  chosenOption!: QuestionOption
  
  options: QuestionOption[] = [
    { id: 0, optionText: 'بله این یک سوال می باشد' },
    { id: 0, optionText: 'بله این یک سوال می باشد' },
    { id: 0, optionText: 'بله این یک سوال می باشد' },
    { id: 0, optionText: 'بله این یک سوال می باشد' },
  ];

  helpers: HelperEnum[] = [
    { id: 0, cost: 60, title: 'تایمر'},
    { id: 0, cost: 120, title: 'بمب'},
    { id: 0, cost: 200, title: 'دوباره'},
  ]
  
  activeHelpers: HelperEnum[] = [

  ]

  constructor() { } 

  ngOnInit(): void {
  }
 
  selectOption(option: QuestionOption): void {
    this.chosenOption = option;
  }

  activateHelper(helper: HelperEnum) {
    this.activeHelpers.push(helper);
  }
  
}
