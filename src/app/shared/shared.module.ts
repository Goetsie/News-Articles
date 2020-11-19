import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatTooltipModule } from '@angular/material/tooltip';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    DragDropModule,
    MatTooltipModule,
    RouterModule,
    MatBadgeModule
  ], exports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    DragDropModule,
    MatTooltipModule,
    RouterModule,
    MatBadgeModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'nl-BE' },
  ],
})
export class SharedModule { }
