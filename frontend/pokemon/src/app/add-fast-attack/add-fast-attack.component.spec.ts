import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFastAttackComponent } from './add-fast-attack.component';

describe('AddFastAttackComponent', () => {
  let component: AddFastAttackComponent;
  let fixture: ComponentFixture<AddFastAttackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFastAttackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFastAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
