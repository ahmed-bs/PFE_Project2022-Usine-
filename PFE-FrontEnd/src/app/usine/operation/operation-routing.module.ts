import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { DetailsOperationComponent } from './details-operation/details-operation.component';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { OperationComponent } from './operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { ListeOperationRetraitComponent } from './liste-operation-retrait/liste-operation-retrait.component';


const routes: Routes = [
  { path: '', component: OperationComponent },
  { path: 'listeOperation', component: ListeOperationComponent },
  { path: 'addOperation', component: CreateOperationComponent  },
  { path: 'addOperationR', component: CreateOperationComponent  },
  { path: 'detailsOperation/:id', component: DetailsOperationComponent   },
  { path: 'updateOperation/:id', component: UpdateOperationComponent  },

  { path: 'listeOperationRetrait', component:     ListeOperationRetraitComponent  },
  // { path: 'listeOperationTank', component: ListeOperationTankComponent },

  { path:'',redirectTo:'/operation',pathMatch:'full'},
  // {  path:'**', component: OperationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
