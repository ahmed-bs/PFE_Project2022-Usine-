import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Produit } from 'src/app/Models/produit';
import { ProduitService } from 'src/app/Services/produit.service';


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

    this.produitService
        .updateProduit(this.produit.idProduit,this.produit)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Produit modifié avec succes ! "]));
          window.location.reload();
          console.log(this.produit);
        },
        (error) => {
          console.log("Failed")
        }
      );
  }

  ValidatedForm(){
    this.myForm = new FormGroup({
      'intitule' : new FormControl(null,[Validators.required,]),
      'libelle' : new FormControl(null,[Validators.required, ]),
 
      });
 }


 get intitule(){
  return this.myForm.get('intitule') ;
}

get libelle(){
  return this.myForm.get('libelle') ;
}

  onClose() {
    this.dialogClose.closeAll();
  }

}
