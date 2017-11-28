import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { IUser, IGHUser, User } from './user';
import { IghOrg, IghRepo, IghRepoOwner } from './ghobjects';
import { IDash } from './dashobjects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
/**
 * DashService - Dashboard service for mangaging configs in Firestore
 */
@Injectable()
export class DashService {
  private _usersub: Subscription;
  private _favRepos: IghRepo[] = [];
  private _lastupdate = 0;
  private _favReposSubject: Subject<IghRepo[]>;
  private _userdash: AngularFirestoreDocument<IDash>;
  private DASHPATH = 'dash/';

  constructor(private auth: AuthService, private afs: AngularFirestore,
    private route: Router) {
      this._usersub = auth.user.subscribe( (u: IUser) => {
        if (u) {
         this._userdash = afs.doc(this.DASHPATH + u.uid);
         this._userdash.valueChanges().subscribe((d: IDash) => {
                if (d) {
                    this._lastupdate = d.lastUpdate;
                    this._favRepos = d.favRepos;
                    this._favReposSubject.next(d.favRepos);
                  }
                    });
        } else {
         this._userdash = null;
        }
      });
      this._favReposSubject = new Subject<IghRepo[]>();

     }
  public AddRepoFav(repo: IghRepo) {
    if (!this._favRepos.find(value => (value.name === repo.name))) {
      this._favRepos.push(repo);
        this._userdash.set({
          lastUpdate: Date.now(),
          favRepos: this._favRepos
          });
         // this._favReposSubject.next(this._favRepos);
        }
  }
  public ClearRepos() {
    this._favRepos = [];
    this._userdash.set({
      lastUpdate: Date.now(),
      favRepos: this._favRepos
      });
    // this._favReposSubject.next(this._favRepos);
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
