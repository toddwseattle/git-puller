import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepotileComponent } from './repotile.component';

describe('RepotileComponent', () => {
  let component: RepotileComponent;
  let fixture: ComponentFixture<RepotileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepotileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepotileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
