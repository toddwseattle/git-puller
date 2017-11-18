import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { IUser, IGHUser, User } from './user';
import { IghOrg, IghRepo, IghRepoOwner } from './ghobjects';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
/**
 * DashService - Dashboard service for mangaging configs in Firestore
 */
@Injectable()
export class DashService {

  private _favRepos: IghRepo[] = [];

  constructor(private auth: AuthService, private afs: AngularFirestore,
    private route: Router) { }
  public AddRepoFav(repo: IghRepo) {
    if (!this._favRepos.find(value => (value.name === repo.name))) {
      this._favRepos.push(repo);
    }
  }
  public GetRepoFavs(query?: string): Observable<IghRepo[]> {
    if (!query) {
      return Observable.of(this._favRepos);
    } else {
      const _queried: IghRepo[] = [];
      this._favRepos.forEach( r => {
        if (r.name.includes(query)) {
          _queried.push(r);
        }
      });
      return Observable.of(_queried);
    }
  }

}
