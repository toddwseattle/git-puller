import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ProfileComponent } from './profile.component';
import { MatDesignModule } from '../matdesign.module';
import { RepoListComponent } from './repo-list/repo-list.component';
import { OrgDropComponent } from './org-drop/org-drop.component';
@NgModule({
  imports: [
    CommonModule,
    MatDesignModule
  ],
  declarations: [UserinfoComponent, ProfileComponent, RepoListComponent, OrgDropComponent]
})
export class ProfileModule { }
