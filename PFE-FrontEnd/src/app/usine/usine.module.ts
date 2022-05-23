import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsineRoutingModule } from './usine-routing.module';
import { OperationComponent } from './operation/operation.component';
import { TankComponent } from './tank/tank.component';
import { MagasinComponent } from './magasin/magasin.component';
import { CentreCollecteComponent } from './centre-collecte/centre-collecte.component';
import { LotComponent } from './lot/lot.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScaleLinear, ScalePoint, ScaleTime,ScaleBand } from 'd3-scale';
import { UsineComponent } from './usine.component';
import { ProduitComponent } from './produit/produit.component';
import { MatTableExporterModule } from 'mat-table-exporter';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    UsineComponent,
    OperationComponent,
    TankComponent,
    MagasinComponent,
    CentreCollecteComponent,
    LotComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    ProduitComponent
  ],
  imports: [
    MatTableModule,
    MatTableExporterModule,
    CommonModule,
    UsineRoutingModule,
    NgxChartsModule,
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
export class UsineModule { }
