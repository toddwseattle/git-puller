import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';


import { IUser } from './user';


@Injectable()
export class AuthService {
  public GitHubToken = '';
  public user: Observable<IUser>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

  this.user = this.afAuth.authState
          .switchMap( user => {
            if (user) {
              return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
            } else {
              return Observable.of(null);
            }
           });
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential);
      })
      .catch( err => {
        console.log('error on login: ' + err);
      });
  }

  private updateUserData(credential) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${credential.user.uid}`);

    const data: IUser = {
      uid: credential.user.uid,
      email: credential.user.email,
      photoUrl: credential.user.photoURL,
      displayName: credential.user.displayName,
      ghAccessToken: credential.credential.accessToken,
      ghUser: credential.additionalUserInfo.profile
    };

    return userRef.set(data);

  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

}
