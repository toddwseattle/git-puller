import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DashService } from '../../core/dash.service';
import { IghRepo, IghRepoOwner, IghOrg } from '../../core/ghobjects';

@Component({
  selector: 'app-fav-repo-list',
  templateUrl: './fav-repo-list.component.html',
  styleUrls: ['./fav-repo-list.component.css']
})
export class FavRepoListComponent implements OnInit {
  favRepos: Observable<IghRepo[]>;
  constructor(public dash: DashService) {
    this.favRepos = dash.GetRepoFavs();
   }

  ngOnInit() {
  }

  clearFavRepos() {
    this.dash.ClearRepos();
  }

}
