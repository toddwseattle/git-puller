import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../core/auth.service';
import { GhReporgService } from '../core/gh-reporg.service';
import { IghOrg, IghRepo } from '../core/ghobjects';
import { IUser, IGHUser } from '../core/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser = null;
  private usersub: Subscription;
  orgs$: Observable<IghOrg[]> = Observable.of<IghOrg[]>(null);
  repos$: Observable<IghRepo[]> = Observable.of<IghRepo[]>(null);
  constructor(public auth: AuthService, public ghs: GhReporgService) {
    this.usersub = this.auth.user.subscribe( u => {
      this.user = u;
      this.orgs$ = this.ghs.GetOrgs();
      this.repos$ = this.ghs.GetRepos(u.ghUser.login);
      console.log('profile: usr loaded');
    });
  }

  ngOnInit() {
   //  this.orgs$.subscribe( o => { o.forEach( (r: IghOrg) =>{ console.log('org: %s', r.login); }); });
   console.log('profile: init run');
  }

  OnDestroy() {
    this.usersub.unsubscribe();
  }
  selectedOrg(o: IghOrg) {
    console.log(o.login);
    this.repos$ = this.ghs.GetRepos(o.login);
  }
}
