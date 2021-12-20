import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
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
import { ModalComponent } from 'src/app/utility/atomic/modal/modal.component';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit, ComponentCanDeactivate {

  //- tournament

  tournament?: Tournament
  tournamentId!: number;

  currentRound!: Round;

  public get roundPlace(): number {
    return (this.tournament?.rounds?.findIndex(i => i.id == this.currentRound?.id) ?? 0) + 1;
  }

  public get nextRound(): Round | undefined {
    return this.tournament?.rounds?.find(i => !i.hasAttended && i.id != this.currentRound.id);
  }

  public get questions(): Question[] {
    return this.currentRound?.questions ?? [];
  }

  public set questions(v: Question[]) {
    this.currentRound.questions = v;
  }

  currentQuestion!: Question

  public get nextQuestion(): Question | undefined {
    return this.questions[this.questions.indexOf(this.currentQuestion) + 1]
  }

  public get isFinalQuestion(): boolean {
    return !Boolean(this.nextQuestion) && Boolean(this.currentRound);
  }

  /** is added to on next question */
  questionIndex: number = 0;

  isTournamentFinished: boolean = false;

  //- time

  isTimeExpired: boolean = false;

  @ViewChild("timer")
  timer!: TimerComponent

  remainingMilis: number = 0;

  public get maxTime(): number {
    return this.currentQuestion?.responseLifeTime * 100
  }

  //- option

  chosenOption?: QuestionOption

  /** set on accept answer */
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

  answers: AnswerQuestion[] = [];

  hydrated: boolean = false;

  @ViewChild("roundComplete")
  roundCompleteModal!: ModalComponent

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

    this.tournamentId = Number(this.route.snapshot.params['tournamentId']);
    const roundId = Number(this.route.snapshot.params['roundId']);

    const round$ = this.tournamentService.startRound(roundId)
    round$.subscribe(
      (res) => {
        this.currentRound = res.value;
        this.currentQuestion = this.currentRound.questions[0];

      }
    )

    const helper$ = this.helperService.helperEnums()
    helper$.subscribe(
      (res) => {
        this.helpers = res.value;
      }
    )

    forkJoin([round$, helper$]).subscribe(i => {
      this.hydrated = true;
      this.isTimeExpired = false;
      this.timer.reset();
      this.timer.start(this.maxTime);
    })

    this.tournamentService.find(this.tournamentId)
      .subscribe(
        res => {
          this.tournament = res.value;
        }
      )

  }

  toNextQuestion(): void {
    this.chosenOption = undefined;
    this.correctAnswerId = undefined;

    this.currentQuestion = this.nextQuestion ?? this.currentQuestion;

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
  acceptAnswer(): void {

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
      helperEnumId: this.activatedHelpers?.[0]?.id ?? null,
      questionId: this.currentQuestion.questionId,
      responsesTime: this.remainingMilis,
      roundId: this.currentRound.id,
    }

    if (this.isTimeExpired) {
      answer.responsesTime = null as any;
      answer.optionId = null as any;
    }

    this.correctAnswerId = this.currentQuestion.questionOptions.find(i => i.isTrue)?.id;

    this.answers.push(answer);
    // this.tournamentService.AnswerQuestion(answer).subscribe()

    // check if last question was answered
    if (!this.nextQuestion)
      this.lastQuestionAnswered()

  }

  scores?: Round

  lastQuestionAnswered() {

    this.roundCompleteModal.show();
    this.timer.freeze();

    this.tournamentService.finishRound(this.answers)
      .subscribe(
        res => {
          this.isTournamentFinished = true;
          this.scores = res.value;


        }
      );
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

  finishRound(): void {
    this.router.navigate(['/', 'tournament', 'info', this.tournamentId]);
  }

  gettingNewRound: boolean = false;
  playNextRound() {
    this.gettingNewRound = true;

    this.isTournamentFinished = true;
    if (!this.nextRound) return;

    // mark currentRound as attended
    if (this.tournament && this.tournament.rounds)
      this.tournament.rounds[this.tournament?.rounds?.findIndex(i => i.id == this.currentRound.id)].hasAttended = true;

    // refresh current component with new route parameters
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    //   this.router.navigate(['tournament', 'challenge', this.tournamentId, this.nextRound?.id]));

    this.router.navigate(['tournament', 'challenge', this.tournamentId, this.nextRound?.id, { prev: this.currentRound.id }], { skipLocationChange: true })
      .then(_ => {
        this.tournamentService.startRound(this.nextRound?.id as number)
          .subscribe(newRound => {

            this.currentRound = newRound.value;
            this.currentQuestion = this.questions[0];

            this.gettingNewRound = false;

            this.answers = [];

            this.toNextQuestion();
          });

      });
  }

  timeUp(): void {
    this.isTimeExpired = true;
    this.acceptAnswer();
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

  closeModal(): void {

    this.scores = undefined;

    this.roundCompleteModal.hide()
    this.timer.start();

  }

}

