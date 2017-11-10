import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../core/auth.service';
import { GhReporgService } from '../../core/gh-reporg.service';
import { IghOrg, IghRepo } from '../../core/ghobjects';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  orgs$: Observable<IghOrg[]> = Observable.of(null);
  repos$: Observable<IghRepo[]> = Observable.of(null);
  constructor(public auth: AuthService, public ghs: GhReporgService) {
  }

  ngOnInit() {
    this.orgs$ = this.ghs.GetOrgs();
  }

  getOrgs() {
    this.orgs$ = this.ghs.GetOrgs();
  }

  getRepos() {
    this.repos$ = this.ghs.GetRepos();
  }
}
