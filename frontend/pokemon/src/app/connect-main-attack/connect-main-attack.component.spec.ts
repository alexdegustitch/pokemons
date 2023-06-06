import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectMainAttackComponent } from './connect-main-attack.component';

describe('ConnectMainAttackComponent', () => {
  let component: ConnectMainAttackComponent;
  let fixture: ComponentFixture<ConnectMainAttackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectMainAttackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectMainAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
