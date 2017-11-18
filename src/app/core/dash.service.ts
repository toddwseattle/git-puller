import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { IUser, IGHUser, User } from './user';
import { IghOrg, IghRepo, IghRepoOwner } from './ghobjects';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
/**
 * DashService - Dashboard service for mangaging configs in Firestore
 */
@Injectable()
export class DashService {

  private _favRepos: IghRepo[] = [];
  private _favReposSubject: Subject<IghRepo[]>;

  constructor(private auth: AuthService, private afs: AngularFirestore,
    private route: Router) {
      this._favReposSubject = new Subject<IghRepo[]>();
     }
  public AddRepoFav(repo: IghRepo) {
    if (!this._favRepos.find(value => (value.name === repo.name))) {
      this._favRepos.push(repo);
      this._favReposSubject.next(this._favRepos);
    }
  }
  public ClearRepos() {
    this._favRepos = [];
    this._favReposSubject.next(this._favRepos);
  }
  public GetRepoFavs(query?: string): Observable<IghRepo[]> {
    if (!query) {
      return this._favReposSubject;
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
