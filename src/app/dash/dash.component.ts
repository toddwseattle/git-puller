import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashService } from '../core/dash.service';
import { GhReporgService } from '../core/gh-reporg.service';

import { IDash } from '../core/dashobjects';
import { IghRepo } from '../core/ghobjects';
import 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit, OnDestroy {
  DashRepos: Observable<IghRepo[]> = Observable.of([]);
  private _favssub: Subscription;
  constructor(private ds: DashService, private ghrs: GhReporgService) {
    this._favssub = this.ds.GetRepoFavs().subscribe(rs =>{
      this.DashRepos = this.ghrs.GetUpdatedRepos(rs);
    });
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    this._favssub.unsubscribe();
  }

}
