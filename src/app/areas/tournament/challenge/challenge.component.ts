import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnswerQuestion } from 'src/app/models/tournament/AnswerQuestion';
import { HelperEnum, HelperType } from 'src/app/models/tournament/HelperEnum';
import { QuestionOption } from 'src/app/models/tournament/QuestionOption';
import { Round } from 'src/app/models/tournament/Round';
import { Tournament } from 'src/app/models/tournament/Tournament';
import User from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { ComponentCanDeactivate } from 'src/app/utility/guards/pending-changes.guard';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, ComponentCanDeactivate {

  //- time

  isTimeExpired: boolean = false;

  @ViewChild("timer")
  timer!: TimerComponent

  public readonly maxTime = 1000;

  remainingMilis: number = this.maxTime;

  //- tournament

  tournament!: Tournament

  public get rounds(): Round[] {
    return this.tournament?.rounds ?? [];
  }

  currentRound: Round = {
    id: 0,
    questionId: 1,
    questionText: 'بارگذاری...',
    questionOptions: [
      { id: 0, isTrue: false, optionText: 'در حال' },
      { id: 0, isTrue: false, optionText: 'لود کردن' },
      { id: 0, isTrue: false, optionText: 'جواب های' },
      { id: 0, isTrue: false, optionText: 'این سوال' },
    ],
  };

  public get roundIndex(): number {
    return this.rounds.indexOf(this.currentRound);
  }

  //- option

  chosenOption?: QuestionOption

  //- helper

  helpers: HelperEnum[] = [
    { id: 1, cost: 60, title: 'حذف یک گزینه ' },
    { id: 2, cost: 200, title: 'شانس دوباره' },
    { id: 3, cost: 120, title: 'زمان اضافه' },
  ]

  activatedHelpers: HelperEnum[] = [

  ]

  user?: User

  /** deleted after every round, is used to determine if the user has sent an answer to the server */
  correctAnswerId?: number;

  public get answerSent(): boolean {
    return Boolean(this.correctAnswerId);
  }

  public get isFinalRound(): boolean {
    return this.roundIndex == (this.rounds.length - 1);
  }

  @HostListener('window:beforeunload', ['$event'])
  handleClose($event: any) {
    $event.returnValue = false;
  }

  constructor(
    private tournamentService: TournamentService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    return false;
  }

  ngOnInit(): void {

    this.accountService.user.subscribe((res) => { this.user = res })

    const tournamentId = Number(this.route.snapshot.params['id']);
    this.tournamentService.find(tournamentId)
      .subscribe(
        (res) => {
          this.tournament = res.value;
          this.currentRound = this.tournament.rounds?.[0] ?? this.currentRound;

          this.timer.start();
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

    if (!this.chosenOption) this.chosenOption = { id: 0 } as QuestionOption;

    this.timer.freeze();

    const answer: AnswerQuestion = {
      optionId: this.chosenOption.id,
      isHelp: this.activatedHelpers.length > 0,
      helperEnumId: this.activatedHelpers?.[0]?.id ?? 0,
      questionId: this.currentRound.questionId,
      responsesTime: this.remainingMilis,
      userId: this.user?.id,
      id: this.currentRound.id
    }

    this.tournamentService.AnswerQuestion(answer)
      .subscribe(
        (res) => {
          this.correctAnswerId = res.value.correctOptionId;
        },
        (err) => {

        }
      )

  }

  activateHelper(helper: HelperEnum): void {
    this.activatedHelpers.push(helper);

    switch (helper.id) {
      case HelperType.bomb:
        this.removeOneWrongOption();
        break;
      case HelperType.duplex:
        this.duplex();
        break;
      case HelperType.time:
        this.addTime();
        break;
    }

  }

  nextRound(): void {
    this.chosenOption = undefined;
    this.correctAnswerId = undefined;

    this.currentRound = this.rounds[this.roundIndex + 1];

    this.activatedHelpers = [];

    this.isTimeExpired = false;
    this.timer.reset();
    this.timer.start();

  }

  finishTournament(): void {

  }


  timeUp(): void {
    this.sendAnswer();
    this.isTimeExpired = true;
  }

  // #region

  removeOneWrongOption() {
    const toBlow = this.currentRound.questionOptions.filter(i=> !i.isTrue)[0];
    this. currentRound.questionOptions = this.currentRound.questionOptions.filter(i => i != toBlow);
  }

  addTime() {
    this.timer.reset();
  }

  duplex() {

  }

  // #endregion
}
