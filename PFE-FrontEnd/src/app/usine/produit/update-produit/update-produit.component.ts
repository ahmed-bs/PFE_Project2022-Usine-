import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Produit } from 'src/app/Models/produit';
import { ProduitService } from 'src/app/Services/produit.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {

  produit:Produit=new Produit();
  myForm!:FormGroup;
  CheckesCompetance:boolean=false;

  constructor(
    private router:Router,
    private dialogClose: MatDialog,
    private produitService:ProduitService,


  ) { }

  ngOnInit(): void {
   
    this.ValidatedForm();
    this.produitService.getProduit(JSON.parse(localStorage.getItem('IdP') || '[]') || []).subscribe(o =>{
      this.produit = o;
      console.log(this.produit);
    });

  }

  updateProduit(){
    if(this.myForm.get('intitule')?.value!=null && this.myForm.get('libelle')?.value!=null 
    && this.myForm.get('intitule')?.value.length>=3 && this.myForm.get('libelle')?.value.length>=8 ){
    this.produitService
        .updateProduit(this.produit.idProduit,this.produit)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Produit modifié avec succes ! "]));
          // window.location.reload();
          console.log(this.produit);
          this.onClose();
        },
        (error) => {
          console.log("Failed")
        }
      );
  }
}

  ValidatedForm(){
    this.myForm = new FormGroup({
      'intitule' : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      'libelle' : new FormControl(null,[Validators.required,Validators.minLength(8)]),
      });
 }


 get intitule(){
  return this.myForm.get('intitule') ;
}

get libelle(){
  return this.myForm.get('libelle') ;
}

onReload(){
  this.router.navigate([this.router.url]);
}


onClose() {
  this.dialogClose.closeAll();
  // this.gotoList();
  this.onReload();
}

}
