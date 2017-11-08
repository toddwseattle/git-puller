import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { GhReporgService } from './core/gh-reporg.service';
import { Observable } from 'rxjs/Observable';
import { IghOrg } from './core/ghobjects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  orgs$: Observable<IghOrg[]> = Observable.of(null);
  constructor(public auth: AuthService, public ghs: GhReporgService) {
  }

  doLogin() {
    this.auth.githubLogin();

  }


}
