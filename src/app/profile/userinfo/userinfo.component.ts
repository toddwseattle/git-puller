import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../core/auth.service';
import { GhReporgService } from '../../core/gh-reporg.service';
import { IghOrg } from '../../core/ghobjects';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  orgs$: Observable<IghOrg[]> = Observable.of(null);
  constructor(public auth: AuthService, public ghs: GhReporgService) {
  }

  ngOnInit() {
  }

  getOrgs() {
    this.orgs$ = this.ghs.GetOrgs();
  }
}
