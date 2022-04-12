import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsineComponent } from './usine.component';



const routes: Routes = [
  {
    path: '', component: UsineComponent, children: [
       { path: 'centreCollecte',loadChildren: () => import('./centre-collecte/centre-collecte.module').then(m => m.CentreCollecteModule)},
       { path: 'operation', loadChildren: () => import('./operation/operation.module').then(m => m.OperationModule) },
       { path: 'magasin', loadChildren: () => import('./magasin/magasin.module').then(m => m.MagasinModule) },
       { path: 'tank', loadChildren: () => import('./tank/tank.module').then(m => m.TankModule) },
       { path: 'lot', loadChildren: () => import('./lot/lot.module').then(m => m.LotModule) },
       { path: 'produit', loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule) },
       { path: 'dashboard', component: DashboardComponent },
      // { path: '**', component: NotFoundComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsineRoutingModule { }
