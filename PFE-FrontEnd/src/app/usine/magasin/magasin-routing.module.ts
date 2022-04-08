import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMagasinComponent } from './create-magasin/create-magasin.component';
import { DetailsMagasinComponent } from './details-magasin/details-magasin.component';
import { ListeMagasinComponent } from './liste-magasin/liste-magasin.component';
import { MagasinComponent } from './magasin.component';
import { UpdateMagasinComponent } from './update-magasin/update-magasin.component';

const routes: Routes = [
  { path: '', component: MagasinComponent },
  { path: 'listeMagasin', component: ListeMagasinComponent },
  { path: 'addMagasin', component: CreateMagasinComponent  },
  { path: 'detailsMagasin/:id', component: DetailsMagasinComponent   },
  { path: 'updateMagasin/:id', component: UpdateMagasinComponent  },
  { path:'',redirectTo:'/magasin',pathMatch:'full'},
  // {  path:'**', component: MagasinComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagasinRoutingModule { }
