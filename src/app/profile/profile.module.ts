import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ProfileComponent } from './profile.component';
import { MatDesignModule } from '../matdesign.module';
@NgModule({
  imports: [
    CommonModule,
    MatDesignModule
  ],
  declarations: [UserinfoComponent, ProfileComponent]
})
export class ProfileModule { }
