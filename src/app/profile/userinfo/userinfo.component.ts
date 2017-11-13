import { Input, Component, OnInit, OnDestroy } from '@angular/core';
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
 @Input() user: IUser;
  orgs$: Observable<IghOrg[]> = Observable.of<IghOrg[]>(null);
  constructor(public auth: AuthService, public ghs: GhReporgService) {
  }

  ngOnInit() {
      this.orgs$ = this.ghs.GetOrgs();
  }

}
