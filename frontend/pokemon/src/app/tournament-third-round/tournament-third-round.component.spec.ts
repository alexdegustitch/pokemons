import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentThirdRoundComponent } from './tournament-third-round.component';

describe('TournamentThirdRoundComponent', () => {
  let component: TournamentThirdRoundComponent;
  let fixture: ComponentFixture<TournamentThirdRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentThirdRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentThirdRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
