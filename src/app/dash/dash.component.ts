import { Component, OnInit } from '@angular/core';
import { DashService } from '../core/dash.service';
import { IDash } from '../core/dashobjects';
import { IghRepo } from '../core/ghobjects';
import 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  DashRepos: Observable<IghRepo[]> = Observable.of([]);
  constructor(private ds: DashService) { }

  ngOnInit() {
    this.DashRepos = this.ds.GetRepoFavs();
  }

}
