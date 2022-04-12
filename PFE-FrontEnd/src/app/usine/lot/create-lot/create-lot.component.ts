import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Lot } from 'src/app/Models/lot';
import { Produit } from 'src/app/Models/produit';
import { LotService } from 'src/app/Services/lot.service';
import { ProduitService } from 'src/app/Services/produit.service';
import { Observable } from 'rxjs';
import { TankService } from 'src/app/Services/tank.service';
import { Tank } from 'src/app/Models/tank';


@Component({
  selector: 'app-create-lot',
  templateUrl: './create-lot.component.html',
  styleUrls: ['./create-lot.component.css']
})
export class CreateLotComponent implements OnInit {

  lot:Lot = new Lot();
  submitted = false;
  msg="";
  msgErreur=0;
  qteAct=0;
  produits!:Observable<Produit[]>;
  tanks!:Observable<Tank[]>;

  myForm=new  FormGroup({
      qte : new FormControl(null,[Validators.required]),
      produit : new FormControl(null,[Validators.required ]),
      tank : new FormControl(null,[Validators.required ]),
  })
  // produits!:Observable<Produit[]>;
  // produits!:Observable<produit[]>;
  // fournisseurs!:Observable<Fournisseur[]>;

  constructor(
     private lotService: LotService,
     private produitService:ProduitService,
     private tankService:TankService,
     private router: Router,
     private dialogClose: MatDialog,) { }

  ngOnInit() {
    this.produits=this.produitService.getProduits();
    this.tanks=this.tankService.getTanks();
  }

  newproduit(): void {
    this.submitted = false;
    this.lot = new Lot();
  }

  save() {

   if(this.myForm.get('produit')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
   }
   else{
    this.msg="";
   }

   if(this.myForm.get('description')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   if(this.myForm.get('qte')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   
   if(this.myForm.get('tank')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }


  if(this.myForm.get('produit')?.value!=null 
   && this.myForm.get('qte')?.value!=null && this.myForm.get('tank')?.value!=null ){
    this.lotService
        .createLot({
          "produit":{
            "idProduit":this.myForm.get('produit')?.value,
         },
         "tank":{
          "idTank":this.myForm.get('tank')?.value,
       },
           "qte":this.myForm.get('qte')?.value,
         
          // "poidActuel":this.myForm.get('poidActuel')?.value,
          // "etat":this.myForm.get('etat')?.value,
        })
        .subscribe(o=>{
          window.location.reload();
          console.log(this.lot);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un lot a été ajouté avec succès"]));
          window.location.reload();
        });
      }
    }


  onSubmit() {
        this.save();
  }

  gotoList() {
    this.router.navigate(['usine/Lot/listeLot']);
  }


  onClose() {
    this.dialogClose.closeAll();
    this.gotoList();
  }

 get produit(){
  return this.myForm.get('produit') ;
}

get description(){
  return this.myForm.get('description') ;
}

get qte(){
  return this.myForm.get('qte') ;
}

get tank(){
  return this.myForm.get('tank') ;
}

}
