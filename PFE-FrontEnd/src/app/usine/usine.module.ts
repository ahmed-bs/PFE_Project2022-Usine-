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
    SidebarComponent
  ],
  imports: [
    CommonModule,
    UsineRoutingModule,
    NgxChartsModule,
    MatSnackBarModule,
  ]
})
export class UsineModule { }
