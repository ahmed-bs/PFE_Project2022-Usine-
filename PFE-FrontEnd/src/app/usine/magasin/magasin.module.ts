import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagasinRoutingModule } from './magasin-routing.module';
import { ListeMagasinComponent } from './liste-magasin/liste-magasin.component';
import { CreateMagasinComponent } from './create-magasin/create-magasin.component';
import { DetailsMagasinComponent } from './details-magasin/details-magasin.component';
import { UpdateMagasinComponent } from './update-magasin/update-magasin.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ListeMagasinComponent,
    CreateMagasinComponent,
    DetailsMagasinComponent,
    UpdateMagasinComponent
  ],
  imports: [
    CommonModule,
    MagasinRoutingModule,

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
     TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ]
})
export class MagasinModule { }
