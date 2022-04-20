import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Centre } from 'src/app/Models/centre';
import { CentreCollecteService } from 'src/app/Services/centre-collecte.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-centre-collecte',
  templateUrl: './create-centre-collecte.component.html',
  styleUrls: ['./create-centre-collecte.component.css']
})
export class CreateCentreCollecteComponent implements OnInit {

  centre:Centre = new Centre();
  submitted = false;
  msg="";
  msg1=0;
  msg2=0;
  msg3=0;
  msgErreur=0;
  qteAct=0;

  myForm=new  FormGroup({
      nomCentre : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      adresse : new FormControl(null,[Validators.required ,Validators.minLength(4)]),
      ville : new FormControl(null,[Validators.required ,Validators.minLength(4)]),
      // poidActuel : new FormControl(null,[Validators.required ]),
      // etat : new FormControl(null,[Validators.required ]),
  })
  // produits!:Observable<Produit[]>;
  // Tanks!:Observable<Tank[]>;
  // fournisseurs!:Observable<Fournisseur[]>;

  constructor(
    private location:Location,
     private centreCollecteService: CentreCollecteService,
     private router: Router,
     private dialogClose: MatDialog,) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      }

  ngOnInit() {

  }

  newTank(): void {
    this.submitted = false;
    this.centre = new Centre();
  }

  save() {

   if(this.myForm.get('nomCentre')?.value==null || this.myForm.get('ville')?.value==null || this.myForm.get('adresse')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
   }
   else{
    this.msg="";
   }


   this.centreCollecteService.getCollecteurUtilise(this.myForm.get('nomCentre')?.value).subscribe(t=>{
    console.log(t);
    if(t==1){
      this.msg1=1;
     }
     else{
      this.msg1=0;
     }

  if(this.myForm.get('nomCentre')?.value!=null && this.myForm.get('ville')?.value!=null && this.myForm.get('adresse')?.value!=null
  && this.myForm.get('nomCentre')?.value.length>=3 && this.myForm.get('ville')?.value.length>=4 
  && this.myForm.get('adresse')?.value.length>=4   && t==0){
    this.centreCollecteService
        .createCentre({
          "nomCentre":this.myForm.get('nomCentre')?.value,
          "adresse":this.myForm.get('adresse')?.value,
          "ville":this.myForm.get('ville')?.value,
          // "poidActuel":this.myForm.get('poidActuel')?.value,
          // "etat":this.myForm.get('etat')?.value,
        })
        .subscribe(o=>{
          // window.location.reload();
          console.log(this.centre);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un cnetre a été ajouté avec succès"]));
         this.onClose();
        });
      }
    });
    }


  onSubmit() {
        this.save();
  }

  gotoList() {
    this.router.navigate(['usine/centreCollecte/listeCentreCollecte']);
  }

    // this.router.navigate([this.router.url]);
    onReload(){
      // this.router.navigate([this.router.url]);
      this.router.navigateByUrl("/'agriculteur/bon/listeFournisseur",{skipLocationChange: true}).then( response=> {
       this.router.navigate([decodeURI(this.location.path())]);
     })
}


onClose() {
 this.dialogClose.closeAll();
 // this.gotoList();
 this.onReload();
//  this.ngOnInit();
}

 get nomCentre(){
  return this.myForm.get('nomCentre') ;
}

get adresse(){
  return this.myForm.get('adresse') ;
}

get ville(){
  return this.myForm.get('ville') ;
}


}
