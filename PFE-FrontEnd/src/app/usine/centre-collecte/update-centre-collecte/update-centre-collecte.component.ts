import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Centre } from 'src/app/Models/centre';
import { CentreCollecteService } from 'src/app/Services/centre-collecte.service';


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
     nomCentre : new FormControl(null,[Validators.required]),
     adresse : new FormControl(null,[Validators.required ]),
     ville : new FormControl(null,[Validators.required ]),
    //  poidActuel : new FormControl(null,[Validators.required ]),
    //  etat : new FormControl(null,[Validators.required ]),
 })


   constructor(
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

     this.centreService
     // .updatecentre(this.centre.idcentre,this.centre)
         .updateCentre(this.centre.idCentre,{
           "nomCentre":this.myForm.get('nomCentre')?.value,
           "adresse":this.myForm.get('adresse')?.value,
           "ville":this.myForm.get('ville')?.value,
          //  "poidActuel":this.myForm.get('poidActuel')?.value,
          //  "etat":this.myForm.get('etat')?.value,

         })
         .subscribe(o=>{
           localStorage.setItem('Toast', JSON.stringify(["Success","Un centre a été modifié avec succes"]));
           window.location.reload();
           console.log(this.centre);
         },
         (error) => {
           console.log("Failed")
         }
       );
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

   onClose() {
     this.dialogClose.closeAll();
   }

 }

