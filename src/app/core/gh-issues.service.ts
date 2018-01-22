import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { IUser, IGHUser } from './user';
import 'rxjs/Observable';
import { IghRepo, IghIssue, IghMilestone, IghLabel } from './ghobjects';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class GhIssuesService {

  private user: Observable<IUser>;
  private GITAPI = 'https://api.github.com';
  private jsonheader = new HttpHeaders({'accept' : 'application/json'});

  constructor(private http: HttpClient, private as: AuthService) {
    this.user = this.as.user;
   }

  getLastWeekIssues(repo: IghRepo): Observable<IghIssue[]> {
    // need to get the issues ts; and get the issues
    //
    return this.user.switchMap((u: IUser) => {
      if (!u.ghAccessToken) {
        return(Observable.of(null));
      } else {
        const now = Date.now();
        const startdate = (new Date((now - (7 * 24 * 60 * 60 * 1000)))).toISOString();
        const rend = repo.issues_url.indexOf('{');
        const rUrl = repo.issues_url.slice(0, rend);
        const rh = new HttpHeaders({'Authorization' : 'token ' + u.ghAccessToken});
        const rp = new HttpParams().set('since', startdate).append('per_page', '100');
        return this.http.get<IghIssue[]>(rUrl, {headers: rh, params: rp});
      }
    });
  }


}
