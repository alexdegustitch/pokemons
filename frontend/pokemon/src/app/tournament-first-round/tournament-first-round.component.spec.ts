import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentFirstRoundComponent } from './tournament-first-round.component';

describe('TournamentFirstRoundComponent', () => {
  let component: TournamentFirstRoundComponent;
  let fixture: ComponentFixture<TournamentFirstRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentFirstRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentFirstRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
