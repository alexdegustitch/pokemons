import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentSemifinalsComponent } from './tournament-semifinals.component';

describe('TournamentSemifinalsComponent', () => {
  let component: TournamentSemifinalsComponent;
  let fixture: ComponentFixture<TournamentSemifinalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentSemifinalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentSemifinalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
