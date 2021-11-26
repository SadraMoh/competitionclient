import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentLayoutComponent } from './tournament-layout.component';

describe('TournamentLayoutComponent', () => {
  let component: TournamentLayoutComponent;
  let fixture: ComponentFixture<TournamentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
