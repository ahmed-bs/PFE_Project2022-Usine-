import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Magasin } from 'src/app/Models/magasin';
import { MagasinService } from 'src/app/Services/magasin.service';

@Component({
  selector: 'app-create-magasin',
  templateUrl: './create-magasin.component.html',
  styleUrls: ['./create-magasin.component.css']
})
export class CreateMagasinComponent implements OnInit {

  
  magasin:Magasin = new Magasin();
  submitted = false;
  msg="";
  msgErreur=0;
  qteAct=0;

  myForm=new  FormGroup({
      nomMag : new FormControl(null,[Validators.required]),
      adresse : new FormControl(null,[Validators.required ]),
      ville : new FormControl(null,[Validators.required ]),
  })


  constructor(
     private magasinService: MagasinService,
     private router: Router, 
     private dialogClose: MatDialog,) { }

  ngOnInit() {

  }

  newMagasin(): void {
    this.submitted = false;
    this.magasin = new Magasin();
  }

  save() {

   if(this.myForm.get('nomMag')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
   }
   else{
    this.msg="";
   }

   if(this.myForm.get('adresse')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }

   if(this.myForm.get('ville')?.value==null){
    this.msg="vous devez remplir le formulaire !!";
  }
  else{
    this.msg="";
   }
  
   if( this.myForm.get('adresse')?.value!=null && this.myForm.get('nomMag')?.value!=null&& this.myForm.get('ville')?.value!=null  ){

    this.magasinService
        .createMagasin({
          "nomMag":this.myForm.get('nomMag')?.value,
          "adresse":this.myForm.get('adresse')?.value,
          "ville":this.myForm.get('ville')?.value,
        })
        .subscribe(o=>{
        //  window.location.reload();
          console.log(this.magasin);
          localStorage.setItem('Toast', JSON.stringify(["Success","Un magasin a été ajouté avec succès"]));
         this.onClose();    
        });
    }
  }


  onSubmit() {
        this.save();
  }

  gotoList() {
    this.router.navigate(['chef/magasin/listeMagasin']);
  }


  onReload(){
    this.router.navigate([this.router.url]);
  }
  
  
  onClose() {
    this.dialogClose.closeAll();
    // this.gotoList();
    this.onReload();
  }

 get nomMag(){
  return this.myForm.get('nomMag') ;
}

get adresse(){
  return this.myForm.get('adresse') ;
}

get ville(){
  return this.myForm.get('ville') ;
}


}

