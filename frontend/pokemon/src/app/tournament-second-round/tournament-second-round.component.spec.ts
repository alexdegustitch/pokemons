import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentSecondRoundComponent } from './tournament-second-round.component';

describe('TournamentSecondRoundComponent', () => {
  let component: TournamentSecondRoundComponent;
  let fixture: ComponentFixture<TournamentSecondRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentSecondRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentSecondRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
