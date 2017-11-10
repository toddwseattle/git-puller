import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';


import { IUser } from './user';
import { IghOrg, IghRepo, IghRepoOwner } from './ghobjects';
import { AuthService } from './auth.service';

interface GhLink {
  link: string;
  rel: string;
  page: number;
}
// example header
// "<https://api.github.com/user/repos?access_token=181ebe71c08918a4d6dc72573f56971f05e931b7&page=2>; rel="next",
//  <https://api.github.com/user/repos?access_token=181ebe71c08918a4d6dc72573f56971f05e931b7&page=4>; rel="last""
class GhLinks {
  public links: GhLink[] = [];
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
  processRaw(raw): GhLink[] {
    const templink: GhLink[] = [];
    const rawsplit = raw.split(',');
    rawsplit.forEach( value => {
      const linksplit = value.split(';');
      const linkindex = linksplit[0].indexOf('<') + 1;
      const lnk: string = linksplit[0].slice(linkindex, linksplit[0].length - 1);
      let rl = (linksplit[1].split('='))[1];
      rl = rl.slice(1, rl.length - 1);
      const pge = parseInt(this.getParameterByName('page', lnk), 10);
      const gh = {link: lnk, rel: rl, page: pge};
      templink.push(gh);
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
  private GITAPI = 'https://api.github.com';
  private accept= new HttpHeaders({'accept' : 'application/json'});
  public linkheaders: GhLinks;

  constructor(private http: HttpClient, private as: AuthService) {
    this.user = this.as.user;
    this.user.subscribe( (u: IUser) => {
      if ( (u != null) && (u.ghAccessToken != null) ) {
        this.token = u.ghAccessToken;
      } else {
        this.token = null;
      }
    });
   }

  public GetOrgs(OrgUser?: string): Observable<IghOrg[]>  {
    const CURUSERORGS = '/user/orgs';
    const USERORGS = `/users/${OrgUser}/orgs`;
    let command = this.GITAPI;
    command += (OrgUser == null) ?  CURUSERORGS  : USERORGS;
    return this.http.get<IghOrg[]>(command,  {headers: this.accept, params: {'access_token': this.token}});

  }

  public GetRepos(OrgUser?: string): Observable<IghRepo[]> {
    const CURUSERREPOS = '/user/repos';
    const USERREPOS = `/users/${OrgUser}/repos`;
    let command = this.GITAPI;
    command += (OrgUser == null) ?  CURUSERREPOS  : USERREPOS;
    const pars: HttpParams = new HttpParams().set('access_token', this.token);
    pars.set('per_page', '100');
    return this.http.get<IghRepo[]>(command,  {observe: 'response', headers: this.accept, params: pars})
      .switchMap(resp => {
        this.linkheaders = new GhLinks(resp.headers.get('Link'));
        console.log(resp.headers.get('Link'));
        return Observable.of<IghRepo[]>(resp.body);
      });
  }
}
