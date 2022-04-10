import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { DetailsOperationComponent } from './details-operation/details-operation.component';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';

import { HttpClientModule } from '@angular/common/http';

// import { HttpClientModule } from '@angular/common/http';
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
import { ListeOperationRetraitComponent } from './liste-operation-retrait/liste-operation-retrait.component';
import { CreateOperationRetraitComponent } from './create-operation-retrait/create-operation-retrait.component';

@NgModule({
  declarations: [
    DetailsOperationComponent,
    ListeOperationComponent,
    CreateOperationComponent,
    UpdateOperationComponent,
    ListeOperationRetraitComponent,
    CreateOperationRetraitComponent
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,

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
export class OperationModule { }
