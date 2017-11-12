import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../core/auth.service';
import { GhReporgService } from '../../core/gh-reporg.service';
import { IghOrg, IghRepo } from '../../core/ghobjects';
import { IUser, IGHUser } from '../../core/user';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  user: IUser = null;
  private usersub: Subscription;
  orgs$: Observable<IghOrg[]> = Observable.of<IghOrg[]>(null);
  repos$: Observable<IghRepo[]> = Observable.of(null);
  constructor(public auth: AuthService, public ghs: GhReporgService) {
  }

  ngOnInit() {
    this.usersub = this.auth.user.subscribe( u => {
      this.user = u;
      this.orgs$ = this.ghs.GetOrgs();
      this.repos$ = this.ghs.GetRepos(u.ghUser.login);
    });
  }

  OnDestroy() {
    this.usersub.unsubscribe();
  }

  getOrgs$() {
    this.orgs$ = this.ghs.GetOrgs();
    return(this.orgs$);
  }

  getRepos() {
    if (this.user != null) {
      this.repos$ = this.ghs.GetRepos(this.user.ghUser.login);
      return true;
    } else {
      return false;
    }
  }
}
