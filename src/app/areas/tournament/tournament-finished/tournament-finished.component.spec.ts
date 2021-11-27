import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentFinishedComponent } from './tournament-finished.component';

describe('TournamentFinishedComponent', () => {
  let component: TournamentFinishedComponent;
  let fixture: ComponentFixture<TournamentFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
