import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatTreeModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatTreeModule
  ]
})
export class MaterialMetaModule {
}
