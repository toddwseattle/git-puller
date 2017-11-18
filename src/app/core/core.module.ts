import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { GhReporgService } from './gh-reporg.service';
import { DashService } from './dash.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [],
  providers: [AuthService, DashService, GhReporgService]
})
export class CoreModule { }
