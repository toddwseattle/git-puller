import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule, MatIconModule, MatButtonModule,
  MatCardModule, MatTableModule, MatSortModule,
  MatSelectModule, MatSelect, MatInputModule, MatCheckboxModule } from '@angular/material';
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
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    FlexLayoutModule,
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
    MatCheckboxModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule
  ]
})
export class MatDesignModule { }
