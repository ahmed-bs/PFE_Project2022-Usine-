import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Produit } from 'src/app/Models/produit';
import { ProduitService } from 'src/app/Services/produit.service';

@Component({
  selector: 'app-create-produit',
  templateUrl: './create-produit.component.html',
  styleUrls: ['./create-produit.component.css']
})
export class CreateProduitComponent implements OnInit {

  produit:Produit = new Produit();
  submitted = false;
  myForm!:FormGroup;
  msg="";

  constructor(private produitService: ProduitService,
    private router: Router, private dialogClose: MatDialog,) { }

  ngOnInit() {
    this.ValidatedForm();
  }

  newEmployee(): void {
    this.submitted = false;
    this.produit = new Produit();
  }


  save() {

    if(this.myForm.get('intitule')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }

     if(this.myForm.get('libelle')?.value==null){
      this.msg="vous devez remplir le formulaire !!";
     }
     else{
      this.msg="";
     }


     
     if(this.myForm.get('intitule')?.value!=null && this.myForm.get('libelle')?.value!=null){
    console.log(this.produit);
    this.produit.idProduit = 1;
    this.produitService
        .createProduit(this.produit)
        .subscribe(o=>{
          localStorage.setItem('Toast', JSON.stringify(["Success","Un produit a été ajouté avec succès"]));   
          // window.location.reload();
          this.onClose();
          console.log(this.produit);
        });
    }
  }


  onSubmit() {
    this.submitted = true;
    this.save();

  }

  gotoList() {
    this.router.navigate(['agriculteur/produit/listeProduit']);
  }


  onReload(){
    this.router.navigate([this.router.url]);
  }
  
  
  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
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


}

