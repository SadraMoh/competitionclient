import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnswerQuestion } from 'src/app/models/tournament/AnswerQuestion';
import { HelperEnum, HelperType } from 'src/app/models/helper/HelperEnum';
import { Question } from 'src/app/models/tournament/Question';
import { QuestionOption } from 'src/app/models/tournament/QuestionOption';
import { Round } from 'src/app/models/tournament/Round';
import { Tournament } from 'src/app/models/tournament/Tournament';
import User from 'src/app/models/user/User';
import { AccountService } from 'src/app/services/account.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { ComponentCanDeactivate } from 'src/app/utility/guards/pending-changes.guard';
import { TimerComponent } from './timer/timer.component';
import { HelperService } from 'src/app/services/helper.service';
import { HelpRequest } from 'src/app/models/helper/HelpRequest';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, ComponentCanDeactivate {

  //- tournament

  tournament!: Tournament

  currentRound!: Round;

  public get questions(): Question[] {
    return this.currentRound.questions ?? [];
  }

  public set questions(v: Question[]) {
    this.currentRound.questions = v;
  }

  currentQuestion!: Question

  public get nextQuestion(): Question | undefined {
    return this.questions[this.questions.indexOf(this.currentQuestion) + 1]
  }

  isFinalQuestion: boolean = false;

  isTournamentFinished: boolean = false;

  //- time

  isTimeExpired: boolean = false;

  @ViewChild("timer")
  timer!: TimerComponent

  remainingMilis: number = 0;

  public get maxTime(): number {
    return this.currentQuestion.responseLifeTime * 100
  }

  //- option

  chosenOption?: QuestionOption

  /** retrieved from the server */
  correctAnswerId?: number;

  //- helper

  helpers: HelperEnum[] = [
    { id: 1, cost: 0, title: 'حذف یک گزینه ' },
    { id: 2, cost: 0, title: 'شانس دوباره' },
    { id: 3, cost: 0, title: 'زمان اضافه' },
  ]

  activatedHelpers: HelperEnum[] = [

  ]

  hasSecondLife: boolean = false;

  // -

  user?: User

  /** deleted after every round, is used to determine if the user has sent an answer to the server */

  public get answerSent(): boolean {
    return Boolean(this.correctAnswerId);
  }

  constructor(
    private tournamentService: TournamentService,
    private helperService: HelperService,
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
    return this.isTournamentFinished;
  }

  ngOnInit(): void {

    this.accountService.user.subscribe((res) => { this.user = res })

    const tournamentId = Number(this.route.snapshot.params['id']);
    this.tournamentService.find(tournamentId)
      .subscribe(
        (res) => {
          this.tournament = res.value;
          this.currentRound = this.tournament.rounds?.[0] ?? this.currentRound;
          this.timer.start(this.maxTime);
        },
        (err) => {
        }
      );

    this.helperService.helperEnums()
      .subscribe(
        (res) => {
          this.helpers = res.value;
        },
        (err) => {

        }
      )

  }

  toNextQuestion(): void {
    this.chosenOption = undefined;
    this.correctAnswerId = undefined;

    let previousRoundId = this.currentRound.id;

    this.currentQuestion = this.nextQuestion ?? this.currentQuestion;

    // if there is no next question, it means it's the last question
    if (!this.nextQuestion)
      this.isFinalQuestion = true;

    this.activatedHelpers = [];

    this.isTimeExpired = false;
    this.timer.reset();
    this.timer.start(this.maxTime);
  }

  /** select an option but don't send it yet */
  selectOption(option: QuestionOption): void {
    this.chosenOption = option;
  }

  /** accept answer and check if it was correct */
  sendAnswer(): void {

    // !
    if (!this.chosenOption) this.chosenOption = { id: 0 } as QuestionOption;

    // remove chosen question if the question was wrong but the user had a second life
    if (this.hasSecondLife) {
      if (!this.chosenOption.isTrue) {
        this.currentQuestion.questionOptions = this.currentQuestion.questionOptions.filter(i => i != this.chosenOption);
        this.hasSecondLife = false;
        return;
      }
    }

    this.timer.freeze();

    const answer: AnswerQuestion = {
      optionId: this.chosenOption.id,
      isHelp: this.activatedHelpers.length > 0,
      helperEnumId: this.activatedHelpers?.[0]?.id ?? undefined,
      questionId: this.currentQuestion.questionId,
      responsesTime: this.remainingMilis,
      roundId: this.currentRound.id,
    }

    if (this.isTimeExpired) {
      answer.responsesTime = null as any;
      answer.optionId = null as any;
    }

    this.correctAnswerId = this.currentQuestion.questionOptions.find(i => i.isTrue)?.id;

    this.tournamentService.AnswerQuestion(answer).subscribe()

  }

  activateHelper(helper: HelperEnum): void {

    // check if activation is possible
    const canActivate = (this.user?.spoils?.coins ?? 0) > helper.cost;
    if (!canActivate) {
      alert('سکه های شما کافی نمی باشد')
      return
    };

    const request: HelpRequest = {
      heleprEnumId: helper.id,
      questionId: this.currentQuestion.questionId,
    }

    // request and update user spoils
    this.helperService.helpRequest(request)
      .subscribe(_ => this.accountService.user.subscribe(res => this.user = res));

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

  finishTournament(): void {
    this.isTournamentFinished = true;
    this.router.navigate(['tournament', 'info', this.tournament.id], { replaceUrl: true })
  }


  timeUp(): void {
    this.isTimeExpired = true;
    this.sendAnswer();
  }

  // #region

  removeOneWrongOption() {
    const toBlow = this.currentQuestion.questionOptions.filter(i => !i.isTrue)[0];
    this.currentQuestion.questionOptions = this.currentQuestion.questionOptions.filter(i => i != toBlow);
  }

  addTime() {
    this.timer.reset();
  }

  duplex() {
    this.hasSecondLife = true;
  }

  // #endregion
}
