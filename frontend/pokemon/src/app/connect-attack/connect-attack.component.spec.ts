import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectAttackComponent } from './connect-attack.component';

describe('ConnectAttackComponent', () => {
  let component: ConnectAttackComponent;
  let fixture: ComponentFixture<ConnectAttackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectAttackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
