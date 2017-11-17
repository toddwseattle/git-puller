import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';


import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './app-routes';
import { AboutComponent } from './about/about.component';

import { MatDesignModule } from './matdesign.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ProfileModule,
    HttpClientModule,
    MatDesignModule,
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
