import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Magasin } from 'src/app/Models/magasin';
import { MagasinService } from 'src/app/Services/magasin.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-magasin',
  templateUrl: './create-magasin.component.html',
  styleUrls: ['./create-magasin.component.css']
})
export class CreateMagasinComponent implements OnInit {

  
  magasin:Magasin = new Magasin();
  submitted = false;
  msg="";
  msg1=0;
  msgErreur=0;
  qteAct=0;

  myForm=new  FormGroup({
      nomMag : new FormControl(null,[Validators.required,Validators.minLength(3)]),
      adresse : new FormControl(null,[Validators.required ,Validators.minLength(4)]),
      ville : new FormControl(null,[Validators.required ,Validators.minLength(4)]),
  })


  constructor(
    private location:Location,
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
  
   this.magasinService.getMagasinUtilise(this.myForm.get('nomMag')?.value).subscribe(t=>{
    console.log(t);
    if(t==1){
      this.msg1=1;
     }
     else{
      this.msg1=0;
     }

   if( this.myForm.get('adresse')?.value!=null && this.myForm.get('nomMag')?.value!=null&& this.myForm.get('ville')?.value!=null 
   && this.myForm.get('nomMag')?.value.length>=3 && this.myForm.get('ville')?.value.length>=4 
   && this.myForm.get('adresse')?.value.length>=4   && t==0){

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
  });
}


  onSubmit() {
        this.save();
  }

  gotoList() {
    this.router.navigate(['chef/magasin/listeMagasin']);
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

