import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectFastAttackComponent } from './connect-fast-attack.component';

describe('ConnectFastAttackComponent', () => {
  let component: ConnectFastAttackComponent;
  let fixture: ComponentFixture<ConnectFastAttackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectFastAttackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectFastAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
