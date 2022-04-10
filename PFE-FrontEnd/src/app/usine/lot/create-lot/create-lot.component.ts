import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Lot } from 'src/app/Models/lot';
import { LotService } from 'src/app/Services/lot.service';


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

  myForm=new  FormGroup({
      type : new FormControl(null,[Validators.required]),
      description : new FormControl(null,[Validators.required ]),
  })
  // produits!:Observable<Produit[]>;
  // Tanks!:Observable<Tank[]>;
  // fournisseurs!:Observable<Fournisseur[]>;

  constructor(
     private lotService: LotService,
     private router: Router,
     private dialogClose: MatDialog,) { }

  ngOnInit() {

  }

  newTank(): void {
    this.submitted = false;
    this.lot = new Lot();
  }

  save() {

   if(this.myForm.get('type')?.value==null){
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


  if(this.myForm.get('type')?.value!=null && this.myForm.get('description')?.value!=null ){
    this.lotService
        .createLot({
          "type":this.myForm.get('type')?.value,
          "description":this.myForm.get('description')?.value,
         
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

 get type(){
  return this.myForm.get('type') ;
}

get description(){
  return this.myForm.get('description') ;
}

get date(){
  return this.myForm.get('date') ;
}


}
