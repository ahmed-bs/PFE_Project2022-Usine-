import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentreCollecteComponent } from './centre-collecte.component';
import { CreateCentreCollecteComponent } from './create-centre-collecte/create-centre-collecte.component';
import { DetailsCentreCollecteComponent } from './details-centre-collecte/details-centre-collecte.component';
import { ListeCentreCollecteComponent } from './liste-centre-collecte/liste-centre-collecte.component';
import { UpdateCentreCollecteComponent } from './update-centre-collecte/update-centre-collecte.component';

const routes: Routes = [
  { path: '', component: CentreCollecteComponent },
  { path: 'listeCentreCollecte', component: ListeCentreCollecteComponent },
  { path: 'addCentreCollecte', component: CreateCentreCollecteComponent  },
  { path: 'detailsCentreCollecte/:id', component: DetailsCentreCollecteComponent   },
  { path: 'updateCentreCollecte/:id', component: UpdateCentreCollecteComponent  },
  { path:'',redirectTo:'/centreCollecte',pathMatch:'full'},
  // {  path:'**', component: CentreCollecteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentreCollecteRoutingModule { }
