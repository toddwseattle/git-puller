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
/**
 * GhReporgService - Service to access gh repo with a user
 */
@Injectable()
export class GhReporgService {

  private user: Observable<IUser>;
  private token: string = null; // github token
  private GITAPI = 'https://api.github.com';
  private accept= new HttpHeaders({'accept' : 'application/json'});

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
}
