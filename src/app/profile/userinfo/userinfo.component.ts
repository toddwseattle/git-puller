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
  constructor(public auth: AuthService, public ghs: GhReporgService) {
    console.log('userinfo loaded');
  }

  ngOnInit() {
    console.log('userinfo initialized');
  }

}
