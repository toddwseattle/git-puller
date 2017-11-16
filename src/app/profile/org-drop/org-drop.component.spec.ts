import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgDropComponent } from './org-drop.component';

describe('OrgDropComponent', () => {
  let component: OrgDropComponent;
  let fixture: ComponentFixture<OrgDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
