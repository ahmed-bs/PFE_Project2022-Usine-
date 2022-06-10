import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { DetailsOperationComponent } from './details-operation/details-operation.component';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
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
import { DetailsOperationRetraitComponent } from './details-operation-retrait/details-operation-retrait.component';
import { ListeOperationTransformationComponent } from './liste-operation-transformation/liste-operation-transformation.component';
import { CreateOperationTransformationComponent } from './create-operation-transformation/create-operation-transformation.component';
import { DetailsOperationTransformationComponent } from './details-operation-transformation/details-operation-transformation.component';
import { ListeOperationTankComponent } from './liste-operation-tank/liste-operation-tank.component';
import { DetailsOperationTankComponent } from './details-operation-tank/details-operation-tank.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatTableExporterModule } from 'mat-table-exporter';
import { QRCodeModule } from 'angularx-qrcode';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    DetailsOperationComponent,
    ListeOperationComponent,
    CreateOperationComponent,
    UpdateOperationComponent,
    ListeOperationRetraitComponent,
    CreateOperationRetraitComponent,
    DetailsOperationRetraitComponent,
    ListeOperationTransformationComponent,
    CreateOperationTransformationComponent,
    DetailsOperationTransformationComponent,
    ListeOperationTankComponent,
    DetailsOperationTankComponent,
  ],
  imports: [
    QRCodeModule,
    CommonModule,
    OperationRoutingModule,
    MatTableExporterModule,
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
        deps: [HttpClient],
      },
    }),
  ],
})
export class OperationModule {}
