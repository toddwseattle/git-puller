import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatToolbarModule, MatIconModule, MatButtonModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';


import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app-routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
