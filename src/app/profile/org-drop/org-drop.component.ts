import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { GhReporgService } from '../../core/gh-reporg.service';
import { AuthService } from '../../core/auth.service';
import { IghOrg } from '../../core/ghobjects';
import { IUser, IGHUser, User } from '../../core/user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-org-drop',
  templateUrl: './org-drop.component.html',
  styleUrls: ['./org-drop.component.css']
})
export class OrgDropComponent implements OnInit, OnDestroy {
  @Input() orgs: Observable<IghOrg[]>;
  public userNorg: Observable<IghOrg[]>;
  @Output() selectedOrg = new EventEmitter<IghOrg>();
  public orgPick: IghOrg = null;
  private userSub: Subscription;
  public user: User;
  constructor(public ghrs: GhReporgService, public as: AuthService) {
    this.userSub = this.as.user.subscribe( u => {
      this.user = new User(u);
      console.log('org drop user loaded');
      this.userNorg = this.orgs.map( o => {
        o.push(this.user.toOrg());
        return(o);
      });
    });
  }
  ngOnInit() {
  }

  orgSelSubmit(o: any) {
    console.log(JSON.stringify(o.value));

    this.selectedOrg.emit( (o.value.orgfree && (o.value.orgfree !== '')) ? o.value.orgfree : o.value.orgpick.login);
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
