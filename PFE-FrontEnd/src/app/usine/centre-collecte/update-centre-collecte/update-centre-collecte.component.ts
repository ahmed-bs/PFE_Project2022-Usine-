import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Centre } from 'src/app/Models/centre';
import { CentreCollecteService } from 'src/app/Services/centre-collecte.service';
import {Location} from "@angular/common";


@Component({
  selector: 'app-update-centre-collecte',
  templateUrl: './update-centre-collecte.component.html',
  styleUrls: ['./update-centre-collecte.component.css']
})
export class UpdateCentreCollecteComponent implements OnInit {

  centre:Centre=new Centre();
  // myForm!:FormGroup;
   CheckesCompetance:boolean=false;

   myForm=new  FormGroup({
    nomCentre : new FormControl(null,[Validators.required,Validators.minLength(3)]),
    adresse : new FormControl(null,[Validators.required ,Validators.minLength(4)]),
    ville : new FormControl(null,[Validators.required ,Validators.minLength(4)]),
    tel : new FormControl(null,[Validators.required,Validators.pattern("[0-9 ]{8}") ]),
 })


   constructor(
    private location:Location,
    private router: Router,
     private dialogClose: MatDialog,
     private centreService:CentreCollecteService,

   ) { }

   ngOnInit(): void {
     //this.ValidatedForm();
     this.centreService.getCentre(JSON.parse(localStorage.getItem('IdCentre') || '[]') || []).subscribe(o =>{
       this.centre = o;
       console.log(this.centre);
     });

   }

   updateCentre(){

    if(this.myForm.get('nomCentre')?.value!=null && this.myForm.get('ville')?.value!=null && this.myForm.get('adresse')?.value!=null
    && this.myForm.get('nomCentre')?.value.length>=3 && this.myForm.get('ville')?.value.length>=4 
    && this.myForm.get('adresse')?.value.length>=4 && this.myForm.get('tel')?.value!=null && this.myForm.get('tel')?.value.toString().length==8 ){

     this.centreService
     // .updatecentre(this.centre.idcentre,this.centre)
         .updateCentre(this.centre.idCentre,{
           "nomCentre":this.myForm.get('nomCentre')?.value,
           "adresse":this.myForm.get('adresse')?.value,
           "ville":this.myForm.get('ville')?.value,
           "tel":this.myForm.get('tel')?.value,
          //  "poidActuel":this.myForm.get('poidActuel')?.value,
          //  "etat":this.myForm.get('etat')?.value,

         })
         .subscribe(o=>{
           localStorage.setItem('Toast', JSON.stringify(["Success","Un centre a été modifié avec succes"]));
          //  window.location.reload();
          this.onClose();
           console.log(this.centre);
         },
         (error) => {
           console.log("Failed")
         }
       );
      }
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

get tel(){
  return this.myForm.get('tel') ;
}

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
}

 }

