import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentSecondGroupsComponent } from './tournament-second-groups.component';

describe('TournamentSecondGroupsComponent', () => {
  let component: TournamentSecondGroupsComponent;
  let fixture: ComponentFixture<TournamentSecondGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentSecondGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentSecondGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
