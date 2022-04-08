import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLotComponent } from './create-lot/create-lot.component';
import { DetailsLotComponent } from './details-lot/details-lot.component';
import { ListeLotComponent } from './liste-lot/liste-lot.component';
import { LotComponent } from './lot.component';
import { UpdateLotComponent } from './update-lot/update-lot.component';

const routes: Routes = [
  { path: '', component: LotComponent },
  { path: 'listeLot', component: ListeLotComponent },
  { path: 'addLot', component: CreateLotComponent  },
  { path: 'detailsLot/:id', component: DetailsLotComponent   },
  { path: 'updateLot/:id', component: UpdateLotComponent  },
  { path:'',redirectTo:'/lot',pathMatch:'full'},
  // {  path:'**', component: LotComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotRoutingModule { }
