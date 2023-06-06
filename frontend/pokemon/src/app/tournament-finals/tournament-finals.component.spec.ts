import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentFinalsComponent } from './tournament-finals.component';

describe('TournamentFinalsComponent', () => {
  let component: TournamentFinalsComponent;
  let fixture: ComponentFixture<TournamentFinalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentFinalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentFinalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
