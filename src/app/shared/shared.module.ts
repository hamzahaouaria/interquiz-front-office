import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule  } from '@angular/material/table';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { NgApexchartsModule } from 'ng-apexcharts';





@NgModule({
  declarations: [],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckbox,
    MatRadioModule,
    MatLabel,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MtxGridModule,
    MtxButtonModule,
    NgApexchartsModule

  ],
  exports: [
    MatFormFieldModule,
    MatCardModule,
    MatCheckbox,
    MatRadioModule,
    MatInputModule,
    MatLabel,
    MatProgressSpinnerModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MtxGridModule,
    MtxButtonModule,
    NgApexchartsModule
  ]
})
export class SharedModule { }
