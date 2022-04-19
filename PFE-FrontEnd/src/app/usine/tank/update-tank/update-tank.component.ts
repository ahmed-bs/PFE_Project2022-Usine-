import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Tank } from 'src/app/Models/tank';
import { Router } from '@angular/router';
import { TankService } from 'src/app/Services/tank.service';

@Component({
  selector: 'app-update-tank',
  templateUrl: './update-tank.component.html',
  styleUrls: ['./update-tank.component.css']
})
export class UpdateTankComponent implements OnInit {

  tank:Tank=new Tank();
  // myForm!:FormGroup;
   CheckesCompetance:boolean=false;

   myForm=new  FormGroup({
    matricule : new FormControl(null,[Validators.required,Validators.minLength(8)]),
    poidVide : new FormControl(null,[Validators.required,Validators.min(500)]),
    //  poidActuel : new FormControl(null,[Validators.required ]),
    //  etat : new FormControl(null,[Validators.required ]),
 })


   constructor(
     private router:Router,
     private dialogClose: MatDialog,
     private tankService:TankService,

   ) { }

   ngOnInit(): void {
     //this.ValidatedForm();
     this.tankService.getTank(JSON.parse(localStorage.getItem('IdTank') || '[]') || []).subscribe(o =>{
       this.tank = o;
       console.log(this.tank);
     });

   }

   updateTank(){
    if(this.myForm.get('poidVide')?.value!=null && this.myForm.get('matricule')?.value!=null 
    && this.myForm.get('poidVide')?.value>=500  && this.myForm.get('matricule')?.value.length>=8){
     this.tankService
     // .updateTank(this.Tank.idTank,this.Tank)
         .updateTank(this.tank.idTank,{
           "matricule":this.myForm.get('matricule')?.value,
           "poidVide":this.myForm.get('poidVide')?.value,
          //  "poidActuel":this.myForm.get('poidActuel')?.value,
          //  "etat":this.myForm.get('etat')?.value,

         })
         .subscribe(o=>{
           localStorage.setItem('Toast', JSON.stringify(["Success","Un tank a été modifié avec succes"]));
          //  window.location.reload();
          this.onClose();
           console.log(this.tank);
         },
         (error) => {
           console.log("Failed")
         }
       );
     }
   }

  get matricule(){
   return this.myForm.get('matricule') ;
 }

 get poidVide(){
   return this.myForm.get('poidVide') ;
 }



//  get poidActuel(){
//    return this.myForm.get('poidActuel') ;
//  }

//  get etat(){
//   return this.myForm.get('etat') ;
// }

onReload(){
  this.router.navigate([this.router.url]);
}


onClose() {
  this.dialogClose.closeAll();
  // this.gotoList();
  this.onReload();
}

 }

