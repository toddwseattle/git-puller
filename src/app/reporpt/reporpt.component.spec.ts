import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporptComponent } from './reporpt.component';

describe('ReporptComponent', () => {
  let component: ReporptComponent;
  let fixture: ComponentFixture<ReporptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
