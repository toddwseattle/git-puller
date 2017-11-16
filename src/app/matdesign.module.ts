import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatIconModule, MatButtonModule,
  MatCardModule, MatTableModule, MatSortModule, MatSelectModule, MatSelect } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    BrowserAnimationsModule
  ]
})
export class MatDesignModule { }
