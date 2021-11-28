import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerQuestion } from 'src/app/models/tournament/AnswerQuestion';
import { HelperEnum } from 'src/app/models/tournament/HelperEnum';
import { QuestionOption } from 'src/app/models/tournament/QuestionOption';
import { Round } from 'src/app/models/tournament/Round';
import { Tournament } from 'src/app/models/tournament/Tournament';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  //- time

  public readonly maxTime = 1000;

  remainingMilis: number = this.maxTime;

  //- tournament

  tournament!: Tournament

  public get rounds(): Round[] {
    return this.tournament?.rounds ?? [];
  }

  currentRound: Round = {
    id: -1,
    questionText: 'بارگذاری...',
    questionOptions: [
      { id: 0, optionText: 'در حال' },
      { id: 0, optionText: 'لود کردن' },
      { id: 0, optionText: 'جواب های' },
      { id: 0, optionText: 'این سوال' },
    ],
  };

  public get roundIndex(): number {
    return this.rounds.indexOf(this.currentRound);
  }

  //- option

  chosenOption?: QuestionOption

  //- helper

  helpers: HelperEnum[] = [
    { id: 0, cost: 60, title: 'تایمر' },
    { id: 0, cost: 120, title: 'بمب' },
    { id: 0, cost: 200, title: 'دوباره' },
  ]

  activatedHelpers: HelperEnum[] = [

  ]

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const tournamentId = Number(this.route.snapshot.params['id']);
    this.tournamentService.find(tournamentId)
      .subscribe(
        (res) => {
          this.tournament = res.value;
          this.currentRound = this.tournament.rounds?.[0] ?? this.currentRound;
        },
        (err) => {
        }
      );

    this.tournamentService.helperEnums()
      .subscribe(
        (res) => {
          this.helpers = res.value;
        },
        (err) => {
          
        }
      )

  }

  /** select an option but don't send it yet */
  selectOption(option: QuestionOption): void {
    this.chosenOption = option;
  }

  /** accept answer and check if it was correct */
  sendAnswer(): void {

    if (!this.chosenOption) return;

    const answer: AnswerQuestion = {
      isHelp: this.activatedHelpers.length > 0,
      questionId: this.currentRound.id,
      helperEnumId: this.activatedHelpers?.[0]?.id ?? -1,
      optionId: this.chosenOption.id,
      responsesTime: this.remainingMilis,
      id: 0
    }

    this.tournamentService.AnswerQuestion(answer)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {

        }
      )

  }

  activateHelper(helper: HelperEnum) {
    this.activatedHelpers.push(helper);
  }

}
