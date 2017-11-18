import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavRepoListComponent } from './fav-repo-list.component';

describe('FavRepoListComponent', () => {
  let component: FavRepoListComponent;
  let fixture: ComponentFixture<FavRepoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavRepoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavRepoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
