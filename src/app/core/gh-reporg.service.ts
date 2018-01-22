import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';


import { IUser } from './user';
import { IghOrg, IghRepo, IghRepoOwner } from './ghobjects';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';

interface GhLink {
  link: string;
  page: number;
}

interface  LinksMap {
  [key: string]: GhLink;
}

// example header
// "<https://api.github.com/user/repos?access_token=181ebe71c08918a4d6dc72573f56971f05e931b7&page=2>; rel="next",
//  <https://api.github.com/user/repos?access_token=181ebe71c08918a4d6dc72573f56971f05e931b7&page=4>; rel="last""
class GhLinks {
  public links: LinksMap = {};
  constructor(public raw?: string) {
    if (raw) {
      this.links = this.processRaw(raw);
    }
  }

  // see:  https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  private getParameterByName(name: string, url: string): string {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  processRaw(raw): LinksMap {
    const templink: LinksMap = {};
    const rawsplit = raw.split(',');
    rawsplit.forEach( value => {
      const linksplit = value.split(';');
      const linkindex = linksplit[0].indexOf('<') + 1;
      const lnk: string = linksplit[0].slice(linkindex, linksplit[0].length - 1);
      let rl = (linksplit[1].split('='))[1];
      rl = rl.slice(1, rl.length - 1);
      const pge = parseInt(this.getParameterByName('page', lnk), 10);
      const gh = {link: lnk,  page: pge};
      templink[rl] = gh;
    });
    return(templink);
  }
}

/**
 * GhReporgService - Service to access gh repo with a user
 */
@Injectable()
export class GhReporgService {

  private user: Observable<IUser>;
  private token: string = null; // github token
  private userName: string = null; // github username
  private GITAPI = 'https://api.github.com';
  private jsonheader = new HttpHeaders({'accept' : 'application/json'});
  public linkheaders: GhLinks;

  constructor(private http: HttpClient, private as: AuthService) {
    this.user = this.as.user;
   }
  private setTokenUserName(u: IUser) {
    if ( (u != null) && (u.ghAccessToken != null) ) {
      this.token = u.ghAccessToken;
      this.userName = u.ghUser.login;
    } else {
      this.token = null;
    }
  }
  public GetOrgs(OrgUser?: string): Observable<IghOrg[]>  {
    const CURUSERORGS = '/user/orgs';
    const USERORGS = `/users/${OrgUser}/orgs`;
    let command = this.GITAPI;
    command += ((OrgUser == null) || (OrgUser === this.userName)) ?  CURUSERORGS  : USERORGS;
      return this.user.switchMap(u => {
        this.setTokenUserName(u);
        if (this.token) {
          return this.http.get<IghOrg[]>(command,  {headers: this.jsonheader, params: {'access_token': this.token}});
        } else {
          return Observable.of<IghOrg[]>(null);
        }
      });

  }
  private setDefaultParams(): HttpParams {
    const pars = new HttpParams().set('per_page', '100');
    return(pars);
  }
  public GetRepos(OrgUser?: string): Observable<IghRepo[]> {
    const CURUSERREPOS = '/user/repos';
    const USERREPOS = `/users/${OrgUser}/repos`;
    let command = this.GITAPI;
    command += ((!OrgUser) || (OrgUser = this.userName)) ?  CURUSERREPOS  : USERREPOS;
    const pars = this.setDefaultParams();  // .append('visibility', 'private');
    const hddrs = this.jsonheader.append('Authorization', 'token ' + this.token);
    return this.http.get<IghRepo[]>(command,  {observe: 'response', headers: hddrs, params: pars})
    .mergeMap(resp => {
        this.linkheaders = new GhLinks(resp.headers.get('Link'));
        const nextlink = this.linkheaders.links['next'] ? this.linkheaders.links['next'].link : '';
        const lastlink = this.linkheaders.links['last'] ? this.linkheaders.links['last'].link : '';
        const lastpage = this.linkheaders.links['last'] ? this.linkheaders.links['last'].page : 0;
        const nextpage = this.linkheaders.links['next'] ? this.linkheaders.links['next'].page : 0;
        const pagesGets: Observable<IghRepo[]>[] = [];

        if ((lastpage > 0) && (lastpage >= nextpage)) {
          for (let curpage = nextpage; curpage <= lastpage; curpage++) {
          const prs = this.setDefaultParams().append('page', curpage.toString());
          pagesGets.push(this.http.get<IghRepo[]>(command,  { headers: hddrs, params: prs}));
          }
        }
        return(Observable.forkJoin(Observable.of<IghRepo[]>(resp.body), ...pagesGets)
              .flatMap((value: IghRepo[][]) => {
                  const foo: IghRepo[] = [];
                  return(Observable.of(foo.concat(...value)));
              }));
      });
    }
    GetUpdatedRepos(repos: IghRepo[]): Observable<IghRepo[]> {
      if (!repos) {
        return Observable.of(null);
      } else {
        return this.user.switchMap(u => {
          this.setTokenUserName(u);
          if (this.token) {
            const hddrs = this.jsonheader.append('Authorization', 'token ' + this.token);
            return Observable.from(repos)
              .mergeMap(r => <Observable<IghRepo>> this.http.get(r.url, {headers: hddrs}))
              .scan((rs, r) => rs.concat(r), []);
          } else {
            return Observable.of(null);
          }
        });
      }
    }
    GetRepo(loginname: string, repo: string): Observable<IghRepo> {
      if (!loginname || !repo) {
        return Observable.of(null);
      } else {
        return this.user.switchMap(u => {
        this.setTokenUserName(u);
        if (this.token) {
          const command = this.GITAPI + '/repos/' + loginname + '/' + repo;
          const hddrs = this.jsonheader.append('Authorization', 'token ' + this.token);
          return this.http.get<IghRepo>(command, {headers: hddrs});
        } else {
          return Observable.of(null);
        }
        });
      }
    }
}
