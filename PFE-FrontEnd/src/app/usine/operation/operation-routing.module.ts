import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOperationComponent } from './create-operation/create-operation.component';
import { DetailsOperationComponent } from './details-operation/details-operation.component';
import { ListeOperationComponent } from './liste-operation/liste-operation.component';
import { OperationComponent } from './operation.component';
import { UpdateOperationComponent } from './update-operation/update-operation.component';
import { ListeOperationRetraitComponent } from './liste-operation-retrait/liste-operation-retrait.component';
import { DetailsOperationRetraitComponent } from './details-operation-retrait/details-operation-retrait.component';
import { DetailsOperationTransformationComponent } from './details-operation-transformation/details-operation-transformation.component';
import { ListeOperationTransformationComponent } from './liste-operation-transformation/liste-operation-transformation.component';
import { CreateOperationTransformationComponent } from './create-operation-transformation/create-operation-transformation.component';
import { ListeOperationTankComponent } from './liste-operation-tank/liste-operation-tank.component';


const routes: Routes = [
  { path: '', component: OperationComponent },
  { path: 'listeOperation', component: ListeOperationComponent },
  { path: 'listeOperationT', component: ListeOperationTransformationComponent },
  { path: 'addOperation', component: CreateOperationComponent  },
  { path: 'addOperationR', component: CreateOperationComponent  },
  { path: 'addOperationT', component: CreateOperationTransformationComponent  },
  { path: 'detailsOperation/:id', component: DetailsOperationComponent   },
  { path: 'detailsOperationRetrait/:id', component: DetailsOperationRetraitComponent   },
  { path: 'detailsOperationTransfomation/:id', component: DetailsOperationTransformationComponent   },
  { path: 'updateOperation/:id', component: UpdateOperationComponent  },
  { path: 'listeOperationRetrait', component:     ListeOperationRetraitComponent  },
  { path: 'listeOperationTank', component: ListeOperationTankComponent },

  { path:'',redirectTo:'/operation',pathMatch:'full'},
  // {  path:'**', component: OperationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
