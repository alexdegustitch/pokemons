import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentQuarterfinalsComponent } from './tournament-quarterfinals.component';

describe('TournamentQuarterfinalsComponent', () => {
  let component: TournamentQuarterfinalsComponent;
  let fixture: ComponentFixture<TournamentQuarterfinalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentQuarterfinalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentQuarterfinalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
