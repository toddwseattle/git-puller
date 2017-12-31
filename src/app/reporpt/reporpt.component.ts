import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { GhReporgService } from '../core/gh-reporg.service';
import { GhIssuesService } from '../core/gh-issues.service';
import { IghRepo, IghIssue, IghRepoOwner, IghLabel, IghMilestone } from '../core/ghobjects';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reporpt',
  templateUrl: './reporpt.component.html',
  styleUrls: ['./reporpt.component.css']
})
export class ReporptComponent implements OnInit {
  loginName = '';
  repo = '' ;
  ghRepo: IghRepo;
  $ghRepo: Observable<IghRepo>;
  $ghWeekIssues: Observable<IghIssue[]> = Observable.of([]);

  constructor(private router: Router, private route: ActivatedRoute,
              private grs: GhReporgService, private gis: GhIssuesService,
              private as: AuthService  ) {
      this.as.githubLogin();
   }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.loginName = params['name'];
      this.repo = params['repo'];
      this.$ghRepo = this.grs.GetRepo(this.loginName, this.repo);
      this.$ghRepo.subscribe(ghr => {
        this.ghRepo = ghr;
      });
    });
  }

  getLastWeekIssues() {
    if (this.ghRepo) {
      this.$ghWeekIssues = this.gis.getLastWeekIssues(this.ghRepo);
    }
  }

}
