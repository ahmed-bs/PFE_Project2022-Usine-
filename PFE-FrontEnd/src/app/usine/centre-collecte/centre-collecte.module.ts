import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CentreCollecteRoutingModule } from './centre-collecte-routing.module';
import { CreateCentreCollecteComponent } from './create-centre-collecte/create-centre-collecte.component';
import { ListeCentreCollecteComponent } from './liste-centre-collecte/liste-centre-collecte.component';
import { UpdateCentreCollecteComponent } from './update-centre-collecte/update-centre-collecte.component';
import { DetailsCentreCollecteComponent } from './details-centre-collecte/details-centre-collecte.component';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule} from "@angular/material/dialog";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// AddForPaginator
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
//add For Sorted
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CreateCentreCollecteComponent,
    ListeCentreCollecteComponent,
    UpdateCentreCollecteComponent,
    DetailsCentreCollecteComponent
  ],
  imports: [
    CommonModule,
    CentreCollecteRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
     //add For Sorted
     MatSortModule,
     // AddForPaginator
     MatPaginatorModule,
     MatFormFieldModule,
     MatInputModule,
     MatTableModule,
     MatSnackBarModule,
   
  ]
})
export class CentreCollecteModule { }
