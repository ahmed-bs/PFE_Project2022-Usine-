import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduitComponent } from './produit.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import { CreateProduitComponent } from './create-produit/create-produit.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';

const routes: Routes = [
  {  path: '', component: ProduitComponent,},
  { path: 'listeProduit', component: ListeProduitComponent },
  { path: 'addProduit', component: CreateProduitComponent  },
  { path: 'detailsProduit/:id', component: DetailsProduitComponent   },
  { path: 'updateProduit/:id', component: UpdateProduitComponent  },
  { path:'',redirectTo:'/Produit',pathMatch:'full'},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitRoutingModule { }
