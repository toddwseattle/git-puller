import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserinfoComponent, ProfileComponent]
})
export class ProfileModule { }
