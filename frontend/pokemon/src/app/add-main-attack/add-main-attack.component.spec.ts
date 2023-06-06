import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMainAttackComponent } from './add-main-attack.component';

describe('AddMainAttackComponent', () => {
  let component: AddMainAttackComponent;
  let fixture: ComponentFixture<AddMainAttackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMainAttackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMainAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
